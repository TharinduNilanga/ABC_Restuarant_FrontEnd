import React, { useState, useEffect } from "react";
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddOffer() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        offerId: "",
        offerName: "",
        offerDescription: "",
        offerImage: "",
        offerPrice: "",
        offerDiscount: "",
        offerStatus: "",
        offerStartDate: dayjs(),
        offerEndDate: dayjs(),
        offerCategory: [],
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadCategories();
        }
    }, [navigate]);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
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

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            offerCategory: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleDateChange = (name, value) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/offer/addOffer`, form);
            navigate("/admin/offers");
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const selectStyle = {
        color: '#00796b',
        '& .Mui-selected': {
            color: '#00796b',
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
            color: "#00796b",
            fontWeight: "bold",
            borderColor: "#00796b",
        },
    };

    const textboxStyle = {
        input: {
            color: '#00796b',
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
            color: "#00796b",
            fontWeight: "bold",
            borderColor: "#00796b",
        },
    };

    const buttonStyle = {
        mt: '30px',
        mb: 2,
        color: 'white',
        background: '#00796b',
        borderColor: '#00796b',
        borderWidth: '2px',
        ':hover': {
            bgcolor: '#e0f2f1',
            color: '#00796b',
        },
    };

    const fileUploadBtn = {
        width: '100%',
        height: '50px',
        mt: 1.5,
        mb: 1,
        color: '#00796b',
        background: 'white',
        border: '2px solid #00796b',
        ':hover': {
            bgcolor: '#e0f2f1',
            color: '#00796b',
            border: '2px solid #004d40',
        },
    };

    const datePicker = {
        width: '100%',
        mt: '1.5',
        mb: 1,
        '& .MuiInputBase-input': {
            color: '#00796b',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: "2px",
            borderColor: "#00796b",
        },
        '& .MuiInputLabel-root': {
            color: "#00796b",
            fontWeight: "bold",
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "#00796b",
            borderWidth: "3px",
        },
        '& .MuiSvgIcon-root': {
            color: '#00796b',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px',
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                    backgroundColor: 'white',
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
                                color: '#00796b',
                            }}
                        />
                    </Box>
                ) : (
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'white',
                                color: '#00796b',
                                borderRadius: '10px',
                                borderColor: '#00796b',
                                borderWidth: '2px',
                                ':hover': {
                                    bgcolor: '#e0f2f1',
                                    color: '#00796b',
                                },
                            }}
                            startIcon={<ArrowBackIosIcon />}
                            onClick={() => navigate("/admin/offers")}
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
                                    mt: '10px',
                                    mb: '10px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    color: '#00796b',
                                }}
                            >
                                Add Offer
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
                                    id="offerId"
                                    label="Offer Id"
                                    name="offerId"
                                    autoComplete="offer-id"
                                    sx={textboxStyle}
                                    value={form.offerId}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="offerName"
                                    label="Offer Name"
                                    name="offerName"
                                    autoComplete="Offer-name"
                                    sx={textboxStyle}
                                    value={form.offerName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="offerDescription"
                                    label="Description"
                                    name="offerDescription"
                                    autoComplete="Offer-description"
                                    multiline
                                    rows={4}
                                    sx={textboxStyle}
                                    value={form.offerDescription}
                                    onChange={handleChange}
                                />
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={fileUploadBtn}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Image
                                    <VisuallyHiddenInput
                                        type="file"
                                        name="offerImage"
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            setForm((prevForm) => ({
                                                ...prevForm,
                                                offerImage: file,
                                            }));
                                        }}
                                    />
                                </Button>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="offerPrice"
                                    label="Offer Price"
                                    id="offerPrice"
                                    autoComplete="offer-price"
                                    sx={textboxStyle}
                                    value={form.offerPrice}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="offerDiscount"
                                    label="Discount"
                                    id="offerDiscount"
                                    autoComplete="offer-discount"
                                    sx={textboxStyle}
                                    value={form.offerDiscount}
                                    onChange={handleChange}
                                />
                                <FormControl
                                    component="fieldset"
                                    sx={{
                                        marginTop: 2,
                                    }}
                                >
                                    <FormLabel
                                        component="legend"
                                        sx={{
                                            color: '#00796b',
                                            '&.Mui-focused': {
                                                color: '#00796b',
                                            },
                                        }}
                                    >
                                        Status
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="offerStatus"
                                        value={form.offerStatus}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="Available"
                                            control={<Radio sx={{
                                                color: '#00796b',
                                                '&.Mui-checked': {
                                                    color: '#004d40',
                                                },
                                            }} />}
                                            label="Available"
                                            sx={{
                                                color: '#00796b',
                                            }}
                                        />
                                        <FormControlLabel
                                            value="Unavailable"
                                            control={<Radio sx={{
                                                color: '#00796b',
                                                '&.Mui-checked': {
                                                    color: '#004d40',
                                                },
                                            }} />}
                                            label="Unavailable"
                                            sx={{
                                                color: '#00796b',
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DemoContainer
                                        components={['DatePicker']}
                                    >
                                        <DatePicker
                                            label="Start Date"
                                            value={form.offerStartDate}
                                            onChange={(newValue) => handleDateChange("offerStartDate", newValue)}
                                            sx={datePicker}
                                        />
                                    </DemoContainer>
                                    <DemoContainer
                                        components={['DatePicker']}
                                    >
                                        <DatePicker
                                            label="End Date"
                                            value={form.offerEndDate}
                                            onChange={(newValue) => handleDateChange("offerEndDate", newValue)}
                                            sx={datePicker}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormControl
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                    }}
                                >
                                    <InputLabel
                                        id="category-label"
                                        sx={{
                                            color: '#00796b',
                                        }}
                                    >
                                        Categories
                                    </InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="offerCategory"
                                        name="offerCategory"
                                        multiple
                                        value={form.offerCategory}
                                        onChange={handleCategoryChange}
                                        sx={selectStyle}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={buttonStyle}
                                >
                                    Add Offer
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                )}
            </Box>
        </Grid2>
    );
}
