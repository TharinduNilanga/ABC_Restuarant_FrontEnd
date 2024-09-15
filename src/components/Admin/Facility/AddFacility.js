import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddFacility() {

    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        }
    }, [navigate]);

    const [form, setForm] = useState({
        facilityName: "",
        facilityDescription: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        setError(null);
        try {
            await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/facility/addFacility`, form);
            navigate("/admin/facilities");
        } catch (error) {
            console.error(error);
            setError("An error occurred while adding the facility. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const textboxStyle = {
        input: {
            color: '#000000',
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
            color: "#000000",
            fontWeight: "bold",
        },
    };

    const buttonStyle = {
        mt: 3,
        mb: 3,
        color: 'white',
        background: '#00796b',
        ':hover': {

            color: '#00796b',
            background: 'white',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                height: '100vh',

            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                    backgroundColor: 'white',
                    height: '100vh',
                    // height: '642px'
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
                        onClick={() => navigate("/admin/facilities")}
                    >
                        Back
                    </Button>
                    <Container
                        component="main"
                        maxWidth="xs"
                        sx={{ mt: 4, mb: 3, border: '2px solid black', }}
                    >
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                                mt: 2,
                                mb: 2,
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                                color: 'black',
                            }}
                        >
                            Add New Facility
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{
                                mt: 1,
                            }}
                        >
                            <TextField
                                margin="normal"
                                required
                                autoFocus
                                fullWidth
                                id="facilityName"
                                label="Facility Name"
                                name="facilityName"
                                autoComplete="facility-name"
                                sx={textboxStyle}
                                value={form.facilityName}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="facilityDescription"
                                label="Facility Description"
                                name="facilityDescription"
                                autoComplete="facility-description"
                                sx={textboxStyle}
                                value={form.facilityDescription}
                                onChange={handleChange}
                            />
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
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Add
                                </Button>
                            )}
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Grid2>
    );
}
