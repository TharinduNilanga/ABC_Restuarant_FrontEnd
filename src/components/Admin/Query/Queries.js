import React, { useEffect, useState } from 'react';
import Menu from '../Menu';
import QueryButton from './QueryButton';
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Queries() {
    let navigate = useNavigate();
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            const fetchData = async () => {
                try {
                    await getQueries();
                } catch (err) {
                    setError("Failed to load Queries.");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, []);

    const getQueries = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/query/allQueries`);
            const allQueries = result.data;
            const latestQueries = allQueries.reduce((acc, query) => {
                const { queryCustomer } = query;
                const queryDate = new Date(query.queryTime);
                if (!acc[queryCustomer] || queryDate > new Date(acc[queryCustomer].queryTime)) {
                    acc[queryCustomer] = query;
                }
                return acc;

            }, {});

            // Convert the object back to an array
            setQueries(Object.values(latestQueries));
        } catch (error) {
            console.error("Error loading queries:", error);
            setError("Failed to load Queries.");
        }
    };

    return (
        <Grid2 sx={{ minWidth: '800px' }}>
            <Menu />
            <Box component="main" sx={{ padding: '60px 80px', marginLeft: '240px' }}>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
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
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>{error}</Typography>
                ) : queries.length !== 0 ? (
                    queries.map((query) => <QueryButton key={query.queryId} query={query} />)
                ) : (
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>No Query Found.</Typography>
                )}
            </Box>
        </Grid2>
    );
}