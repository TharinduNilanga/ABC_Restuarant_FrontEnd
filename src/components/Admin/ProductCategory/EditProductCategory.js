import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Menu from "../Menu";
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { styled } from '@mui/material/styles';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProductCategory() {

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;

    const [form, setForm] = useState({
        categoryName: "",
        categoryDescription: "",
        categoryImage: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadCategory();
        }
    }, [navigate]);

    const loadCategory = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/${id}`);
            setForm(result.data);
        } catch (error) {
            console.error("Error loading category data:", error);
            setError(error);
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
        setLoading(true);
        setError(null);
        try {
            await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/${id}`, form);
            navigate("/admin/productCategory");
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

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
            color: "#00796b",
            fontWeight: "bold",
        },
    };

    const buttonStyle = {
        mt: 3,
        mb: 2,
        color: 'white',
        background: '#00796b',
        ':hover': {
            bgcolor: '#004d40',
            color: 'white',
        },
    };

    const fileUploadBtn = {
        width: '100%',
        height: '50px',
        mt: 1.5,
        mb: 1,
        color: 'white',
        background: '#00796b',
        border: '2px solid #004d40',
        ':hover': {
            bgcolor: '#004d40',
            color: 'white',
            border: '2px solid #00332b',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                bgcolor: 'white',
                color: 'black',
                height: '642px'
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
                            onClick={() => navigate("/admin/productCategory")}
                        >
                            Back
                        </Button>
                        <Container
                            component="main"
                            maxWidth="xs"
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
                                    color: '#00796b',
                                }}
                            >
                                Edit Product Category
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
                                    id="categoryName"
                                    label="Category Name"
                                    name="categoryName"
                                    autoComplete="category-name"
                                    sx={textboxStyle}
                                    value={form.categoryName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="categoryDescription"
                                    label="Category Description"
                                    name="categoryDescription"
                                    autoComplete="category-description"
                                    sx={textboxStyle}
                                    value={form.categoryDescription}
                                    onChange={handleChange}
                                />
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={fileUploadBtn}
                                >
                                    Upload Image
                                    <VisuallyHiddenInput type="file" accept="image/jpg, image/jpeg, image/png" />
                                </Button>
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
                )}
            </Box>
        </Grid2>
    );
}
