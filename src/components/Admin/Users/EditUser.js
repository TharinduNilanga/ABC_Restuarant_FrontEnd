import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Menu from "../Menu";
import { Box, FormControl, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function EditUser() {

    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state;

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadUser();
            loadRole();
        }
    }, [navigate]);

    const loadUser = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}`);
            setForm(result.data);
        } catch (error) {
            console.error("Error loading user data:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const loadRole = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/role/allRoles`);
            setRoles(result.data);
        } catch (error) {
            console.error("Error loading role data:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}`, form);
            message.success("User Update Successfully")
            navigate("/admin/users");
        } catch (error) {
            console.error(error);
            message.success("User Update Failed")
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const selectStyle = {
        color: '#000',
        '& .Mui-selected': {
            color: '#000',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#00796b",
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00796b",
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "#000",
            fontWeight: "bold",
        },
    };

    const textboxStyle = {
        input: {
            color: '#000',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#00796b",
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00796b",
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "#000",
            fontWeight: "bold",
        },
    };

    const buttonStyle = {
        mt: 3,
        mb: 2,
        color: 'white',
        background: '#00796b',
        ':hover': {
            backgroundColor: 'white',
            color: '#00796b',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                bgcolor: 'white',
                height: '100vh'
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                    bgcolor: 'white',
                    color: 'black',
                }}
            >
                <Box>
                    <Button
                        variant="contained"
                        sx={{

                            bgcolor: '#00796b',
                            color: 'white',
                            borderRadius: '10px',
                            ':hover': {
                                backgroundColor: 'white',
                                color: '#00796b',
                            },
                        }}
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => navigate("/admin/users")}
                    >
                        Back
                    </Button>
                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '90vh',
                            }}
                        >
                            <CircularProgress
                                size={70}
                                thickness={4}
                                sx={{
                                    color: '#00796b',
                                }}
                            />
                        </Box>
                    ) : (
                        <Container
                            component="main"
                            maxWidth="xs"
                            sx={{
                                border: '2px solid black', // Sets a 2px solid black border

                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{
                                    textAlign: 'center',
                                    mt: '30px',
                                    mb: '10px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    color: '#000',
                                }}
                            >
                                Edit User
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{
                                    mt: 1,
                                }}
                            >
                                <FormControl fullWidth margin="normal" required sx={textboxStyle}>
                                    <InputLabel id="selectRole">Role</InputLabel>
                                    <Select
                                        required
                                        fullWidth
                                        labelId="selectRole"
                                        id="role"
                                        label="Role"
                                        autoFocus
                                        sx={selectStyle}
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role.id} value={role.roleID}>{role.roleName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="first-name"
                                    sx={textboxStyle}
                                    value={form.firstName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    sx={textboxStyle}
                                    value={form.lastName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    sx={textboxStyle}
                                    value={form.address}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    sx={textboxStyle}
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Update
                                </Button>
                            </Box>
                        </Container>
                    )}
                </Box>
            </Box>
        </Grid2>
    );
}
