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

export default function Users() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            loadUsers();
        }
    }, []);

    const loadUsers = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/allUsers`);
            setUsers(result.data);
        } catch (error) {
            console.error("Error loading users:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await Axios.delete(`${process.env.REACT_APP_ENDPOINT}/api/user/${id}`);
            if (response) {
                console.log('User deleted successfully');
                message.success("User Deleted Successfully")
                loadUsers();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            message.success("User Deleted Failed")
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
                >
                    <Typography fontSize="20px" sx={{ color: 'black', fontWeight: 'bold' }}>User Form</Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/admin/addUsers')}
                        sx={{
                            backgroundColor: '#00796b',
                            color: 'white',
                            ':hover': {
                                bgcolor: 'white',
                                color: '#00796b',
                            },
                        }}
                    >
                        Add new user
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
                ) : users.length > 0 ? (
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
                                                User ID
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                First Name
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                Last Name
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
                                                Email
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    backgroundColor: '#cccccc',
                                                }}
                                            >
                                                Role
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
                                        {users.map((user) => (
                                            <TableRow key={user.userId}>
                                                <TableCell align="center" component="th" scope="row">{user.userId}</TableCell>
                                                <TableCell align="center">{user.firstName}</TableCell>
                                                <TableCell align="center">{user.lastName}</TableCell>
                                                <TableCell align="center">{user.address}</TableCell>
                                                <TableCell align="center">{user.email}</TableCell>
                                                <TableCell align="center">
                                                    {user.role === 1 ? 'Admin' : user.role === 2 ? 'Staff' : 'Customer'}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        onClick={() => navigate('/admin/editUsers', { state: { userId: user.userId } })}
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
                                                        onClick={() => deleteUser(user.userId)}
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
                                Total Users: {users.length}
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
                        No Facility Available.
                    </Typography>
                )}
            </Box>
        </Grid2>
    );
}
