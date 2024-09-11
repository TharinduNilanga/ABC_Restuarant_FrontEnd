import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import { Box, Typography, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { styled } from '@mui/material/styles';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddGallery() {

    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        }
    }, [navigate]);

    const [form, setForm] = useState({
        imgName: "",
        imgPath: "",
        imgDescription: "",
        imgType: "",
        uploadedBy: "",
        uploadedDate: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await Axios.post(`${process.env.REACT_APP_ENDPOINT}/api/gallery/addgallery`, form);
            navigate("/admin/galley");
        } catch (error) {
            console.error(error);
            setError("An error occurred while adding the gallery. Please try again.");
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
        mt: 3,
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
                        onClick={() => navigate("/admin/gallery")}
                    >
                        Back
                    </Button>
                    <Container
                        component="main"
                        maxWidth="xs"
                        sx={{
                            mt: 5,
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                            }}
                        >
                            Add New Image
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
                                id="imgName"
                                label="Image Name"
                                name="imgName"
                                autoComplete="image-name"
                                sx={textboxStyle}
                                value={form.imgName}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="imgDescription"
                                label="Image Description"
                                name="imgDescription"
                                autoComplete="image-description"
                                sx={textboxStyle}
                                value={form.imgDescription}
                                onChange={handleChange}
                            />
                            <Button
                                // id=""
                                // name=""
                                // value={form.imgFile}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={fileUploadBtn}
                            >
                                Upload Image
                                <VisuallyHiddenInput type="file" accept="image/jpg, image/jpeg, image/png" />
                            </Button>
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
                            ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={buttonStyle}
                            >
                                Add
                            </Button>
                            )}
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Grid2>
    );
}
