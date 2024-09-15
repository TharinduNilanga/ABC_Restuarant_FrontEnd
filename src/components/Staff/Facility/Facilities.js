import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import Card from "./Card";
import { Box, Typography, CircularProgress } from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Facilities() {
    const navigate = useNavigate();
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '2') {
            navigate('/login');
        } else {
            const fetchData = async () => {
                try {
                    await loadFacility();
                } catch (err) {
                    setError("Failed to load facilities.");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, []);

    const loadFacility = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/allFacilities`);
            setFacilities(result.data);
        } catch (error) {
            console.error("Error loading facilities:", error);
            throw error;
        }
    };

    return (
        <Box sx={{ bgcolor: 'white', overflow: 'hidden' }}>
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 0px 30px 40px',
                    marginLeft: '240px',
                    height: '92vh',
                    marginBottom: '20px',
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
                ) : facilities.length > 0 ? (
                    <Box sx={{ mb: '30px' }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {facilities.map((facility) => (
                                <Card key={facility.id} facility={facility} />
                            ))}
                        </Box>
                    </Box>
                ) : (
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            margin: 'auto'
                        }}
                    >
                        No Facility Available.
                    </Typography>
                )}
            </Box>
        </Box >
    );
}
