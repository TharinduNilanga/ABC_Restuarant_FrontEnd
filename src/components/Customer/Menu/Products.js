import React, { useEffect, useState } from "react";
import AppBar from "../AppBar";
import Card from "./Card";
import BottomNav from "../BottomNav"
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Products() {
    let userId = "";
    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '3') {
            navigate('/login');
        }
    }, [navigate]);

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadProductCategory();
                await loadProduct();
            } catch (err) {
                setError("Failed to load products or categories.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const loadProductCategory = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading categories:", error);
            throw error;
        }
    };

    const loadProduct = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/product/allProducts`);
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
            throw error;
        }
    };

    const box1Style = {
        mb: '30px',
    };

    const box2Style = {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
        flex: '0 0 auto',
        justifyContent:'center'
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                bgcolor: 'white'
            }}
        >
            <AppBar sx={{ display: 'fixed' }} />
            <Box
                sx={{
                    padding: "3% 7%"
                }}
            >
                <Box component="main" sx={box1Style}>
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
                    ) : categories.length > 0 && products.length > 0 ? (
                        categories.map((category) => {
                            const categoryProducts = products.filter(product =>
                                product.productCategory.includes(category.categoryId)
                            );

                            if (categoryProducts.length === 0) {
                                return null;
                            }

                            return (
                                <Box key={category.categoryId} sx={box1Style}>
                                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                                        {category.categoryName}
                                    </Typography>
                                    <Box sx={box2Style}>
                                        {categoryProducts.map((product) => (
                                            <Card key={product.id} product={product} />
                                        ))}
                                    </Box>
                                </Box>
                            );
                        })
                    ) : (
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                                justifyContent: 'center',
                                margin: 'auto',
                            }}
                        >
                            No Product Available.
                        </Typography>
                    )}
                </Box>

            </Box>
        </Box>
    );
}
