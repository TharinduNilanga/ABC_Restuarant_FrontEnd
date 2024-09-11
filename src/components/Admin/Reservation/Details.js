import React, { useState, useEffect } from "react";
import Menu from '../Menu';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Details() {
    const navigate = useNavigate();
    const location = useLocation();
    const { reservationId } = location.state;
    const [reservations, setReservations] = useState({
        reservationProducts: [],
    });
    const [customerDetails, setCustomerDetails] = useState({});
    const [type, setType] = useState({});
    const [restaurent, setRestaurent] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadReservations();
        }
    }, []);

    const loadReservations = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/reservation/${reservationId}`);
            setReservations(result.data);
            await loadCustomerDetails(result.data.customerId);
            await loadTypeDetails(result.data.reservationType);
            await loadReastaurentDetails(result.data.reservationLocation);
            await loadProductNames(result.data.reservationProducts);
        } catch (error) {
            console.error("Error loading reservations:", error);
            setError("Failed to load reservations.");
        } finally {
            setLoading(false);
        }
    };

    const loadCustomerDetails = async (customerId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${customerId}`);
            setCustomerDetails(result.data);
        } catch (error) {
            console.error("Error loading details:", error);
            setError("Failed to load details.");
        }
    };

    const loadTypeDetails = async (typeId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/${typeId}`);
            setType(result.data);
        } catch (error) {
            console.error("Error loading details:", error);
            setError("Failed to load details.");
        }
    };

    const loadReastaurentDetails = async (locationId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/${locationId}`);
            setRestaurent(result.data);
        } catch (error) {
            console.error("Error loading details:", error);
            setError("Failed to load details.");
        }
    };

    const loadProductNames = async (reservationProducts) => {
        try {
            const productMap = new Map();

            reservationProducts.forEach((productId) => {
                if (productMap.has(productId)) {
                    productMap.set(productId, productMap.get(productId) + 1);
                } else {
                    productMap.set(productId, 1);
                }
            });

            const productsWithQuantities = await Promise.all(
                Array.from(productMap.entries()).map(async ([productId, quantity]) => {
                    const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/product/${productId}`);
                    return { id: productId, name: result.data.productName, quantity, price: result.data.productPrice };
                })
            );

            setProducts(productsWithQuantities);
            calculateTotal(productsWithQuantities);
        } catch (error) {
            console.error("Error loading product details:", error);
            setError("Failed to load product details.");
        }
    };

    const calculateTotal = (products) => {
        const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
        setReservations(prevReservations => ({
            ...prevReservations,
            reservtionTotal: total,
        }));
    };

    const date = (reservationDate) => reservationDate ? reservationDate.split('T')[0] : 'N/A';
    const time = (reservationDate) => reservationDate ? reservationDate.split('T')[1].split('Z')[0].slice(0, 5) : 'N/A';

    const buttonStyle = {
        mt: '40px',
        backgroundColor: '#cb7a01',
        color: '#ffffff',
        borderRadius: '5px',
        border: '2px solid #fe9e0d',
        alignContent: 'center',
        ':hover': {
            bgcolor: ' #fe9e0d',
        },
    };

    return (
        <Grid2 sx={{ minWidth: '800px' }}>
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 20px',
                    marginLeft: '240px'
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'white',
                        color: '#fe9e0d',
                        borderRadius: '10px',
                        ':hover': {
                            bgcolor: ' #fe9e0d',
                            color: 'white',
                        },
                    }}
                    startIcon={<ArrowBackIosIcon />}
                    onClick={() => navigate("/admin/reservations")}
                >
                    Back
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: ' #fe9e0d',
                            textDecoration: 'underline'
                        }}
                    >
                        Reservation Details
                    </Typography>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                            <CircularProgress
                                size={70}
                                thickness={4}
                                sx={{
                                    color: '#fe9e0d',
                                }}
                            />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <Box sx={{ width: '40%', overflow: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td align="right"><b>Reservation ID</b></td>
                                        <td><b>:</b></td>
                                        <td align="left">
                                            {reservations.reservationId}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="35%" align="right"><b>Customer ID</b></td>
                                        <td width="10%"><b>:</b></td>
                                        <td width="55%" align="left" scope="row">
                                            {reservations.customerId}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right"><b>Customer Name</b></td>
                                        <td><b>:</b></td>
                                        <td align="left" scope="row">
                                            {customerDetails.firstName} {customerDetails.lastName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right"><b>Customer Email</b></td>
                                        <td><b>:</b></td>
                                        <td align="left" scope="row">
                                            {customerDetails.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right"><b>Type</b></td>
                                        <td><b>:</b></td>
                                        <td align="left" scope="row">
                                            {type.facilityName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right"><b>Date</b></td>
                                        <td><b>:</b></td>
                                        <td align="left" scope="row">
                                            {date(reservations.reservationDate)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right"><b>Time</b></td>
                                        <td><b>:</b></td>
                                        <td align="left" scope="row">
                                            {time(reservations.reservationDate)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right"><b>Note</b></td>
                                        <td><b>:</b></td>
                                        <td align="left" scope="row">
                                            {reservations.reservationNote || "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right"><b>Location</b></td>
                                        <td><b>:</b></td>
                                        <td align="left" scope="row">
                                            {restaurent.locationName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right"><b>Status</b></td>
                                        <td><b>:</b></td>
                                        <td align="left" scope="row">
                                            {reservations.reservationStatus}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right"><b>Products</b></td>
                                        <td><b>:</b></td>
                                        <td align="left" scope="row">
                                            {products.map((product) => (
                                                <Typography key={product.name}>
                                                    {product.name} x {product.quantity}
                                                </Typography>
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="right"><b>Total</b></td>
                                        <td><b>:</b></td>
                                        <td align="left" scope="row">
                                            Rs. {reservations.reservtionTotal || 0}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {reservations.reservationStatus ? (null) : (
                                <Button
                                    variant="contained"
                                    sx={buttonStyle}
                                    onClick={() => navigate('/admin/reservation/checkout', { state: { reservation: reservations, customerDetails: customerDetails, restaurent: restaurent, products: products, type: type } })}
                                >
                                    CheckOut
                                </Button>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </Grid2>
    );
}
