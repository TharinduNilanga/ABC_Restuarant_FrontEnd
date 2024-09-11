import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Menu from "../Menu";
import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditDetails() {
    const navigate = useNavigate();
    // const location = useLocation();
    // const { id } = location.state;

    const [role, setRole] = useState('');

    const userId = '66b12feb31551e1a9bae2051'



    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const result = await Axios.get(`http://localhost:8080/api/user/${userId}`);
            setForm(result.data);
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.put(`http://localhost:8080/api/user/${userId}`, form);
            navigate("/admin/profile");
        } catch (error) {
            console.error(error);
        }
    };

    const textboxStyle = {
        input: {
            color: 'white',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#fe9e0d",
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fe9e0d",
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "#ffffff",
            fontWeight: "bold",
            borderColor: "#fe9e0d",
        },
    };

    const buttonStyle = {
        mt: 3,
        color: 'white',
        background: '#fe9e0d',
        ':hover': {
            bgcolor: ' #cb7a01',
            color: 'white',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                }}
            >
                <Box
                    sx={{ marginTop: 'auto' }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'white',
                            color: '#fe9e0d',
                            borderRadius: '10px',
                            ':hover': {
                                bgcolor: ' #fe9e0d',
                                color: 'white',
                            },
                        }}
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => navigate("/admin/profile")}
                    >
                        Back
                    </Button>
                    <Container
                        component="main"
                        maxWidth="xs"
                    >
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                textAlign: 'center',
                                mt: '50px',
                                mb: '30px',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                            }}
                        >
                            Update Profile Details
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                mt: 1,
                            }}
                        >
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
                </Box>
            </Box>
        </Grid2>
    )
}