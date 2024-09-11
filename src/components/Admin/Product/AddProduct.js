import React, { useState, useEffect } from "react";
import Menu from "../Menu";
import { Box, FormControl, Typography, CircularProgress, Button, TextField, Container, Select, MenuItem, InputLabel, Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        productName: "",
        productDescription: "",
        productImage: "",
        productPrice: "",
        productCategory: [],
        productStatus: "",
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadCategories();
        }
    }, [navigate]);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading categories:", error);
            setError(error.message || "An error occurred while loading categories.");
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

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            productCategory: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('product', new Blob([JSON.stringify(form)], { type: 'application/json' }));

        if (form.productImage) {
            formData.append('file', form.productImage);
        }

        try {
            const response = await Axios.post(
                `${process.env.REACT_APP_ENDPOINT}/api/product/addProduct`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            navigate("/admin/products");
        } catch (error) {
            console.error(error);
            setError(error.message || "An error occurred while adding the product.");
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

    const selectStyle = {
        color: '#00796b',
        '& .Mui-selected': {
            color: '#00796b',
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

    const textboxStyle = {
        input: {
            color: '#00796b',
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
        mt: '30px',
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
            color: '#00796b',
            border: '2px solid #00796b',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                bgcolor: '#fafafa',
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
                            onClick={() => navigate("/admin/products")}
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
                                    color: '#00796b'
                                }}
                            >
                                Add Product
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
                                    fullWidth
                                    autoFocus
                                    id="productName"
                                    label="Product Name"
                                    name="productName"
                                    autoComplete="product-name"
                                    sx={textboxStyle}
                                    value={form.productName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="productDescription"
                                    label="Description"
                                    name="productDescription"
                                    autoComplete="product-description"
                                    sx={textboxStyle}
                                    value={form.productDescription}
                                    onChange={handleChange}
                                />
                                <Button
                                    id="productImage"
                                    name="productImage"
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={fileUploadBtn}
                                >
                                    Upload Image
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/jpg, image/jpeg, image/png"
                                        onChange={(e) => setForm({ ...form, productImage: e.target.files[0] })}
                                    />
                                </Button>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="productPrice"
                                    label="Price"
                                    name="productPrice"
                                    autoComplete="product-price"
                                    sx={textboxStyle}
                                    value={form.productPrice}
                                    onChange={handleChange}
                                />

                                <FormControl fullWidth margin="normal" required sx={textboxStyle}>
                                    <InputLabel id="selectCategory">Categories</InputLabel>
                                    <Select
                                        multiple
                                        fullWidth
                                        labelId="selectCategory"
                                        id="productCategory"
                                        label="Categories"
                                        sx={selectStyle}
                                        name="productCategory"
                                        value={form.productCategory}
                                        onChange={handleCategoryChange}
                                        renderValue={(selected) => selected.map(categoryId => {
                                            const category = categories.find(f => f.categoryId === categoryId);
                                            return category ? category.categoryName : '';
                                        }).join(', ')}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.categoryId} value={category.categoryId}>
                                                {category.categoryName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel id="productStatus" sx={{ color: '#00796b', mt: 2 }}>Status</FormLabel>
                                    <RadioGroup
                                        row
                                        required
                                        aria-labelledby="productStatus"
                                        name="productStatus"
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Available" control={<Radio />} label="Available" style={{ color: 'black' }} />
                                        <FormControlLabel value="Unavailable" control={<Radio />} label="Unavailable" style={{ color: 'black' }} />
                                    </RadioGroup>
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                )}
            </Box>
        </Grid2>
    );
}
