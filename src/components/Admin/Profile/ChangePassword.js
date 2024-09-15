import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import { Box, Typography, Button, TextField, Container, Alert, Stack, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";

export default function ChangePassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPassword, setNewPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadPassword(userId);
        }
    }, [navigate]);

    useEffect(() => {
        setPasswordsMatch(newPassword.newPassword === newPassword.confirmNewPassword);
    }, [newPassword.newPassword, newPassword.confirmNewPassword]);

    const loadPassword = async (userId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}`);
            setNewPassword(prev => ({ ...prev, currentPassword: result.data.password }));
        } catch (error) {
            console.error("Error loading user data:", error);
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPassword(prevNewPassword => ({
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

        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            setAlert({ show: true, type: 'error', message: 'User not found' });
            return;
        }

        if (newPassword.currentPassword === newPassword.currentPassword) {
            setLoading(true);
            try {
                const response = await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}/password`, {
                    newPassword: newPassword.newPassword,
                });
                if (response.status === 200) {
                    setAlert({ show: true, type: 'success', message: 'Password changed successfully' });
                    clearFields();
                    setTimeout(() => navigate("/admin/profile"), 2000);
                } else {
                    setAlert({ show: true, type: 'error', message: 'Failed to update password' });
                }
            } catch (error) {
                console.error("Error updating password:", error);
                setAlert({ show: true, type: 'error', message: 'Error changing password' });
                clearFields();
            } finally {
                setLoading(false);
            }
        } else {
            setAlert({ show: true, type: 'error', message: 'Current password is incorrect' });
            clearFields();
        }
    };

    const textboxStyle = {
        input: { color: 'black' },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#00796b",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00796b",
            borderWidth: "3px",
        },
        "& .MuiInputLabel-outlined": {
            color: "black",
            fontWeight: "bold",
        },
    };

    const buttonStyle = {
        mt: 3,
        mb: 3,
        color: 'white',
        background: '#00796b',
        ':hover': {
            bgcolor: 'white',
            color: '#00796b',
        },
    };

    return (
        <Grid2 sx={{ minWidth: '800px', bgcolor: 'white' }}>
            <Menu />
            <Box component="main" sx={{ padding: '30px 40px', marginLeft: '240px' }}>
                <Box sx={{ marginTop: 'auto' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#00796b',
                            color: 'white',
                            borderRadius: '10px',
                            ':hover': {
                                bgcolor: 'white',
                                color: '#00796b',
                            },
                        }}
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => navigate("/admin/profile")}
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
                                sx={{ color: '#fe9e0d' }}
                            />
                        </Box>
                    ) : (
                        <Container component="main" maxWidth="xs" sx={{ mt: 4, mb: 3, border: '2px solid black', }}>
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    mt: '50px',
                                    mb: '30px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    color: '#00796b'
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
                    )}
                </Box>
            </Box>
        </Grid2>
    );
}
