import React, { useEffect, useState } from 'react';
import Menu from '../Menu';
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

export default function Profile() {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [details, setDetails] = useState({});
    const [role, setRole] = useState('');
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
                    await loadProfile(fetchedUserId);
                } catch (err) {
                    setError("Failed to load Profile Details.");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [navigate]);

    const loadProfile = async (fetchedUserId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${fetchedUserId}`);
            setDetails(result.data);
            if (result.data.role) {
                await loadRole(result.data.role);
            }
        } catch (error) {
            console.error("Error loading profile details:", error);
            setError("Failed to load Profile Details.");
        }
    };

    const loadRole = async (roleId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/role/${roleId}`);
            setRole(result.data);
        } catch (error) {
            console.error("Error loading role details:", error);
            setError("Failed to load Role Details.");
        }
    };

    const buttonStyle = {
        width: '250px',
        margin: '50px',
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
            <Box component="main" sx={{ padding: '60px 80px', marginLeft: '240px' }}>
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
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>{error}</Typography>
                ) : details ? (
                    <Box sx={{ marginTop: 'auto' }}>
                        <Container component="main" maxWidth="md">
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    textAlign: 'center',
                                    mt: '130px',
                                    mb: '30px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                }}
                            >
                                Profile Details
                            </Typography>
                            <Box sx={{ mt: 1 }}>
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
                                                    {details.firstName}
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
                                                    {details.lastName}
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
                                                    {details.address}
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
                                                    {details.email}
                                                </Typography>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="right">
                                                <Typography variant="h6" sx={{ color: '#fe9e0d', mt: '10px' }}>
                                                    Role
                                                </Typography>
                                            </td>
                                            <td align="center">
                                                <Typography variant="h6" sx={{ color: '#fe9e0d', mt: '10px' }}>
                                                    :
                                                </Typography>
                                            </td>
                                            <td align="left">
                                                <Typography variant="h6" sx={{ color: '#ffffff', mt: '10px' }}>
                                                    {role.roleName}
                                                </Typography>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Box display={'flex'} sx={{ mt: '20px', justifyContent: 'center' }}>
                                    <Button
                                        ml='auto'
                                        type="submit"
                                        variant="contained"
                                        sx={buttonStyle}
                                        onClick={() => navigate('/staff/changePassword')}
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </Box>
                ) : (
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>No Details Found.</Typography>
                )}
            </Box>
        </Grid2>
    );
}
