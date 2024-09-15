import React, { useState, useEffect } from "react";
import Menu from "../Menu";
import { useLocation } from "react-router";
import {
    Box,
    FormControl,
    Typography,
    CircularProgress,
    Button,
    TextField,
    Container,
    Select,
    MenuItem,
    InputLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    CssBaseline,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#004d40',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#00796b',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        button: {
            fontWeight: 700,
            textTransform: 'none',
        },
        h5: {
            fontWeight: 'bold',
            color: '#004d40',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#004d40',
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: '#004d40',
                    '&.Mui-focused': {
                        color: '#004d40',
                    },
                },
            },
        },
    },
});

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
    const location = useLocation();
    const { productId } = location.state;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageBase64, setImageBase64] = useState(''); // For storing the image as base64
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        console.log('====================================');
        console.log(productId);
        console.log('====================================');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadCategories();
            loadProduct()
        }
    }, [navigate]);

    const loadProduct = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/product/${productId}`);
            setImagePreview(`data:image/jpeg;base64,${result.data.productImage}`)
            setForm(result.data);
        } catch (error) {
            console.error("Error loading user data:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    const loadCategories = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            // console.log('====================================');
            // console.log(result);
            // console.log('====================================');
            // setImagePreview(`data:image/jpeg;base64,${result.data.productImage}`)
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

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setLoading(true);

    //     // const formData = new FormData();
    //     // formData.append('product', new Blob([JSON.stringify(form)], { type: 'application/json' }));

    //     // if (form.productImage) {
    //     //     formData.append('file', form.productImage);
    //     // }

    //     try {
    //         // const response = await Axios.post(
    //         //     `${process.env.REACT_APP_ENDPOINT}/api/product/addProduct`,
    //         //     formData,
    //         //     {
    //         //         headers: {
    //         //             'Content-Type': 'multipart/form-data',
    //         //         },
    //         //     }
    //         // );
    //         await Axios.post(`${process.env.REACT_APP_ENDPOINT}/product/addProducty/${productId}`, form);
    //         message.success("Product Category Updated Successfully")
    //         navigate("/admin/products");
    //     } catch (error) {
    //         console.error(error);
    //         setError(error.message || "An error occurred while adding the product.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log('====================================');
        console.log(form);
        console.log('====================================');
        try {
            const response = await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/product/${productId}`, form);
            message.success("Product Updated Successfully")
            navigate("/admin/products");
        } catch (error) {
            console.error(error);
            message.success("Product Updated Failed")
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
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Extract the base64 part
                setImageBase64(base64String);
                setImagePreview(reader.result); // Use the whole result for preview

                setForm((prevForm) => ({
                    ...prevForm,
                    "productImage": base64String,
                }));
            };
            reader.readAsDataURL(file); // Convert file to base64
        }
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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid2
                sx={{
                    minWidth: '800px',
                    bgcolor: '#fafafa',
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

                                    bgcolor: '#00796b',
                                    color: 'white',
                                    borderRadius: '10px',
                                    ':hover': {
                                        backgroundColor: 'white',
                                        color: '#00796b',
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
                                sx={{
                                    border: '2px solid black', // Sets a 2px solid black border

                                }}
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
                                        color: 'black'
                                    }}
                                >
                                    Edit Product
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
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="productPrice"
                                        label="Price"
                                        name="productPrice"
                                        autoComplete="product-price"
                                        value={form.productPrice}
                                        onChange={handleChange}
                                    />

                                    <FormControl fullWidth margin="normal" required>
                                        <InputLabel id="selectCategory">Categories</InputLabel>
                                        <Select
                                            multiple
                                            fullWidth
                                            labelId="selectCategory"
                                            id="productCategory"
                                            label="Categories"
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
                                        <FormLabel id="productStatus">Status</FormLabel>
                                        <RadioGroup
                                            row
                                            required
                                            aria-labelledby="productStatus"
                                            name="productStatus"
                                            onChange={handleChange}
                                            value={form.productStatus}
                                        >
                                            <FormControlLabel value="Available" control={<Radio />} label="Available" />
                                            <FormControlLabel value="Unavailable" control={<Radio />} label="Unavailable" />
                                        </RadioGroup>
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mb: 3 }}
                                    >
                                        Update
                                    </Button>
                                </Box>
                            </Container>
                        </Box>
                    )}
                </Box>
            </Grid2>
        </ThemeProvider>
    );
}
