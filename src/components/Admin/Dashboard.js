import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect } from "react";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        }
    }, []);

    const imgStyle = {
        mt: '20px',
        borderRadius: '10px',
        height: '90vh',
        objectFit: 'cover',
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px'
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px'
                }}
            >
                <Box>

                    <img src="/assets/Home.png" alt="restaurant"
                        style={imgStyle}
                    />
                </Box>
            </Box>
        </Grid2>

    )
}