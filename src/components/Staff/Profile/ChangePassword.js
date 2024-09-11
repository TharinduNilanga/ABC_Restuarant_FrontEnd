import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import { Box, Typography, Button, TextField, Container, Alert, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import Axios from "axios";

export default function ChangePassword() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
        role: "",
    });
    const [newPassword, setNewPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchedUserId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!fetchedUserId || userRole !== '2') {
            navigate('/login');
        } else {
            setUserId(fetchedUserId);
            const fetchData = async () => {
                try {
                    await loadPassword(fetchedUserId);
                } catch (err) {
                    setError("Failed to load user data");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [navigate]);

    useEffect(() => {
        setPasswordsMatch(newPassword.newPassword === newPassword.confirmNewPassword);
    }, [newPassword.newPassword, newPassword.confirmNewPassword]);

    const loadPassword = async (fetchedUserId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${fetchedUserId}`);
            setDetails(result.data);
        } catch (error) {
            console.error("Error loading user data:", error);
            throw error;
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPassword((prevNewPassword) => ({
            ...prevNewPassword,
            [name]: value,
        }));
    };

    const clearFields = () => {
        setNewPassword({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!passwordsMatch) {
            setAlert({ show: true, type: 'error', message: 'New passwords do not match' });
            return;
        }
        if (details.password && details.password === newPassword.currentPassword) {
            try {
                const response = await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}/password`, {
                    newPassword: newPassword.newPassword,
                });
                if (response.status === 200) {
                    setAlert({ show: true, type: 'success', message: 'Password changed successfully' });
                    clearFields();
                    setTimeout(() => navigate("/staff/profile"), 2000);
                } else {
                    setAlert({ show: true, type: 'error', message: 'Failed to update password' });
                }
            } catch (error) {
                console.error("Error updating password:", error);
                setAlert({ show: true, type: 'error', message: 'Error changing password' });
                clearFields();
            }
        } else {
            setAlert({ show: true, type: 'error', message: 'Current password is incorrect' });
            clearFields();
        }
    };

    const textboxStyle = {
        input: { color: 'white' },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#fe9e0d",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fe9e0d",
            borderWidth: "3px",
        },
        "& .MuiInputLabel-outlined": {
            color: "#ffffff",
            fontWeight: "bold",
        },
    };

    const buttonStyle = {
        mt: 3,
        color: 'white',
        background: '#fe9e0d',
        ':hover': {
            bgcolor: '#cb7a01',
            color: 'white',
        },
    };

    return (
        <Grid2 sx={{ minWidth: '800px' }}>
            <Menu />
            <Box component="main" sx={{ padding: '30px 40px', marginLeft: '240px' }}>
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
                                color: '#fe9e0d',
                            }}
                        />
                    </Box>
                ) : error ? (
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            margin: 'auto',
                            color: 'red',
                        }}
                    >
                        {error}
                    </Typography>
                ) : (
                    <Box sx={{ marginTop: 'auto' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'white',
                                color: '#fe9e0d',
                                borderRadius: '10px',
                                ':hover': {
                                    bgcolor: '#fe9e0d',
                                    color: 'white',
                                },
                            }}
                            startIcon={<ArrowBackIosIcon />}
                            onClick={() => navigate("/staff/profile")}
                        >
                            Back
                        </Button>
                        <Container component="main" maxWidth="xs">
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
                                Change Password
                            </Typography>
                            {alert.show && (
                                <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
                                    <Alert severity={alert.type}>{alert.message}</Alert>
                                </Stack>
                            )}
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    type="password"
                                    id="currentPassword"
                                    label="Current Password"
                                    name="currentPassword"
                                    autoComplete="current-password"
                                    sx={textboxStyle}
                                    value={newPassword.currentPassword}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="password"
                                    id="newPassword"
                                    label="New Password"
                                    name="newPassword"
                                    autoComplete="new-password"
                                    sx={textboxStyle}
                                    value={newPassword.newPassword}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="password"
                                    id="confirmNewPassword"
                                    label="Confirm New Password"
                                    name="confirmNewPassword"
                                    autoComplete="new-password"
                                    sx={textboxStyle}
                                    value={newPassword.confirmNewPassword}
                                    onChange={handleChange}
                                    error={!passwordsMatch && newPassword.confirmNewPassword !== ''}
                                    helperText={!passwordsMatch && newPassword.confirmNewPassword !== '' ? "Passwords don't match" : ''}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                    disabled={!passwordsMatch}
                                >
                                    Change
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                )}
            </Box>
        </Grid2>
    );
}
