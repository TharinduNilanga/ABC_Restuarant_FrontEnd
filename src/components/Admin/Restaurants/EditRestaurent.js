import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Menu from "../Menu";
import { Box, FormControl, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function AddUser() {

    const navigate = useNavigate();
    const location = useLocation();
    const { locationId } = location.state;

    const [form, setForm] = useState({
        locationName: "",
        locationAddress: "",
        locationCity: "",
        locationDistrict: "",
        locationPhone: "",
        locationFacilities: [],
    });
    const [Facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadRestaurent();
            loadFacilities();
        }
    }, []);

    const loadRestaurent = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/${locationId}`);
            console.log(result);

            setForm(result.data);
        } catch (error) {
            console.error("Error loading user data:", error);
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleFacilitiesChange = (event) => {
        const { value } = event.target;
        console.log(value);

        setForm((prevForm) => ({
            ...prevForm,
            locationFacilities: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.put(`${process.env.REACT_APP_ENDPOINT}/api/restaurent/${locationId}`, form);
            message.success("Restuarant Updated Succesfully")
            navigate("/admin/restaurants");
        } catch (error) {
            console.error(error);
            message.error("Restuarant Updated Failed")
        }
    };

    const selectStyle = {
        color: 'black',
        '& .Mui-selected': {
            color: 'white',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
            borderColor: "#00796b",
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fe9e0d",
                    borderWidth: "3px",
                },
            },
        },
        "& .MuiInputLabel-outlined": {
            color: "#fe9e0d",
            fontWeight: "bold",
            borderColor: "#00796b",
        },
    };

    const textboxStyle = {
        input: {
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

    const buttonStyle = {
        mt: '30px',
        mb: 2,
        color: 'white',
        background: '#00796b',
        ':hover': {
            bgcolor: ' white',
            color: '#00796b',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
                bgcolor: 'white',
                height: '100%'
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
                ) : (
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#00796b',
                                color: 'white',
                                borderRadius: '10px',
                                ':hover': {
                                    bgcolor: ' white',
                                    color: '#00796b',
                                },
                            }}
                            startIcon={<ArrowBackIosIcon />}
                            onClick={() => navigate("/admin/restaurants")}
                        >
                            Back
                        </Button>
                        <Container
                            component="main"
                            maxWidth="xs"
                        >
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{
                                    textAlign: 'center',
                                    mt: '30px',
                                    mb: '10px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    color: '#00796b'
                                }}
                            >
                                Edit Restaurant
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{
                                    mt: 1,
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    id="locationName"
                                    label="Locatoion Name"
                                    name="locationName"
                                    autoComplete="location-name"
                                    sx={textboxStyle}
                                    value={form.locationName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationAddress"
                                    label="Address"
                                    name="locationAddress"
                                    autoComplete="location-address"
                                    sx={textboxStyle}
                                    value={form.locationAddress}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationCity"
                                    label="City"
                                    name="locationCity"
                                    autoComplete="location-city"
                                    sx={textboxStyle}
                                    value={form.locationCity}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationDistrict"
                                    label="District"
                                    name="locationDistrict"
                                    autoComplete="location-district"
                                    sx={textboxStyle}
                                    value={form.locationDistrict}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="locationPhone"
                                    label="Phone"
                                    name="locationPhone"
                                    autoComplete="location-phone"
                                    sx={textboxStyle}
                                    value={form.locationPhone}
                                    onChange={handleChange}
                                />
                                <FormControl fullWidth margin="normal" required sx={textboxStyle}>
                                    <InputLabel id="selectFacilities">Facilities</InputLabel>
                                    <Select
                                        multiple
                                        required
                                        fullWidth
                                        labelId="selectFacilities"
                                        id="facility"
                                        label="Facilities"
                                        sx={selectStyle}
                                        name="locationFacilities"
                                        value={form.locationFacilities}
                                        onChange={handleFacilitiesChange}
                                        renderValue={(selected) => selected.map(facilityId => {
                                            console.log(facilityId);

                                            const facility = Facilities.find(f => f.facilityId === facilityId);
                                            return facility ? facility.facilityName : '';
                                        }).join(', ')}
                                    >
                                        {Facilities.map((facility, index) => (
                                            <MenuItem key={index} value={facility.facilityId}>{facility.facilityName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Update
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                )}
            </Box>

        </Grid2>
    );
}
