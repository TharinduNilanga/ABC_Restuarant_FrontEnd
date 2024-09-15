import React, { useEffect, useRef, useState } from "react";
import Menu from '../Menu';
import Bill from './Bill';
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";

export default function Checkout() {
    const [customerDetails, setCustomerDetails] = useState(null);
    const [products, setProducts] = useState(null);
    const [reservations, setReservations] = useState(null);
    const [restaurent, setRestaurent] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [type, setType] = useState(null);
    const [userId, setUserId] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);  // Popup state

    const navigate = useNavigate();
    const location = useLocation();
    const pdfRef = useRef();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            if (location.state) {
                setUserId(userId);
                setCustomerDetails(location.state.customerDetails || null);
                setProducts(location.state.products || null);
                setReservations(location.state.reservation || null);
                setRestaurent(location.state.restaurent || null);
                setType(location.state.type || null);
                getUserDetails(userId);
            }
        }
    }, [location.state]);

    const getUserDetails = async (userId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}`);
            setUserDetails(result.data);
        } catch (error) {
            console.error("Error loading details:", error);
        }
    };

    const handleOpenPopup = () => {
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const downloadPDF = () => {
        if (!reservations) return;

        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`invoice - Reservation No: ${reservations.reservationId}.pdf`);
        });
        updateStatus();
        handleClosePopup();  // Close the popup after downloading the PDF
    };

    const updateStatus = async () => {
        if (!reservations) return;

        const updatedReservation = {
            ...reservations,
            reservationStatus: "Finished"
        };

        try {
            await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/reservation/${reservations.reservationId}`, updatedReservation);
            navigate('/admin/reservations');
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const buttonStyle = {
        mt: '5px',
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

    if (!customerDetails || !products || !reservations || !restaurent || !userDetails) {
        return <div>Loading...</div>; // Add a loading spinner or message
    }

    return (
        <Grid2 sx={{ minWidth: '800px', height: '100vh' }}>
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 20px',
                    marginLeft: '240px',
                    scrollBehavior: 'smooth',

                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Aligns content to the right
                    textAlign: 'center',
                    margin: '20px auto 5px',

                }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#00796b',
                            color: '#ffffff',
                            borderRadius: '5px',
                            border: '2px solid #00796b',
                            ml: 5,
                            alignContent: 'center',
                            ':hover': {
                                bgcolor: ' white',
                                color: '#00796b',
                            },
                        }}
                        startIcon={<ArrowBackIosIcon />}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            mt: '5px',
                            padding: '5px 80px',
                            backgroundColor: 'green',
                            color: '#ffffff',
                            borderRadius: '5px',
                            border: '2px solid green',
                            alignContent: 'center',
                            ':hover': {
                                bgcolor: ' white',
                                color: '#00796b',
                            },
                        }}
                        onClick={handleOpenPopup}  // Open the popup
                    >
                        Pay
                    </Button>
                </Box>


                {/* <Box
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        overflow: 'hidden'
                    }}
                >

                </Box> */}

                {/* Popup Dialog for Bill Preview */}
                <Dialog
                    open={openPopup}
                    onClose={handleClosePopup}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle sx={{ color: 'white' }}>Bill Preview</DialogTitle>
                    <DialogContent dividers>
                        <div ref={pdfRef}>
                            <Bill userDetails={userDetails} customerDetails={customerDetails} products={products} reservation={reservations} restaurent={restaurent} type={type} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePopup} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={downloadPDF} color="primary">
                            Download PDF
                        </Button>
                    </DialogActions>
                </Dialog>

                <Box
                    sx={{
                        textAlign: 'center',
                        borderRadius: '8px',
                        margin: '30px 90px',
                        mb: '20px',
                    }}
                >
                    <div ref={pdfRef}>
                        <Bill userDetails={userDetails} customerDetails={customerDetails} products={products} reservation={reservations} restaurent={restaurent} type={type} />
                    </div>
                </Box>
            </Box>
        </Grid2>
    );
}
