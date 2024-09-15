import React, { useState, useEffect } from "react";
import Menu from '../Menu';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { message } from "antd";

export default function Restaurents() {
    const navigate = useNavigate();

    const [restaurents, setRestaurents] = useState([]);
    const [Facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadRestaurents();
            loadFacilities();
        }
    }, []);

    const loadRestaurents = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/allRestaurents/`);

            setRestaurents(result.data);
        } catch (error) {
            console.error("Error loading restaurants:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const loadFacilities = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/facility/allFacilities`);
            setFacilities(result.data);
        } catch (error) {
            console.error("Error loading user data:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const getFacilityNames = (facilityIds) => {
        console.log('====================================',facilityIds);
        console.log(Facilities);
        console.log('====================================');
        return facilityIds.map(id => {
            const facility = Facilities.find(f => f.facilityId === id);
            return facility ? facility.facilityName : '';
        }).join(', ');
    };

    const deleteRestaurents = async (id) => {
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/${id}`);
            if (response) {
                console.log('User deleted successfully');
                message.success("Restuarant Deleted Succesfully")
                loadRestaurents();
            }
        } catch (error) {
            console.error('Error deleting restaurants:', error);
            message.error("Restuarant Deleted Failed")
        }
    };


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
                    height: '642px'
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between', // Aligns content to the right
                        textAlign: 'center',
                        margin: '20px auto 5px',

                    }}
                ><Typography fontSize="20px" sx={{ color: 'black', fontWeight: 'bold' }}>Resturant Form</Typography>

                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/addRestaurants')}
                        sx={{
                            backgroundColor: '#00796b',
                            color: 'white',
                            ':hover': {
                                bgcolor: ' white',
                                color: '#00796b',
                            },
                        }}
                    >
                        Add new Location
                    </Button>
                </Box>

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
                ) : restaurents.length > 0 ? (
                    <><Box>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 600 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                Location Name
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                Address
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                City
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                District
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                Phone
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                Facilities
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {restaurents.map((restaurent) => (
                                            <TableRow key={restaurent.locationId}>
                                                <TableCell align="center" component="th" scope="row">{restaurent.locationName}</TableCell>
                                                <TableCell align="center">{restaurent.locationAddress}</TableCell>
                                                <TableCell align="center">{restaurent.locationCity}</TableCell>
                                                <TableCell align="center">{restaurent.locationDistrict}</TableCell>
                                                <TableCell align="center">{restaurent.locationPhone}</TableCell>
                                                <TableCell align="center">{getFacilityNames(restaurent.locationFacilities)}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        onClick={() => navigate('/admin/editRestaurants', { state: { locationId: restaurent.locationId } })}
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
                                                        onClick={() => deleteRestaurents(restaurent.locationId)}
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
                    </Box><Box>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    mt: '20px'
                                }}
                            >
                                Total Locations: {restaurents.length}
                            </Typography>
                        </Box></>
                ) : (
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            margin: 'auto'
                        }}
                    >
                        No Restaurant Available.
                    </Typography>
                )}
            </Box>
        </Grid2>
    );
}
