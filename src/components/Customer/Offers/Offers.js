import React, { useEffect, useState } from "react";
import AppBar from "../AppBar";
import Card from "./Card";
import BottomNav from "../BottomNav"
import { Box, Grid, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Offers() {
    let userId = "";
    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '3') {
            navigate('/login');
        }
    }, [navigate]);

    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadOffer();
            } catch (err) {
                setError("Failed to load offers");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const loadOffer = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/offer/allOffers`);
            setOffers(result.data);
        } catch (error) {
            console.error("Error loading offers:", error);
            throw error;
        }
    };

    const availableOffers = offers.filter(offer => offer.offerStatus === "Available");

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                bgcolor: 'white'
            }}
        >
            <AppBar sx={{ display: 'fixed' }} />
            <Box
                sx={{
                    padding: "3% 7%"
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
                ) : availableOffers.length > 0 ? (
                    <Box sx={{ mb: '30px' }}>
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>Offers</Typography>
                        <Box sx={{ display: 'grid' }}>
                            <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="space-around" alignItems="center">
                                {availableOffers.map((offer) => (
                                    <Grid item key={offer.id}>
                                        <Card offer={offer} />
                                    </Grid>
                                ))}
                            </Grid>
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
                        No Offers Available.
                    </Typography>
                )}
            </Box>

        </Box>
    );
}
