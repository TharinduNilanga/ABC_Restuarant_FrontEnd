import * as React from 'react';
import { useNavigate } from "react-router-dom";

import Footer from '../Footer/Footer';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CollectionsIcon from '@mui/icons-material/Collections';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DescriptionIcon from '@mui/icons-material/Description';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import GroupIcon from '@mui/icons-material/Group';
import ListIcon from '@mui/icons-material/List';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person2';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

const drawerWidth = 240;

export default function ClippedDrawer() {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (handleClose) handleClose();
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userRole');
        navigate('/login');
    };

    const sectionStyle = {
        border: '2px solid #fe9901',
        borderRadius: '10px',
        ':hover': {
            border: '2px solid rgba(255, 255, 255, .6)',
            boxShadow: 'inset 0 0 15px rgba(255,255,255,1)'
        }
    };

    // const logOutSectionStyle = {
    //     border: '2px solid #fe9901',
    //     borderRadius: '10px',
    //     ':hover': {
    //         bgcolor: '#b26b01',
    //         border: '2px solidrgba(255, 77, 77, .6)',
    //         boxShadow: 'inset 0 0 15px #ff4d4d'
    //     }
    // };

    const MenuSectionStyle = {
        margin: '0px 8px',
        borderRadius: '10px',
        ':hover': {
            color: '#fe9901',
            bgcolor: 'white',
            border: '1px solidrgba(254, 173, 52, .4)',
            boxShadow: 'inset 0 0 15px rgba(254, 173, 52, 1)'
        }
    };

    const MenuLogOutSectionStyle = {
        margin: '0px 8px',
        borderRadius: '10px',
        ':hover': {
            bgcolor: 'red',
            color: 'white',

        }
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{
            display: 'flex',
        }}
        >
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: '#fe9e0d'
                }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            width: '95px',
                            cursor: 'pointer'
                        }}
                    >
                        <img
                            src='/assets/logo.png'
                            alt='ABC Restaurent logo'
                            onClick={() => navigate('/admin/dashboard')}
                        />
                    </Box>
                    <Typography variant="h5" fontWeight={'bold'} noWrap component="div" sx={{ px: '30px' }}>
                        Admin - ABC Restaurent Management System
                    </Typography>
                    <Box
                        sx={{
                            ml: 'auto'
                        }}
                    >
                        <React.Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account" sx={{ color: '#fead34', }}>
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <AccountCircleIcon sx={{ width: 32, height: 32, color: '#ffffff' }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        bgcolor: '#fead34',
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        if (handleClose) handleClose();
                                        navigate('/admin/profile');
                                    }}
                                    sx={MenuSectionStyle}
                                >
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout} sx={MenuLogOutSectionStyle}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                bgcolor='#fe9e0d'
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { 
                        width: drawerWidth,
                         boxSizing: 'border-box' ,bgcolor: '#f5f5f5',
                         padding: '20px',},
                }}
            >
                <Toolbar />
                <Box
                    sx={{
                        overflow: 'auto',
                        bgcolor: '#fe9901',
                        color: 'white',
                        fontWeight: 'bold',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <Box>
                        <List>
                            <ListItemButton
                                onClick={() => navigate('/admin/restaurants')}
                                sx={sectionStyle}
                            >
                                <ListItemIcon>
                                    <StorefrontIcon
                                        style={{
                                            color: 'white'
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Restaurents" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => navigate('/admin/users')}
                                sx={sectionStyle}
                            >
                                <ListItemIcon>
                                    <GroupIcon
                                        style={{
                                            color: 'white'
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => navigate('/admin/productCategory')}
                                sx={sectionStyle}
                            >
                                <ListItemIcon>
                                    <ListIcon
                                        style={{
                                            color: 'white'
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Product Category" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => navigate('/admin/products')}
                                sx={sectionStyle}
                            >
                                <ListItemIcon>
                                    <FastfoodIcon
                                        style={{
                                            color: 'white'
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Products" />
                            </ListItemButton>
                            <ListItem key={'offers'} disablePadding
                                onClick={() => navigate('/admin/offers')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LocalOfferIcon
                                            style={{
                                                color: 'white'
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Offers"} />
                                </ListItemButton>
                            </ListItem>



                            <ListItem key={'services'} disablePadding
                                onClick={() => navigate('/admin/facilities')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <RestaurantIcon
                                            style={{
                                                color: 'white'
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Facilities"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key={'reservations'} disablePadding
                                onClick={() => navigate('/admin/reservations')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ConfirmationNumberIcon
                                            style={{
                                                color: 'white'
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Reservations"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key={'queries'} disablePadding
                                onClick={() => navigate('/admin/queries')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ChatBubbleIcon
                                            style={{
                                                color: 'white'
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Queries"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key={'reports'} disablePadding
                                // onClick={() => navigate('/admin/offers')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DescriptionIcon
                                            style={{
                                                color: 'white'
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Reports"} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key={'gallery'} disablePadding
                                onClick={() => navigate('/admin/gallery')}
                                sx={sectionStyle}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CollectionsIcon
                                            style={{
                                                color: 'white'
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Gallery"} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    <Box
                        sx={{
                            mt: 'auto'
                        }}>
                        
                        <Divider
                            sx={{
                                width: '100%',
                                justifyContent: 'space-around',
                            }}
                        />
                        <Footer
                            sx={{
                                mt: '-30px',
                            }}
                        />
                    </Box>
                </Box>
            </Drawer >
            <Toolbar />
        </Box >
    );
}
