import React, { useState, useEffect } from "react";
import AppBar from "../AppBar";
import BottomNav from "../BottomNav";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, InputLabel, Select, MenuItem, FormControl, Container, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


export default function Checkout() {
    let userId = "";
    let navigate = useNavigate();

    useEffect(() => {
        userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '3') {
            navigate('/login');
        }
    }, [navigate]);

    const [userDetails, setUserDetails] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [productDetailsMap, setProductDetailsMap] = useState({});
    const [facilities, setFacilities] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [orderDetails, setOrderDetails] = useState({
        customerId: "",
        reservationProducts: [],
        reservationType: "",
        reservationDate: dayjs(),
        reservationTime: dayjs(),
        reservationNote: "",
        reservationLocation: "",
        reservationPlacedTime: "",
        reservationTotal: 0,
        reservationStatus: "",
    });

    const loadUserDetails = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}`);
            setUserDetails(result.data);
        } catch (error) {
            setError("Failed to load user details.");
        } finally {
            setLoading(false);
        }
    };

    const loadCart = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/cart/byCustomer/${userId}`);
            setCartItems(result.data);
        } catch (err) {
            setError("Failed to load cart.");
        } finally {
            setLoading(false);
        }
    };

    const loadProductDetails = async (productId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/product/${productId}`);
            setProductDetailsMap((prev) => ({ ...prev, [productId]: result.data }));
        } catch (err) {
            console.error("Error loading product details:", err);
            setError("Failed to load product details.");
        }
    };

    const loadFacilities = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/allFacilities`);
            setFacilities(result.data);
        } catch (err) {
            console.error("Error loading facilities:", err);
            setError("Failed to load facilities.");
        }
    };

    const loadRestaurants = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/allRestaurents/`);
            setRestaurants(result.data);
        } catch (err) {
            console.error("Error loading restaurants:", err);
            setError("Failed to load restaurants.");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrderDetails((prevOrderDetails) => ({
            ...prevOrderDetails,
            [name]: value,
        }));
    };

    const handleDateChange = (name, value) => {
        setOrderDetails((prevOrderDetails) => ({
            ...prevOrderDetails,
            [name]: value,
        }));
    };

    const handleClick = async (event) => {
        event.preventDefault();
        userId = sessionStorage.getItem('userId');
        const updatedOrderDetails = {
            customerId: userId,
            reservationProducts: cartItems.flatMap(item =>
                Array(item.productQuantity).fill(item.productId)
            ),
            reservationType: selectedMethod,
            reservationDate: orderDetails.reservationDate,
            reservationTime: orderDetails.reservationTime,
            reservationNote: orderDetails.reservationNote || "",
            reservationLocation: orderDetails.reservationLocation,
            reservationPlacedTime: new Date().toISOString(),
            reservationTotal: total,
            reservationStatus: orderDetails.reservationStatus || ""
        };

        try {
            await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/reservation/addReservation`, updatedOrderDetails);
            await deleteFromCartCollection();
        } catch (err) {
            console.error("Error placing order:", err);
            setError("Failed to place the order.");
        }
    };

    const deleteFromCartCollection = async () => {
        try {
            const deletionPromises = cartItems.map(cartItem =>
                Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/cart/${cartItem.id}`)
            );
            await Promise.all(deletionPromises);
            window.alert("Order Placed!");
            navigate('/user/menu');
        } catch (err) {
            console.error("Error deleting items from cart:", err);
            setError("Failed to delete items from cart.");
        }
    };

    const handleMethodChange = (e) => {
        setSelectedMethod(e.target.value);
    };

    useEffect(() => {
        loadUserDetails();
        loadCart();
        loadFacilities();
        loadRestaurants();
    }, []);

    useEffect(() => {
        if (cartItems.length > 0) {
            cartItems.forEach(cartItem => {
                if (!productDetailsMap[cartItem.productId]) {
                    loadProductDetails(cartItem.productId);
                }
            });
        }
    }, [cartItems, productDetailsMap]);

    useEffect(() => {
        let totalAmount = 0;
        cartItems.forEach(cartItem => {
            const product = productDetailsMap[cartItem.productId];
            if (product) {
                totalAmount += cartItem.productQuantity * product.productPrice;
            }
        });
        setTotal(totalAmount);
    }, [cartItems, productDetailsMap]);

    const buttonStyle = {
        mt: '30px',
        mb: '30px',
        padding: '5px 80px',
        backgroundColor: '#00796b',
        color: '#ffffff',
        borderRadius: '5px',
        border: '2px solid #00796b',
        alignContent: 'center',
        ':hover': {
            bgcolor: 'white',
            color: '#00796b',
        },
    };

    const textboxStyle = {
        input: {
            color: 'black',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#fe9e0d",
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fe9e0d",
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "black",
            fontWeight: "bold",
            borderColor: "#fe9e0d",
        },
    };

    const selectStyle = {
        mt: '5px',
        color: 'black',
        '& .Mui-selected': {
            color: 'black',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#00796b",
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00796b",
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "black",
            fontWeight: "bold",
            borderColor: "#00796b",
        },
    };

    const datePicker = {

        '& .MuiInputBase-input': {
            color: 'black',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: "2px",
            borderColor: "#00796b",
        },
        '& .MuiInputLabel-root': {
            color: "black",
            fontWeight: "bold",
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "#00796b",
            borderWidth: "3px",
        },
        '& .MuiSvgIcon-root': {
            color: 'black',
        },
    };

    return (
        <Box sx={{ bgcolor: 'white',height:'100vh' }}>
            <AppBar />
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    mt: '20px',
                    mb: '20px',
                    textDecoration: 'underline',
                    color: '#00796b',
                }}
            >
                Order Details
            </Typography>
            <Box sx={{ textAlign: 'center', alignItems: 'center' }}>
                <table width={'50%'}>s
                    <tbody>
                        <tr>
                            <td style={{ color: 'black', textAlign: 'right', paddingRight: '10px', width: '48%' }}>Customer ID : </td>
                            <td style={{ color: 'black', textAlign: 'left', width: '52%' }}>{userDetails.userId}</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'black', textAlign: 'right', paddingRight: '10px' }}>Customer Name : </td>
                            <td style={{ color: 'black', textAlign: 'left' }}>{userDetails.firstName} {userDetails.lastName}</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'black', textAlign: 'right', paddingRight: '10px' }}>Customer Email : </td>
                            <td style={{ color: 'black', textAlign: 'left' }}>{userDetails.email}</td>
                        </tr>
                    </tbody>
                </table>
            </Box>
            <Container
                component="main"
                maxWidth="xs"
            >
                <Box
                    component="form"
                    onSubmit={handleClick}
                    noValidate
                    sx={{
                        mt: 1,
                    }}
                >
                    {/* First Row: Form Controls */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth sx={selectStyle}>
                                <InputLabel id="location-label">Restaurant</InputLabel>
                                <Select
                                    labelId="location-label"
                                    id="reservationLocation"
                                    value={orderDetails.reservationLocation}
                                    name="reservationLocation"
                                    label="Location"
                                    onChange={handleChange}
                                >
                                    {restaurants.map((restaurant) => (
                                        <MenuItem key={restaurant.locationId} value={restaurant.locationId}>
                                            {restaurant.locationName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth sx={selectStyle}>
                                <InputLabel id="method-label">Method</InputLabel>
                                <Select
                                    labelId="method-label"
                                    id="reservationMethod"
                                    value={selectedMethod}
                                    label="Method"
                                    onChange={handleMethodChange}
                                >
                                    {facilities.map((facility) => (
                                        <MenuItem key={facility.facilityId} value={facility.facilityId}>
                                            {facility.facilityName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Conditional Address Field (spans full width) */}
                    {selectedMethod === 3 && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="reservationAddress"
                            label="Address"
                            name="reservationAddress"
                            autoComplete="address"
                            multiline
                            rows={3}
                            sx={textboxStyle}
                            onChange={handleChange}
                        />
                    )}

                    {/* Second Row: Date and Time Pickers */}
                    <Grid container spacing={1} sx={{
                        mt: 2, display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Grid item xs={8}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Date"
                                        value={orderDetails.reservationDate}
                                        onChange={(newValue) => handleDateChange("reservationDate", newValue)}
                                        sx={datePicker}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={8}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                        label="Time"
                                        value={orderDetails.reservationTime}
                                        onChange={(newValue) => handleDateChange("reservationTime", newValue)}
                                        sx={datePicker}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>

            </Container>
            <Box>
                <TableContainer sx={{ maxHeight: 600, width: '50%', margin: 'auto', mt: '10px', }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ backgroundColor: '#cccccc', borderRadius: '10px 0px 0px 0px' }}>Product</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#cccccc' }}>Quantity</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#cccccc', borderRadius: '0px 10px 0px 0px' }}>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((cartItem) => (
                                <TableRow key={cartItem.productId}>
                                    <TableCell align="center" sx={{ color: 'black' }}>
                                        {productDetailsMap[cartItem.productId]?.productName || "Loading..."}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }}>{cartItem.productQuantity}</TableCell>
                                    <TableCell align="center" sx={{ color: 'black' }}>
                                        Rs. {(cartItem.productQuantity || 0) * (productDetailsMap[cartItem.productId]?.productPrice || 0)}.00
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography variant="h6">
                    Total Amount: Rs. {total}.00
                </Typography>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    overflow: 'hidden',
                }}
            >
                <Button
                    type="submit"
                    variant="contained"
                    sx={buttonStyle}
                    onClick={handleClick}
                >
                    Place order
                </Button>
            </Box>
            <BottomNav />
        </Box>
    );
}