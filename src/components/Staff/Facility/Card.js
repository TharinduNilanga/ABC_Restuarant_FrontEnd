import React from "react";
import { Box, Card, Typography } from "@mui/material";

export default function CardComponent(props) {

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: ' 0 0 auto',
        scrolllBehavior: 'auto',
        margin: '10px',
        width: '350px',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px black',
        userSelect: 'none',
    };

    const imgStyle = {
        borderRadius: '5px',
        height: '100%',
        objectFit: 'cover',
    };

    return (
        <Card key={props.facility.id} sx={cardStyle}>
            <Box
                sx={{
                   
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        mt: 0,
                        textTransform: 'uppercase',
                        fontSize: 'clamp(12px, 3cqw, 98px)',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                       
                    }}
                >
                    {props.facility.facilityName}
                </Typography>
            </Box>
            <Box
                sx={{
                    // writingMode: 'sideways-lr',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '20px',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        mt: 0,
                        textTransform: 'uppercase',
                        fontSize: '16px',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        
                    }}
                >
                    {props.facility.facilityDescription}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: '90%',
                    marginLeft: 'auto',
                }}
            >
                {props.facility.offerImage ? (
                    <img
                        src={`data:image/jpeg;base64,/${props.facility.offerImage}`}
                        alt="Lunch"
                        style={imgStyle}
                    />
                ) : (
                    <img
                        src={`/assets/${props.facility.facilityName.toLowerCase()}.png`}
                        alt={props.facility.facilityName.toLowerCase()}
                        style={imgStyle}
                    />
                )}
            </Box>
        </Card>
    );
}