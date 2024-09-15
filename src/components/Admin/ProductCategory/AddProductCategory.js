import React, { useEffect, useState } from "react";
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
import { message } from "antd";

export default function AddProductCategory() {

    let navigate = useNavigate();
    const [imageBase64, setImageBase64] = useState(''); // For storing the image as base64
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        }
    }, [navigate]);

    const [form, setForm] = useState({
        categoryName: "",
        categoryDescription: "",
        categoryImage: "",
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
        try {
            const response = await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/addProductCategory`, form);
            message.success("Product Category Added Successfully")
            navigate("/admin/productCategory");
        } catch (error) {
            console.error(error);
            message.success("Product Category Added SuccessfFaieldully")
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
        mb: 3,

        color: 'white',
        background: '#00796b',
        ':hover': {
            bgcolor: 'white',
            color: '#00796b',
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
            bgcolor: 'white',
            color: '#00796b',
            border: '2px solid #00332b',
        },
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Extract the base64 part
                setImageBase64(base64String);
                setImagePreview(reader.result); // Use the whole result for preview
                console.log('====================================');
                console.log(reader.result);
                console.log('====================================');
                setForm((prevForm) => ({
                    ...prevForm,
                    "categoryImage": base64String,
                }));
            };
            reader.readAsDataURL(file); // Convert file to base64
        }
    };
    const handleImageUpload = async () => {
        if (!imageBase64) {
            alert("Please select an image to upload");
            return;
        }

        // try {
        //     const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}/upload-image`, { image: imageBase64 });
        //     alert('Image uploaded successfully!');
        console.log(imageBase64);
        // } catch (error) {
        //     console.error('Error uploading image:', error);
        // }
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                bgcolor: 'white',
                color: 'black',
                 height: '100vh'
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
                <Box>
                    <Button
                        variant="contained"
                        sx={{

                            bgcolor: '#00796b',
                            color: 'white',
                            borderRadius: '10px',
                            ':hover': {
                                backgroundColor: 'white',
                                color: '#00796b'
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
                        sx={{
                            border: '2px solid black', // Sets a 2px solid black border

                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                                color: 'black',
                            }}
                        >
                            Add New Product Category
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
                                sx={{
                                    width: '100%',
                                    height: '50px',
                                    mt: 1.5,
                                    mb: 1,
                                    color: 'white',
                                    background: '#00796b',
                                    border: '2px solid #004d40',
                                    ':hover': {
                                        bgcolor: 'white',
                                        color: '#00796b',
                                        border: '2px solid #00332b',
                                    },
                                }}
                            >
                                Upload Image
                                <input type="file" accept="image/jpg, image/jpeg, image/png" hidden onChange={handleImageChange} />

                            </Button>
                            {imagePreview && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center', // Aligns content to the right

                                        margin: '20px auto 5px',

                                    }}
                                >
                                    <img src={imagePreview} alt="Preview" style={{ width: '200px', marginBottom: '20px' }} />
                                </Box>
                            )}
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
                                    {error.message}
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
        </Grid2 >
    );
}
