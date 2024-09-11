import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case '1':
                navigate('/user/menu');
                break;
            case '2':
                navigate('/user/offers');
                break;
            case '3':
                navigate('/user/chat');
                break;
            default:
                navigate('/user/dashboard');
                break;
        }
    };

    return (
        <Box sx={{ pb: 7, }}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#00796b' }} elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    showLabels
                    sx={{
                        bgcolor: '#00796b',
                        padding: '10px 0px'
                    }}
                >
                    <BottomNavigationAction
                        label="Menu"
                        value='1'
                        icon={<ListAltIcon fontSize="large" sx={{ color: 'black', '&.Mui-selected': { color: '#fe9e0d' } }} />}
                        sx={{ color: 'white' }}
                    />
                    <BottomNavigationAction
                        label="Offers and Promotions"
                        value='2'
                        icon={<LocalOfferIcon fontSize="large" />}
                        sx={{ color: 'white' }}
                    />
                    <BottomNavigationAction
                        label="Queries"
                        value='3'
                        icon={<SendIcon fontSize="large" />}
                        sx={{ color: 'white' }}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
