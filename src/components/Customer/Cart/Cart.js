import React, { useEffect, useState } from "react";
import Card from "./Card";
import AppBar from "../AppBar";
import BottomNav from "../BottomNav";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography, Button } from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    let userId = "";
    let navigate = useNavigate();

    useEffect(() => {
        userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '3') {
            navigate('/login');
        }
    }, [navigate]);

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log('====================================');
            console.log(userId);
            console.log('====================================');
            try {
                const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/cart/byCustomer/${userId}`);
                setCartItems(result.data);
                // console.log(result.data);
            } catch (err) {
                setError("Failed to load cart.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    const box1Style = {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'scroll',
        flex: '0 0 auto',
        alignItems: 'center',
        margin: '30px auto',
        height: '65vh',
    };

    const buttonStyle = {
        mt: '30px',
        mb: '10px',
        padding: '5px 80px',
        backgroundColor: '#cb7a01',
        color: '#ffffff',
        borderRadius: '5px',
        border: '2px solid #fe9e0d',
        alignContent: 'center',
        ':hover': {
            bgcolor: ' #fe9e0d',
        },
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <AppBar sx={{ display: 'fixed' }} />
            <Box>
                <Box component="main" sx={box1Style}>
                    <Typography
                        variant="h3"
                        sx={{
                            textAlign: 'left',
                            marginBottom: '30px',
                        }}
                    >
                        Cart
                    </Typography>
                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
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
                                margin: 'auto',
                                color: 'red',
                            }}
                        >
                            {error}
                        </Typography>
                    ) : cartItems.length > 0 ? (
                        cartItems.map((cartItem) => (
                            <Card key={cartItem.id} cartItem={cartItem} />
                        ))
                    ) : (
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                                margin: 'auto',
                            }}
                        >
                            No Product Available.
                        </Typography>
                    )}
                </Box>
                <hr
                    style={{
                        width: '90%',
                        margin: '0 auto',
                        height: '5px',
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                />
                <Box
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <Button
                        variant="contained"
                        sx={buttonStyle}
                        disabled={cartItems.length === 0}
                        onClick={() => navigate('/user/checkout', { state: { cartItems: cartItems } })}
                    >
                        proceed
                    </Button>
                </Box>
            </Box>
            <BottomNav />
        </Box>
    );
}
