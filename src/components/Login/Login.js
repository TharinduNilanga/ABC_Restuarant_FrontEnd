import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Link, Grid, Box, Typography, CircularProgress, Stack, Alert } from '@mui/material';
import Container from '@mui/material/Container';
import Footer from '../Footer/Footer';
import Axios from 'axios';
import { message } from 'antd';

export default function LogIn() {
    const navigate = useNavigate();
    const [enteredData, setEnteredData] = useState({
        email: "",
        password: "",
    });
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        if (userData) {
            checkUserData();
        }
    }, [userData]);

    const getUserDetails = async () => {
        setLoading(true);
        setError(null);
        setAlert({ show: false, type: "", message: "" });

        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/byEmail`, {
                params: {
                    email: enteredData.email,
                    password: enteredData.password,
                }
            });
            if (result.data) {
                message.success("Login Successfull..!")
                setUserData(result.data);
            } else {
                setAlert({ show: true, type: "error", message: "This email does not exist." });
            }
        } catch (error) {
            console.error("Error: ", error);
            message.error("Login Successfull..!")
            setError("Failed to retrieve user details. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const checkUserData = () => {
        if (userData) {
            if (userData.email === enteredData.email && userData.password === enteredData.password) {
                sessionStorage.setItem('userId', userData.userId);
                sessionStorage.setItem('userRole', userData.role);
                if (userData.role === 1) {
                    navigate('/admin/dashboard');
                } else if (userData.role === 2) {
                    navigate('/staff/dashboard');
                } else {
                    navigate('/user/dashboard');
                }
            } else {
                setAlert({ show: true, type: "error", message: "Invalid Username or Password!" });
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEnteredData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = enteredData;

        if (!email || !password) {
            setAlert({ show: true, type: "warning", message: "Please fill in all required fields." });
            return;
        }
        getUserDetails();
    };

    const textboxStyle = {
        input: { color: '#333' },
        '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
                borderColor: '#C4C4C4',
            },
            '&:hover fieldset': {
                borderColor: '#007BFF',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#007BFF',
            },
        },
        '& .MuiInputLabel-outlined': {
            color: '#6c757d',
            fontWeight: '500',
        },
    };

    const buttonStyle = {
        mt: 3,
        mb: 2,
        backgroundColor: '#00796b',
        color: '#fff',
        textTransform: 'none',
        padding: '12px',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '16px',
        ':hover': {
            backgroundColor: 'white',
            color: 'black',
        },
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'balck'
        }}>
            <Container component="main" maxWidth="xs" sx={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Box sx={{ mb: 4 }}>
                    <img src='/assets/logo.png' alt='ABC Restaurant logo' style={{ width: '120px' }} />
                </Box>
                <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: '600', color: '#00796b' }}>
                    Log in
                </Typography>

                {alert.show && (
                    <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
                        <Alert severity={alert.type}>{alert.message}</Alert>
                    </Stack>
                )}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        sx={textboxStyle}
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
                        autoComplete="current-password"
                        sx={textboxStyle}
                        onChange={handleChange}
                    />
                    {loading ? (
                        <CircularProgress sx={{ mt: 3, mb: 2, color: '#007BFF' }} />
                    ) : (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={buttonStyle}
                        >
                            Log in
                        </Button>
                    )}
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Grid container sx={{ mt: 3 }}>
                        <Grid item xs>
                            <Link
                                href="#"
                                variant="body2"
                                sx={{
                                    color: '#007BFF',
                                    textDecoration: 'underline',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                }}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography
                                sx={{
                                    fontSize: '13px',
                                    color: '#6c757d',
                                }}
                            >
                                {"Don't have an account? "}
                                <Link
                                    onClick={() => navigate('/register')}
                                    variant="body2"
                                    sx={{
                                        color: '#007BFF',
                                        textDecoration: 'underline',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Register
                                </Link>
                            </Typography>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
            {/* <Footer /> */}
        </Box>
    );
}
