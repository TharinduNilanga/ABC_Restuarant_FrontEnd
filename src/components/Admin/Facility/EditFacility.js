import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Menu from "../Menu";
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditFacility() {

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;

    const [form, setForm] = useState({
        facilityName: "",
        facilityDescription: "",
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadFacility();
        }
    }, [navigate]);

    const loadFacility = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/${id}`);
            setForm(result.data);
        } catch (error) {
            console.error("Error loading facility data:", error);
        } finally {
            setLoading(false);
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
        setSubmitting(true);
        try {
            await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/facility/${id}`, form);
            navigate("/admin/facilities");
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
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
        mt: '30px',
        mb: 2,
        color: 'white',
        background: '#00796b',
        ':hover': {
            bgcolor: '#ffffff',
            color: '#00796b',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                 height: '100vh'
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                    backgroundColor: 'white',
                   height: '100vh'
                }}
            >
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'white',
                            color: '#00796b',
                            borderRadius: '10px',
                            ':hover': {
                                bgcolor: '#00796b',
                                color: 'white',
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
                                mt: '30px',
                                mb: '10px',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                                color: '#000000',
                            }}
                        >
                            Edit Facility
                        </Typography>
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
                                {submitting ? (
                                    <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                                        <CircularProgress />
                                    </Box>
                                ) : (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={buttonStyle}
                                    >
                                        Update
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Container>
                </Box>
            </Box>
        </Grid2>
    );
}
