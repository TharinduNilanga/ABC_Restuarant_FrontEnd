import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import Footer from '../Footer/Footer';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwordsMatch) {
            // Proceed with the registration process
            console.log({
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.address,
                email: formData.email,
                password: formData.password,
            });
        } else {
            console.error("Passwords do not match.");
        }
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
            color: 'black'
        },
    };

    useEffect(() => {
        setPasswordsMatch(formData.password === formData.confirmPassword);
    }, [formData.password, formData.confirmPassword]);

    return (
        <Box sx={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
                <Box
                    sx={{
                        backgroundColor: '#fff',
                        padding: '32px',
                        borderRadius: '12px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <Box sx={{ mb: 4 }}>
                        <img src='/assets/logo.png' alt='ABC Restaurant logo' style={{ width: '120px' }} />
                    </Box>
                    <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: '600', color: '#00796b' }}>
                        Register
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    sx={textboxStyle}
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    sx={textboxStyle}
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    sx={textboxStyle}
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    sx={textboxStyle}
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    sx={textboxStyle}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    sx={textboxStyle}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={!passwordsMatch && formData.confirmPassword !== ''}
                                    helperText={!passwordsMatch && formData.confirmPassword !== '' ? "Passwords don't match" : ''}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={buttonStyle}
                            disabled={!passwordsMatch}
                        >
                            Register
                        </Button>
                    </Box>
                    <Grid container justifyContent="center" sx={{ mt: 3 }}>
                        <Grid item>
                            <Typography variant="body2" sx={{ color: '#6c757d' }}>
                                Already have an account?{' '}
                                <Link
                                    onClick={() => navigate('/login')}
                                    sx={{ color: '#007BFF', cursor: 'pointer', fontWeight: '500' }}
                                >
                                    Log in
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}
