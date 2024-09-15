import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function CardComponent(props) {

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: ' 0 0 auto',
        scrolllBehavior: 'auto',
        margin: '10px',
        width: '210px',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px black',
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
        border: '2px solid #00796b',
        bgcolor: '#00796b',
        color: '#ffffff',
        ':hover': {
            bgcolor: '#00796b',
            color: '#ffffff',
        }
    }

    const UnavailablebtnStyle = {
        mt: 0,
        border: '2px solid #aeaeae',
        bgcolor: '#aeaeae',
        color: '#ffffff',
        ':hover': {
            bgcolor: '#aeaeae',
            color: '#ffffff',
        }
    }

    return (
        <Card key={props.product.id} sx={cardStyle}>
            <Box>
                {props.product.productImage ?
                    (<>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '18px',
                                mt: 0,
                            }}
                        >
                            {props.name.categoryName}
                        </Typography>
                        <img
                            src={`data:image/jpeg;base64,${props.product.productImage}`}
                            alt="Lunch"
                            style={imgStyle}
                        />
                    </>

                    ) : (
                        <img
                            src="/assets/empty.jpeg"
                            alt="Lunch"
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
                    variant="contained"

                    sx={btnStyle}>
                    Available
                </Button>
            ) : (
                <Button
                    variant="outlined"

                    sx={UnavailablebtnStyle}>
                    Unavailable
                </Button>
            )}


        </Card>
    );
}
