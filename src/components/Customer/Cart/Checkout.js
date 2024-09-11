import React, { useState, useEffect } from "react";
import AppBar from "../AppBar";
import BottomNav from "../BottomNav";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, InputLabel, Select, MenuItem, FormControl, Container } from "@mui/material";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


export default function Checkout() {
    let userId = "";
    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
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
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/allRestaurents`);
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
        backgroundColor: '#cb7a01',
        color: '#ffffff',
        borderRadius: '5px',
        border: '2px solid #fe9e0d',
        alignContent: 'center',
        ':hover': {
            bgcolor: ' #fe9e0d',
        },
    };

    const textboxStyle = {
        input: {
            color: 'white',
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
            color: "#ffffff",
            fontWeight: "bold",
            borderColor: "#fe9e0d",
        },
    };

    const selectStyle = {
        mt: '5px',
        color: 'white',
        '& .Mui-selected': {
            color: 'white',
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
            color: "#ffffff",
            fontWeight: "bold",
            borderColor: "#fe9e0d",
        },
    };

    const datePicker = {
        mt: '1.5',
        mb: 1,
        '& .MuiInputBase-input': {
            color: 'white',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: "2px",
            borderColor: "#fe9e0d",
        },
        '& .MuiInputLabel-root': {
            color: "#ffffff",
            fontWeight: "bold",
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "#fe9e0d",
            borderWidth: "3px",
        },
        '& .MuiSvgIcon-root': {
            color: 'white',
        },
    };

    return (
        <Box>
            <AppBar />
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    mt: '20px',
                    mb: '20px',
                    textDecoration: 'underline',
                }}
            >
                Order Details
            </Typography>
            <Box sx={{ textAlign: 'center', alignItems: 'center' }}>
                <table width={'50%'}>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'right', paddingRight: '10px', width: '48%' }}>Customer ID : </td>
                            <td style={{ textAlign: 'left', width: '52%' }}>{userDetails.userId}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', paddingRight: '10px' }}>Customer Name : </td>
                            <td style={{ textAlign: 'left' }}>{userDetails.firstName} {userDetails.lastName}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right', paddingRight: '10px' }}>Customer Email : </td>
                            <td style={{ textAlign: 'left' }}>{userDetails.email}</td>
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
                    <FormControl
                        fullWidth
                        sx={selectStyle}
                    >
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
                    <FormControl
                        fullWidth
                        sx={selectStyle}
                    >
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
                            // value={orderDetails.reservationAddress || ""}
                            onChange={handleChange}
                        />
                    )}
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
                                    <TableCell align="center" sx={{ color: 'white' }}>
                                        {productDetailsMap[cartItem.productId]?.productName || "Loading..."}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>{cartItem.productQuantity}</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>
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