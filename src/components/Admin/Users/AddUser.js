import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, FormControl, Typography, CircularProgress } from "@mui/material";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import { message } from "antd";


export default function AddUser() {

    let navigate = useNavigate();
    const [isvalidPassword, setIsvalidPassword] = useState(false)

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        }
    }, []);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "confirmPassword") {
            let password = form.password;

            if (password !== value) {

                setIsvalidPassword(true)

            } else {
                setIsvalidPassword(false)
            }
        }
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/user/addUser`, form);
            if (response) {
                message.success("User Added Successfully")
                navigate("/admin/users");
            }

        } catch (error) {
            console.error(error);
            message.error("User Added Failed")
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
        color: 'white',
        background: '#00796b',
        ':hover': {
            bgcolor: '#004d40',
            color: 'white',
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
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    color: '#000',
                                }}
                            >
                                Add New User
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{
                                    mt: 1,
                                    mb: 2
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
                                        <MenuItem value={1}>Admin</MenuItem>
                                        <MenuItem value={2}>Staff</MenuItem>
                                        <MenuItem value={3}>Customer</MenuItem>
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
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    sx={textboxStyle}
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    sx={textboxStyle}
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                // error={isvalidPassword ? '' : "not matched"}
                                />
                                {isvalidPassword ? (
                                    <Typography
                                        color='red'
                                    > Password Not Matched</Typography>
                                ) : " "}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Container>
                    )}
                </Box>
            </Box>
        </Grid2>
    );
}
