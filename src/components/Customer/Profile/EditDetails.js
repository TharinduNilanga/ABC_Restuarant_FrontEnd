import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditDetails() {
    let userId = "";
    let navigate = useNavigate();
    const [idUser, setIdUser] = useState(null);
    useEffect(() => {
        userId = sessionStorage.getItem('userId');
        setIdUser(userId);
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '3') {
            navigate('/login');
        }
    }, [navigate]);


    // const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            console.log('====================================');
            console.log(userId);
            console.log('====================================');
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}`);
            setForm(result.data);
        } catch (error) {
            console.error("Error loading user data:", error);
            setError(error);
        } finally {
            setLoading(false);
        };
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        console.log('====================================');
        console.log(userId);
        console.log('====================================');
        event.preventDefault();
        setLoading(true);
        try {
            const response = await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/user/${idUser}`, form);
            navigate("/user/editDetails");
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const textboxStyle = {
        input: {
            color: 'black',
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
            color: "black",
            fontWeight: "bold",
            borderColor: "#00796b",
        },
    };

    const buttonStyle = {
        mt: 3,
        color: 'white',
        background: '#00796b',
        ':hover': {
            bgcolor: 'white',
            color: '#00796b',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                bgcolor: 'white',
                height:'100vh'
            }}
        >
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
                        <Container
                            component="main"
                            maxWidth="xs"
                            sx={{ mt: 4, mb: 3, border: '2px solid black', }}
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
                                    color: '#00796b',
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between', // Aligns content to the right
                                        textAlign: 'center',
                                        margin: '20px auto 5px',

                                    }}>
                                    <Button
                                        variant="contained"

                                        sx={{
                                            mt: 3,
                                            bgcolor: 'white',
                                            color: '#00796b',
                                            ':hover': {
                                                color: 'white',
                                                background: '#00796b',
                                            }
                                        }}
                                        startIcon={<ArrowBackIosIcon />}
                                        onClick={() => navigate("/user/dashboard")}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"

                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            color: 'white',
                                            background: '#00796b',
                                            ':hover': {
                                                bgcolor: 'white',
                                                color: '#00796b',
                                            }
                                        }}
                                    >
                                        Update
                                    </Button>
                                </Box>

                            </Box>
                        </Container>
                    )}
                </Box>
            </Box>
        </Grid2>
    )
}