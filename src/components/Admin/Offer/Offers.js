import React, { useState, useEffect } from "react";
import Menu from '../Menu';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { message } from "antd";

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
                message.success("Offer Deleted Successfully")
                loadOffers();
            }
        } catch (error) {
            console.error('Error deleting offer:', error);
            message.success("Offer Deleted Failed")
        }
    };

    const getDate = (dateTime) => {
        return (dateTime.substring(0, 10));
    }

    return (
        <Grid2
           
            sx={{
                minWidth: '800px',
                bgcolor: 'white',
                 height: '100vh'
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                  
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
                                display: 'flex',
                                justifyContent: 'space-between', // Aligns content to the right
                                textAlign: 'center',
                                margin: '20px auto 5px',

                            }}
                        >
                            <Typography fontSize="20px" sx={{ color: 'black', fontWeight: 'bold' }}>Offer Form</Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/admin/addOffer')}
                                sx={{
                                    backgroundColor: '#00796b',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    fontWeight: 'bold',

                                    ':hover': {
                                        bgcolor: 'white',
                                        color: '#00796b',
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
                                                        {offer.offerImage && (
                                                            <img
                                                                src={`data:image/jpeg;base64,${offer.offerImage}`}
                                                                alt="Category"
                                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                            />
                                                        )}
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
                                                                backgroundColor: 'white',
                                                                marginRight: '3px',
                                                                ':hover': {
                                                                    color: 'white',
                                                                    backgroundColor: '#00796b',
                                                                }
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() => deleteOffer(offer.id)}
                                                            sx={{
                                                                color: '#ff6666',
                                                                backgroundColor: 'white',
                                                                marginLeft: '3px',
                                                                ':hover': {
                                                                    color: '#ff0000',
                                                                    backgroundColor: '#00796b',
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
