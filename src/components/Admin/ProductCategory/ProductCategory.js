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

export default function ProductCategory() {
    const navigate = useNavigate();

    const [Categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
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
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/allProductCategories`);
            setCategories(result.data);
        } catch (error) {
            console.error("Error loading categories:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/productCategory/${id}`);
            if (response) {
                message.success('Category deleted successfully')
                console.log('Category deleted successfully');
                loadCategories();
            }
        } catch (error) {
            message.error('Category deleted Failed')
            console.error('Error deleting category:', error);
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
                    bgcolor: 'white',
                    color: 'black',
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
                >
                    <Typography fontSize="20px" sx={{ color: 'black', fontWeight: 'bold' }}>Product Category Form</Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/addProductCategory')}
                        sx={{
                            backgroundColor: '#00796b',
                            color: 'white',
                            ':hover': {
                                bgcolor: '#004d40',
                            },
                        }}
                    >
                        Add new product category
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
                                color: '#00796b',
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
                        {error.message}
                    </Typography>
                ) : Categories.length > 0 ? (
                    <>
                        <Box>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 600 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {/* <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#f5f5f5',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Category ID
                                                </TableCell> */}
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#f5f5f5',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Category Name
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#f5f5f5',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Category Description
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#f5f5f5',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Category Image
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    sx={{
                                                        backgroundColor: '#f5f5f5',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Action
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Categories.map((category) => (
                                                <TableRow key={category.id}>
                                                    {/* <TableCell align="center" component="th" scope="row">{category.categoryId}</TableCell> */}
                                                    <TableCell align="center">{category.categoryName}</TableCell>
                                                    <TableCell align="center">{category.categoryDescription}</TableCell>

                                                    <TableCell align="center">
                                                        {category.categoryImage && (
                                                            <img
                                                                src={`data:image/jpeg;base64,${category.categoryImage}`}
                                                                alt="Category"
                                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                            />
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            onClick={() => navigate('/admin/editProductCategory', { state: { id: category.id } })}
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
                                                            onClick={() => deleteCategory(category.id)}
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
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    mt: '20px'
                                }}
                            >
                                Total Product Categories: {Categories.length}
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Typography
                        variant="h5"
                        sx={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            margin: 'auto'
                        }}
                    >
                        No Product Category Available.
                    </Typography>
                )}
            </Box>
        </Grid2>
    );
}
