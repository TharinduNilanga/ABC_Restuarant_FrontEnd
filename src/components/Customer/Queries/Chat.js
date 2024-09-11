import React, { useEffect, useState } from "react";
import AppBar from "../AppBar";
import BottomNav from "../BottomNav"
import Bubble from "./Bubble";
import { Box, TextField, CircularProgress, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import axios from "axios";

export default function Chat() {

    let userId = "";
    let navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        const userRole = sessionStorage.getItem('userRole');
        if (!userId || userRole !== '3') {
            navigate('/login');
        }
    }, [navigate]);

    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newQuery, setNewQuery] = useState({
        queryCustomer: userId,
        queryStaff: "",
        queryText: "",
        queryTime: dayjs(),
    });

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    await loadChat();
                } catch (err) {
                    setError("Failed to load chat.");
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, []);

    const loadChat = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}/api/query/allQueries`);
            const queries = response.data.filter(query => query.queryCustomer === userId);
            setQueries(queries);
        } catch (error) {
            console.error("There was an error fetching the queries!", error);
            throw error;
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setNewQuery((prevNewQuery) => ({
            ...prevNewQuery,
            queryText: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(newQuery)
            await axios.post(`${process.env.REACT_APP_ENDPOINT}/api/query/addQuery`, newQuery);
            loadChat();
            setNewQuery({ ...newQuery, queryText: "" });
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <AppBar sx={{ display: 'fixed' }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '80vh',
                    mt: '20px',
                    width: '80%',
                    margin: 'auto',
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
            <Typography sx={{ fontSize: '10px', color: 'red', textAlign: 'center'}}>* Please note that this is not a live chat. *</Typography>
            <BottomNav />
        </Box>
    );
}
