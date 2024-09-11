import React, { useState, useEffect } from "react";
import Menu from '../Menu';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Offer() {
    const navigate = useNavigate();

    const [offers, setOffers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadOffers();
            loadCategories();
        }
    }, [navigate]);

    const loadOffers = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/offer/allOffers`);
            setOffers(result.data);
        } catch (error) {
            console.error("Error loading offers:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadCategories = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading product categories:", error);
        }
    };

    const getCategoryNames = (categoryIds) => {
        return categoryIds.map(id => {
            const category = categories.find(f => f.categoryId === id);
            return category ? category.categoryName : '';
        }).join(', ');
    };

    const deleteOffer = async (id) => {
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/offer/${id}`);
            if (response.status === 200) {
                console.log('Offer deleted successfully');
                loadOffers();
            }
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    };

    const getDate = (dateTime) => {
        return (dateTime.substring(0, 10));
    }

    return (
        <Grid2
            container
            justifyContent="center"
            sx={{
                minWidth: '800px',
                bgcolor: 'white',
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                    height: '642px'
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '60vh',
                        }}
                    >
                        <CircularProgress
                            size={70}
                            thickness={4}
                            sx={{
                                color: '#00796b',
                            }}
                        />
                    </Box>
                ) : (
                    <Box>
                        <Box
                            sx={{
                                textAlign: 'center',
                                marginBottom: '30px',
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => navigate('/admin/addOffer')}
                                sx={{
                                    backgroundColor: '#00796b',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    fontWeight: 'bold',
                                    borderRadius: '30px',
                                    ':hover': {
                                        bgcolor: '#005f56',
                                    },
                                }}
                            >
                                Add New Offer
                            </Button>
                        </Box>
                        <Box>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 600 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {['Offer Id', 'Offer Name', 'Description', 'Image', 'Price', 'Discount', 'Status', 'From', 'To', 'Categories', 'Actions'].map((header) => (
                                                    <TableCell
                                                        key={header}
                                                        align="center"
                                                        sx={{
                                                            backgroundColor: '#f0f0f0',
                                                            fontWeight: 'bold',
                                                            color: '#333',
                                                        }}
                                                    >
                                                        {header}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {offers.map((offer) => (
                                                <TableRow key={offer.id}>
                                                    <TableCell align="center">{offer.offerId}</TableCell>
                                                    <TableCell align="center">{offer.offerName}</TableCell>
                                                    <TableCell align="center">{offer.offerDescription}</TableCell>
                                                    <TableCell align="center">
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: '#00796b',
                                                                color: '#fff',
                                                                ':hover': {
                                                                    bgcolor: '#005f56',
                                                                }
                                                            }}
                                                        >
                                                            View
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell align="center">{offer.offerPrice}</TableCell>
                                                    <TableCell align="center">{offer.offerDiscount}</TableCell>
                                                    <TableCell align="center">{offer.offerStatus}</TableCell>
                                                    <TableCell align="center">{getDate(offer.offerStartDate)}</TableCell>
                                                    <TableCell align="center">{getDate(offer.offerEndDate)}</TableCell>
                                                    <TableCell align="center">{getCategoryNames(offer.offerCategory)}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() => navigate('/admin/editOffer', { state: { id: offer.id } })}
                                                            aria-label="edit"
                                                            sx={{
                                                                color: '#00796b',
                                                                ':hover': {
                                                                    color: '#005f56',
                                                                }
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() => deleteOffer(offer.id)}
                                                            sx={{
                                                                color: '#f44336',
                                                                ':hover': {
                                                                    color: '#d32f2f',
                                                                }
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                        <Box
                            sx={{
                                textAlign: 'center',
                                marginTop: '20px',
                                color: '#777',
                            }}
                        >
                            <Typography>Total Offers: {offers.length}</Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </Grid2>
    );
}
