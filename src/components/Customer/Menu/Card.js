import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Axios from "axios";
import React, { useEffect, useState } from "react";

export default function CardComponent(props) {
    
// #######################################################################
    let userId = "";
// #######################################################################

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        userId=sessionStorage.getItem('userId')
    },[])

    const handleClick = async (productId) => {
        console.log('====================================');
        console.log(userId);
        console.log('====================================');
        setLoading(true);
        try {
            const response = await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/cart/addOrUpdateCart`, null, {
                params: {
                    customerId: userId,
                    productId: productId,
                },
            });
            console.log('====================================');
            console.log(response);
            console.log('====================================');

        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    
    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: ' 0 0 auto',
        scrolllBehavior: 'auto',
        margin: '10px',
        width: '210px',
        
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        userSelect: 'none',
        ':hover': {
            border: '2px solid rgba(254, 158, 13, 0.7)',
            boxShadow: '0px 0px 10px rgba(254, 158, 13, 0.7)',
            cursor: 'pointer',
        }
    };

    const imgStyle = {
        borderRadius: '5px',
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        aspectRatio: '1 / 1',
    };

    const btnStyle = {
        mt: 0,
        border: '2px solid #fe9e0d',
        bgcolor: '#ffffff',
        color: '#fe9e0d',
        ':hover': {
            bgcolor: '#fe9e0d',
            color: '#ffffff',
        }
    }

    const UnavailablebtnStyle = {
        mt: 0,
        border: '2px solid #fe9e0d',
        bgcolor: '#ffffff',
        color: '#fe9e0d',
        ':hover': {
            bgcolor: '#fe9e0d',
            color: '#ffffff',
        }
    }

    return (
        <Card key={props.product.id} sx={cardStyle}>
            <Box>
                {props.product.productImage ?
                    (
                        <img
                            src={`/${props.product.productImage}`}
                            alt=""
                            style={imgStyle}
                        />
                    ) : (
                        <img
                            src="/assets/empty.jpeg"
                            alt="Product"
                            style={imgStyle}
                        />
                    )
                }
            </Box>
            <CardContent
                sx={{
                    padding: '5px'
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        mt: 0,
                    }}
                >
                    {props.product.productName}
                </Typography>
                <Typography
                    sx={{
                        fontSize: '12px'
                    }}
                >
                    {props.product.productDescription}
                </Typography>
                <Typography
                    sx={{
                        fontSize: '16px',
                        mt: 1,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Rs. {props.product.productPrice}
                </Typography>
            </CardContent>
            {props.product.productStatus === "Available" ? (
                <Button
                    onClick={() => handleClick(props.product.productId)}
                    variant="contained"
                    sx={btnStyle}>
                    Add
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    disabled
                    sx={UnavailablebtnStyle}>
                    Unavailable
                </Button>
            )}
        </Card>
    );
}
