import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BottomNav from "./BottomNav"

export default function BackToTop(props) {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        if (handleClose) handleClose();
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userRole');
        navigate('/login');
    };

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

    return (
        <React.Fragment>
            <AppBar
                sx={{
                    bgcolor: '#fe9e0d',
                    userSelect: 'none',
                    backgroundColor: '#00796b'
                }}
            >
                <Toolbar>
                    <BottomNav />
                    <img
                        src='/assets/logo.png'
                        alt='ABC Restaurent logo'
                        style={{
                            width: '95px',
                            marginLeft: '10px'
                        }}
                    // onClick={navigate('/user/dashboard')}
                    />

                    <Typography variant="h6" component="div" px={'20px'}>
                        Welcome to ABC Restuarent ... !
                    </Typography>
                    <Box
                        sx={{
                            marginLeft: 'auto',
                            display: 'flex',
                        }}
                    >
                        <React.Fragment>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <PersonIcon fontSize="large" sx={{ color: 'white', }} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {

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
                                        navigate('/user/cart');
                                    }}
                                    sx={MenuSectionStyle}
                                >
                                    <ListItemIcon>
                                        <ShoppingCartIcon fontSize="small" />
                                    </ListItemIcon>
                                    Cart
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    onClick={() => {
                                        if (handleClose) handleClose();
                                        navigate('/user/profile');
                                    }}
                                    sx={MenuSectionStyle}
                                >
                                    <ListItemIcon>
                                        <PersonIcon fontSize="small" />
                                    </ListItemIcon>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout} sx={MenuLogOutSectionStyle}>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
        </React.Fragment>
    );
}
