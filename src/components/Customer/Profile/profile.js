import React, { useState, useEffect } from "react";
import AppBar from "../AppBar";
import BottomNav from "../BottomNav"
import { Box, Typography, CircularProgress } from "@mui/material";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    let userId = "";
    let navigate = useNavigate();

    useEffect(() => {
        userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '3') {
            navigate('/login');
        }
    }, [navigate]);
    

    const [form, setForm] = useState({});
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadProfile();
    }, [userId]);

    useEffect(() => {
        if (form.role) {
            loadRole();
        }
    }, [form.role, form]);

    const loadProfile = async () => {
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
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/role/${form.role}`);
            setRole(result.data);
        } catch (error) {
            console.error("Error loading role data:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const buttonStyle = {
        width: '250px',
        margin: '50px',
        color: 'white',
        background: '#fe9e0d',
        ':hover': {
            bgcolor: ' #cb7a01',
            color: 'white',
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <AppBar sx={{ display: 'fixed' }} />
            <Box
                component="main"
            >
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
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
                    <Box
                        sx={{ marginTop: 'auto' }}
                    >
                        <Container
                            component="main"
                            maxWidth="md"
                        >
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    mt: '80px',
                                    mb: '30px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                }}
                            >
                                Profile Details
                            </Typography>
                            <Box
                                sx={{
                                    mt: 1,
                                }}
                            >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width={'45%'} align="right">
                                                <Typography variant="h6" sx={{ color: '#fe9e0d', mt: '10px' }}>
                                                    First Name
                                                </Typography>
                                            </td>
                                            <td width={'10%'} align="center">
                                                <Typography variant="h6" sx={{ color: '#fe9e0d', mt: '10px' }}>
                                                    :
                                                </Typography>
                                            </td>
                                            <td width={'45%'} align="left">
                                                <Typography variant="h6" sx={{ color: '#ffffff', mt: '10px' }}>
                                                    {form.firstName}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="right">
                                                <Typography variant="h6" sx={{ color: '#fe9e0d', mt: '10px' }}>
                                                    Last Name
                                                </Typography>
                                            </td>
                                            <td align="center">
                                                <Typography variant="h6" sx={{ color: '#fe9e0d', mt: '10px' }}>
                                                    :
                                                </Typography>
                                            </td>
                                            <td align="left">
                                                <Typography variant="h6" sx={{ color: '#ffffff', mt: '10px' }}>
                                                    {form.lastName}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="right">
                                                <Typography variant="h6" sx={{ color: '#fe9e0d', mt: '10px' }}>
                                                    Address
                                                </Typography>
                                            </td>
                                            <td align="center">
                                                <Typography variant="h6" sx={{ color: '#fe9e0d', mt: '10px' }}>
                                                    :
                                                </Typography>
                                            </td>
                                            <td align="left">
                                                <Typography variant="h6" sx={{ color: '#ffffff', mt: '10px' }}>
                                                    {form.address}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="right">
                                                <Typography variant="h6" sx={{ color: '#fe9e0d', mt: '10px' }}>
                                                    Email
                                                </Typography>
                                            </td>
                                            <td align="center">
                                                <Typography variant="h6" sx={{ color: '#fe9e0d', mt: '10px' }}>
                                                    :
                                                </Typography>
                                            </td>
                                            <td align="left">
                                                <Typography variant="h6" sx={{ color: '#ffffff', mt: '10px' }}>
                                                    {form.email}
                                                </Typography>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Typography></Typography>
                                <Box
                                    display={'flex'}
                                    sx={{ mt: '20px', justifyContent: 'center' }}
                                >
                                    <Button
                                        ml='0px'
                                        type="submit"
                                        variant="contained"
                                        sx={buttonStyle}
                                        onClick={() => navigate('/user/editDetails')}
                                    >
                                        Edit Details
                                    </Button>
                                    <Button
                                        ml='auto'
                                        type="submit"
                                        variant="contained"
                                        sx={buttonStyle}
                                        onClick={() => navigate('/user/changePassword')}
                                    >
                                        change password
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                )}
            </Box>
            <BottomNav />
        </Box>
    )
}