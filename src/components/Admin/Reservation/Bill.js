import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Divider, CircularProgress } from '@mui/material';

export default function Bill(props) {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const getDate = () => {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDate = `${year}/${month}/${day} | ${hours}:${minutes}`;
        return formattedDate;
    };

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                color: '#000000',
                position: 'relative',
            }}
        >
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
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
            )}

            <Box sx={{ textAlign: 'center' }}>
                <Box
                    sx={{
                        width: '230px',
                        margin: 'auto',
                        paddingTop: '20px',
                        mb: '0px',
                    }}
                >
                    <img src='../../assets/logo.png' alt='logo' />
                </Box>
                <Typography>{props.restaurent.locationName}</Typography>
                <Typography sx={{ fontSize: '12px', mb: '20px', }}>Phone : {props.restaurent.locationPhone}</Typography>
            </Box>
            <Box>
                <Divider sx={{ borderTop: '2px dashed #000000', margin: '20px auto', width: '90%' }} />
            </Box>
            <Box>
                <Typography>Reservation ID : {props.reservation.reservationId}</Typography>
            </Box>
            <Box display={'flex'} sx={{ mt: '20px' }}>
                <Box sx={{ width: '50%' }}>
                    <table>
                        <tbody>
                            <tr>
                                <td align="right" width="40%">Customer Name</td>
                                <td align="center" width="5%">:</td>
                                <td align="left" width="55%">{props.customerDetails.firstName} {props.customerDetails.lastName}</td>
                            </tr>
                            <tr>
                                <td align="right">Customer Email</td>
                                <td align="center">:</td>
                                <td align="left">{props.customerDetails.email}</td>
                            </tr>
                            <tr>
                                <td align="right">Type</td>
                                <td align="center">:</td>
                                <td align="left">{props.type.facilityName}</td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
                <Box sx={{ width: '50%' }}>
                    <table>
                        <tbody>
                            <tr>
                                <td align="right" width="40%">Staff ID</td>
                                <td align="center" width="5%">:</td>
                                <td align="left" width="55%">{props.userDetails.userId}</td>
                            </tr>
                            <tr>
                                <td align="right">Staff Name</td>
                                <td align="center">:</td>
                                <td align="left">{props.userDetails.firstName} {props.userDetails.lastName}</td>
                            </tr>
                            <tr>
                                <td align="right">Date & Time</td>
                                <td align="center">:</td>
                                <td align="left">{getDate()}</td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
            </Box>
            <Box>
                <Divider sx={{ borderTop: '2px dashed #000000', margin: '20px auto', width: '90%' }} />
            </Box>
            <Box sx={{ padding: '5px 90px' }}>
                <table>
                    <thead>
                        <tr>
                            <th width="40%">Product Name</th>
                            <th width="20%">Price (Each)</th>
                            <th width="15%">Quantity</th>
                            <th width="25%">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td align="left" colSpan="4">
                                <Divider sx={{ borderTop: '2px solid #000000', margin: '10px auto', width: '100%' }} />
                            </td>
                        </tr>
                        {Array.isArray(props.products) && props.products.length > 0 ? (
                            props.products.map((product, index) => (
                                <tr key={index}>
                                    <td align="left" width="40%">{product.name}</td>
                                    <td align="right" width="20%">Rs. {product.price.toFixed(2)}</td>
                                    <td align="center" width="15%">{product.quantity}</td>
                                    <td align="right" width="25%">Rs. {(product.price * product.quantity).toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" align="center">No products available</td>
                            </tr>
                        )}
                        <tr>
                            <td align="left" colSpan="4">
                                <Divider sx={{ borderTop: '2px solid #000000', margin: '10px auto', width: '100%' }} />
                            </td>
                        </tr>
                        <tr>
                            <td align="left" colSpan="3"><b>Total</b></td>
                            <td align="right"><b>Rs. {props.reservation.reservtionTotal}.00</b></td>
                        </tr>
                    </tbody>
                </table>
            </Box>
            <Box>
                <Divider sx={{ borderTop: '2px dashed #000000', margin: '20px auto', width: '90%' }} />
            </Box>
            <Box sx={{ textAlign: 'center', paddingBottom: '20px' }}>
                <Typography variant='h6' sx={{ lineHeight: '1' }}>Thank You !</Typography>
                <Typography>Visit again</Typography>
            </Box>
        </Box>
    );
};
