import React, { useEffect } from "react";
import Menu from "./Menu"
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '2') {
            navigate('/login');
        }
    }, []);


    const imgStyle = {
        mt: '20px',
        borderRadius: '10px',
        height: '75vh',
        objectFit: 'cover',
    };

    return (
        <Box>
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px'
                }}
            >
                <Box>
                    <Typography variant="h3">

                    </Typography>
                    <img src="/assets/Home.png" alt="restaurant"
                        style={imgStyle}
                    />
                </Box>
            </Box >
        </Box >
    )
}