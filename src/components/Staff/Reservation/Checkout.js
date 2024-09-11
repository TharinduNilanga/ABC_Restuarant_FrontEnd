import React, { useEffect, useRef, useState } from "react";
import Menu from '../Menu';
import Bill from './Bill';
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Box, Button } from "@mui/material";
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

    const navigate = useNavigate();
    const location = useLocation();
    const pdfRef = useRef();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '2') {
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
    },[]);

    const getUserDetails = async (userId) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${userId}`);
            setUserDetails(result.data);
        } catch (error) {
            console.error("Error loading details:", error);
        }
    };

    const downloadPDF = () => {
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
    }

    const updateStatus = async () => {
        const updatedReservation = {
            ...reservations,
            reservationStatus: "Finished"
        };

        try {
            await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/reservation/${reservations.reservationId}`, updatedReservation);
            navigate('/staff/reservations');
        } catch (error) {
            console.error(error);
        }
    }

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

    return (
        <Grid2 sx={{ minWidth: '800px' }}>
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 20px',
                    marginLeft: '240px',
                    scrollBehavior: 'smooth', 
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
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <Box
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        overflow: 'hidden'
                    }}
                >
                    <Button
                        variant="contained"
                        sx={buttonStyle}
                        onClick={downloadPDF}
                    >
                        Pay
                    </Button>
                </Box>
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
    )
};
