import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Axios from 'axios';

export default function QueryButton(props) {
    const navigate = useNavigate();
    const [userName, setUserName] = React.useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/api/user/${props.query.queryCustomer}`);
                setUserName(`${result.data.firstName} ${result.data.lastName}`);
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };
        fetchUserName();
    }, [props.query.queryCustomer]);

    const handleClick = () => {
        const customerId = props.query.queryCustomer;
        navigate("/staff/chat", { state: { customerId } });
    };

    const queryTime = props.query.queryTime;
    const date = queryTime ? queryTime.split('T')[0] : 'N/A';
    const time = queryTime ? queryTime.split('T')[1].split('Z')[0].slice(0, 5) : 'N/A';

    return (
        <Box
            onClick={handleClick}
            sx={{
                mb: '8px',
                backgroundColor: '#FFFFFF',
                width: '100%',
                borderRadius: '50px',
                padding: '15px',
                color: '#000000',
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
                ':hover': {
                    backgroundColor: '#FFFFFF',
                    border: '2px solid rgba(254, 158, 13, .6)',
                    boxShadow: '0 0 10px #fe9e0d, inset 0 0 10px #fe9e0d',
                    '& .hoverText': {
                        fontWeight: 'bold',
                    },
                }
            }}
        >
            <Box sx={{ marginLeft: '20px', marginTop: 'auto', marginBottom: 'auto' }}>
                <Typography className="hoverText">
                    {userName || "Loading..."}
                </Typography>
            </Box>
            <Box sx={{ marginRight: '20px', textAlign: 'right'}}>
                <Typography className="hoverText" fontSize={12}>
                    {date}
                </Typography>
                <Typography className="hoverText" fontSize={12}>
                    {time}
                </Typography>
            </Box>
        </Box>
    );
}
