import React, { useState, useEffect } from "react";
import Menu from '../Menu';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { message } from "antd";

export default function Products() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadProducts();
            loadProductCategories();
        }
    }, [navigate]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/product/allProducts`);
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const loadProductCategories = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading product categories:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryNames = (categoryIds) => {
        return categoryIds.map(id => {
            const category = categories.find(f => f.categoryId === id);
            return category ? category.categoryName : '';
        }).join(', ');
    };

    const deleteProduct = async (id) => {
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/product/${id}`);
            if (response.status === 200) {
                message.success("Product Deleted Successfully")
                console.log('Product deleted successfully');
                loadProducts();
            }
        } catch (error) {
            message.success("Product Deleted Failed")
            console.error('Error deleting product:', error);
        }
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                bgcolor: theme.palette.background.paper,
                 height: '100vh'
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                    height: '642px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between', // Aligns content to the right
                        textAlign: 'center',
                        margin: '20px auto 5px',

                    }}
                >
                    <Typography fontSize="20px" sx={{ color: 'black', fontWeight: 'bold' }}>Product Form</Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/addProduct')}
                        sx={{
                            backgroundColor: '#00796b',
                            color: 'white',
                            ':hover': {
                                bgcolor: '#004d40',
                            },
                        }}
                    >
                        Add New Product
                    </Button>
                </Box>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '70vh',
                        }}
                    >
                        <CircularProgress
                            size={60}
                            sx={{
                                color: '#00796b',
                            }}
                        />
                    </Box>
                ) : error ? (
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'center',
                            color: theme.palette.error.main,
                        }}
                    >
                        {error.message || "An unexpected error occurred."}
                    </Typography>
                ) : products.length > 0 ? (
                    <>
                        <Box>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 600 }}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        backgroundColor: theme.palette.grey[200], // Default color
                                                    }}>Name</TableCell>
                                                <TableCell align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        backgroundColor: theme.palette.grey[200], // Default color
                                                    }}>Description</TableCell>
                                                <TableCell align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        backgroundColor: theme.palette.grey[200], // Default color
                                                    }}>Price</TableCell>
                                                <TableCell align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        backgroundColor: theme.palette.grey[200], // Default color
                                                    }}>Category</TableCell>
                                                <TableCell align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        backgroundColor: theme.palette.grey[200], // Default color
                                                    }}>Status</TableCell>
                                                <TableCell align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        backgroundColor: theme.palette.grey[200], // Default color
                                                    }} >Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((product) => (
                                                <TableRow key={product.productId}>
                                                    <TableCell align="center">{product.productName}</TableCell>
                                                    <TableCell align="center">{product.productDescription}</TableCell>
                                                    <TableCell align="center">Rs.{product.productPrice}.00</TableCell>
                                                    <TableCell align="center">{getCategoryNames(product.productCategory)}</TableCell>
                                                    <TableCell align="center">{product.productStatus}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() => navigate('/admin/editProduct', { state: { productId: product.productId } })}
                                                            aria-label="edit"
                                                            sx={{
                                                                color: '#00796b',
                                                                backgroundColor: 'white',
                                                                marginRight: '3px',
                                                                ':hover': {
                                                                    color: 'white',
                                                                    backgroundColor: '#00796b',
                                                                }
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() => deleteProduct(product.productId)}
                                                            sx={{
                                                                color: '#ff6666',
                                                                backgroundColor: 'white',
                                                                marginLeft: '3px',
                                                                ':hover': {
                                                                    color: '#ff0000',
                                                                    backgroundColor: '#00796b',
                                                                }
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                        <Box
                            sx={{
                                textAlign: 'center',
                                mt: '20px'
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                Total products: {products.length}
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'center',
                            color: theme.palette.text.primary
                        }}
                    >
                        No Products Available.
                    </Typography>
                )}
            </Box>
        </Grid2>
    );
}
