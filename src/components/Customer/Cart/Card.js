import React, { useState, useEffect } from "react";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Axios from "axios";

export default function CardComponent(props) {
    const [productDetails, setProductDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProductDetails = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/product/${props.cartItem.productId}`);
            setProductDetails(result.data);
        } catch (err) {
            console.error("Error loading product details:", err);
            setError("Failed to load product details.");
        }
    };

    const handleDelete = async () => {
        try {
            await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/cart/${props.cartItem.id}`);
            window.location.reload();
        } catch (err) {
            console.error("Error deleting item:", err);
            setError("Failed to delete item.");
        }
    };

    useEffect(() => {
        if (props.cartItem && props.cartItem.productId) {
            const fetchData = async () => {
                try {
                    await loadProductDetails();
                } catch (err) {
                    setError("Failed to load product details.");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [props.cartItem]);

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: '0 0 auto',
        margin: '10px',
        width: '60%',
        minWidth: '622px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        paddingBottom: '0px',
    };

    const imgStyle = {
        borderRadius: '5px',
        height: 'auto',
        width: '100%',
        objectFit: 'cover',
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Card sx={cardStyle}>
            <Box sx={{ padding: '0px' }}>
                <table>
                    <tbody>
                        <tr>
                            <td width={'10%'}>
                                <img
                                    src={productDetails.productImage ? `/${productDetails.productImage}` : "/assets/empty.jpeg"}
                                    alt={productDetails.productName || "Product"}
                                    style={imgStyle}
                                />
                            </td>
                            <td>
                                <Typography sx={{ textAlign: 'left', marginLeft: '5%', fontSize: '12px' }}>
                                    Product Name:
                                </Typography>
                                <Typography variant="h6" sx={{ textAlign: 'left', marginLeft: '10%' }}>
                                    {productDetails.productName || "No Name"}
                                </Typography>
                            </td>
                            <td>
                                <Typography sx={{ textAlign: 'left', marginLeft: '5%', fontSize: '12px' }}>
                                    Unit price:
                                </Typography>
                                <Typography>Rs. {productDetails.productPrice || 0}.00</Typography>
                            </td>
                            <td>
                                <Typography sx={{ textAlign: 'left', marginLeft: '5%', fontSize: '12px' }}>
                                    Quantity:
                                </Typography>
                                <Typography>{props.cartItem.productQuantity || 0}</Typography>
                            </td>
                            <td>
                                <Typography sx={{ textAlign: 'left', marginLeft: '5%', fontSize: '12px' }}>
                                    Sub total:
                                </Typography>
                                <Typography>Rs. {(props.cartItem.productQuantity || 0) * (productDetails.productPrice || 0)}.00</Typography>
                            </td>
                            <td width={'6%'}>
                                <IconButton aria-label="delete" size="large" onClick={handleDelete}>
                                    <DeleteIcon
                                        sx={{
                                            color: '#fa5555',
                                            ':hover': {
                                                color: 'red',
                                                cursor: 'pointer',
                                            }
                                        }}
                                    />
                                </IconButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Box>
        </Card>
    );
}
