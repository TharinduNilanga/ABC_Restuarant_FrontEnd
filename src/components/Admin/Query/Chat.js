import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import Bubble from "./Bubble";
import { Box, TextField, CircularProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import dayjs from 'dayjs';
import axios from "axios";

export default function Chat() {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newQuery, setNewQuery] = useState({
        queryCustomer: "",
        queryStaff: "",
        queryText: "",
        queryTime: dayjs(),
    });

    const navigate = useNavigate();
    const location = useLocation();
    const { customerId } = location.state;

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');

        if (!userId || userRole !== '1') {
            navigate('/login');
        } else {
            setNewQuery((prevNewQuery) => ({
                ...prevNewQuery,
                queryCustomer: customerId,
                queryStaff: userId,
            }));
            const fetchData = async () => {
                try {
                    await loadChat(customerId);
                } catch (err) {
                    setError("Failed to load chat.");
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [customerId, navigate]);

    const loadChat = async (customerId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/query/allQueries`);
            const customerQueries = response.data.filter(query => query.queryCustomer === customerId);
            setQueries(customerQueries);
        } catch (error) {
            console.error("There was an error fetching the queries!", error);
            throw error;
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setNewQuery((prevNewQuery) => ({
            ...prevNewQuery,
            queryText: value,
            queryTime: dayjs(), // Update the time whenever the user types a new message
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(newQuery);
            await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/query/addQuery`, newQuery);
            loadChat(customerId);
            setNewQuery((prevNewQuery) => ({ ...prevNewQuery, queryText: "" }));
        } catch (error) {
            console.error(error);
        }
    };

    const textboxStyle = {
        input: {
            color: 'white'
        },
        backgroundColor: '#4e4f4f',
        border: '2px solid #fe9e0d',
        borderRadius: '5px',
        marginRight: '3px',
    };

    const buttonStyle = {
        backgroundColor: '#cb7a01',
        color: '#ffffff',
        height: '58px',
        borderRadius: '5px',
        mt: '8px',
        marginLeft: '3px',
        border: '2px solid #fe9e0d',
        alignContent: 'center',
        ':hover': {
            bgcolor: ' #fe9e0d',
        },
    };

    return (
        <Grid2
            sx={{
                minWidth: '800px'
            }}
        >
            <Menu />
            <Box
                component="main"
                sx={{
                    padding: '30px 40px',
                    marginLeft: '240px',
                    height: '92vh'
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
                    onClick={() => navigate("/admin/queries")}
                >
                    Back
                </Button>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '80vh',
                        mt: '20px',
                    }}
                >
                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
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
                        <>
                            <Box
                                overflow={'auto'}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    border: '1px solid rgba(254, 158, 13, .6)',
                                    borderRadius: '10px',
                                    boxShadow: '0 0 5px #fe9e0d',
                                    padding: '10px',
                                }}
                            >
                                {queries.map((query) => (
                                    <Bubble key={query.queryId} item={query} />
                                ))}
                            </Box>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    display: 'flex',
                                    margin: 'auto auto 0px',
                                    width: '60%',
                                    height: '100px',
                                    alignItems: 'center'
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="query"
                                    name="queryText"
                                    placeholder="Type here..."
                                    onChange={handleChange}
                                    value={newQuery.queryText}
                                    sx={textboxStyle}
                                />
                                <Stack>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={buttonStyle}
                                        disabled={!newQuery.queryText.trim()}
                                    >
                                        <SendIcon fontSize='large' />
                                    </Button>
                                </Stack>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </Grid2>
    );
}
