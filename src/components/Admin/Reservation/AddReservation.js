import React, { useState, useEffect } from "react";
import Menu from "../Menu";
import { Box, FormControl, Typography } from "@mui/material";
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
import { styled } from '@mui/material/styles'
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

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const result = await Axios.get(`http://localhost:8080/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading user data:", error);
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
        try {
            const response = await Axios.post(`http://localhost:8080/api/offer/addOffer`, form);
            navigate("/admin/offers");
        } catch (error) {
            console.error(error);
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

    const buttonStyle = {
        mt: '30px',
        mb: 2,
        color: 'white',
        background: '#fe9e0d',
        ':hover': {
            bgcolor: ' #cb7a01',
            color: 'white',
        },
    };

    const fileUploadBtn = {
        width: '100%',
        height: '50px',
        mt: 1.5,
        mb: 1,
        color: 'white',
        background: '#262626',
        border: '2px solid #fe9e0d',
        ':hover': {
            bgcolor: '#262626',
            color: '#fe9e0d',
            border: '2px solid #181818',
        },
    };

    const datePicker = {
        width: '100%',
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
                }}
            >
                <Box>
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
                                autoComplete="offer-description"
                                sx={textboxStyle}
                                value={form.offerDescription}
                                onChange={handleChange}
                            />
                            <Button
                                id="offerImage"
                                name="offerImage"
                                value={form.offerImage}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={fileUploadBtn}
                            >
                                Upload Image
                                <VisuallyHiddenInput type="file" accept="image/jpg, image/jpeg, image/png" style={{ display: 'none' }} />
                            </Button>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="offerPrice"
                                label="Offer Price"
                                name="offerPrice"
                                autoComplete="offer-price"
                                sx={textboxStyle}
                                value={form.offerPrice}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="offerDiscount"
                                label="Offer Discount"
                                name="offerDiscount"
                                autoComplete="offer-discount"
                                sx={textboxStyle}
                                value={form.offerDiscount}
                                onChange={handleChange}
                            />
                            <FormControl>
                                <FormLabel id="offerStatus" sx={{ color: 'white', mt: 2 }}>Status</FormLabel>
                                <RadioGroup
                                    row
                                    required
                                    aria-labelledby="offerStatus"
                                    name="offerStatus"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Available" control={<Radio />} label="Available" />
                                    <FormControlLabel value="Unavailable" control={<Radio />} label="Unavailable" />

                                </RadioGroup>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']} sx={{mt: 1.5, mb: 1,}}>
                                    <DatePicker
                                        id="offerStartDate"
                                        name="offerStartDate"
                                        value={form.offerStartDate}
                                        label="Start Date"
                                        onChange={(newValue) => handleDateChange("offerStartDate", newValue)}
                                        sx={datePicker}
                                    />
                                </DemoContainer>
                                <DemoContainer components={['DatePicker']} sx={{mt: 1.8, mb: 1,}}>
                                    <DatePicker
                                        id="offerEndDate"
                                        name="offerEndDate"
                                        value={form.offerEndDate}
                                        label="End Date"
                                        onChange={(newValue) => handleDateChange("offerEndDate", newValue)}
                                        sx={datePicker}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <FormControl fullWidth margin="normal" required sx={textboxStyle}>
                                <InputLabel id="selectCategory">Categories</InputLabel>
                                <Select
                                    multiple
                                    fullWidth
                                    labelId="selectCategory"
                                    id="offerCategory"
                                    label="Categories"
                                    sx={selectStyle}
                                    name="offerCategory"
                                    value={form.offerCategory}
                                    onChange={handleCategoryChange}
                                    renderValue={(selected) => selected.map(categoryId => {
                                        const category = categories.find(f => f.categoryId === categoryId);
                                        return category ? category.categoryName : '';
                                    }).join(', ')}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.categoryId} value={category.categoryId}>{category.categoryName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={buttonStyle}
                            >
                                Add
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Grid2>
    );
}
