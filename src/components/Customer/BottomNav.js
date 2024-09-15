import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SendIcon from '@mui/icons-material/Send';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { Toolbar } from '@mui/material';
export default function DrawerNavigation() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

    const handleNavigate = (route) => {
        switch (route) {
            case 'menu':
                navigate('/user/menu');
                break;
            case 'offers':
                navigate('/user/offers');
                break;
            case 'chat':
                navigate('/user/chat');
                break;
            default:
                navigate('/user/dashboard');
                break;
        }
    };

    const menuItems = [
        { text: 'Menu', icon: <ListAltIcon />, route: 'menu' },
        { text: 'Offers and Promotions', icon: <LocalOfferIcon />, route: 'offers' },
        { text: 'Queries', icon: <SendIcon />, route: 'chat' }
    ];

    return (
        <Box >
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ bgcolor: 'white' }}
            >
                <MenuIcon sx={{ color: 'black' }} />

            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                sx={{

                    flexShrink: 0,
                    '& .MuiDrawer-paper': {

                        boxSizing: 'border-box',
                        bgcolor: '#00796b',
                        padding: '20px',
                    },
                }}
            >
                <Toolbar />
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem button key={item.text} onClick={() => handleNavigate(item.route)} sx={{
                                borderRadius: '8px',
                                color: 'white',
                                ':hover': {
                                    bgcolor: '#e0f2f1',
                                    color: '#00796b',
                                },
                            }}>
                                <ListItemIcon sx={{
                                    color: 'white',
                                    ':hover': {
                                        color: '#00796b',
                                    },
                                }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
