import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer';
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';
import {
    AccountCircle as AccountCircleIcon,
    ChatBubble as ChatBubbleIcon,
    Collections as CollectionsIcon,
    ConfirmationNumber as ConfirmationNumberIcon,
    Description as DescriptionIcon,
    Fastfood as FastfoodIcon,
    Group as GroupIcon,
    List as ListIcon,
    LocalOffer as LocalOfferIcon,
    Person as PersonIcon,
    Restaurant as RestaurantIcon,
    Storefront as StorefrontIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';

const drawerWidth = 260;

export default function ClippedDrawer() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        setAnchorEl(null);
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userRole');
        navigate('/login');
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItemStyle = {
        margin: '5px 10px',
        borderRadius: '8px',
        ':hover': {
            color: '#00796b',
            bgcolor: '#f1f1f1',
        },
        transition: 'all 0.3s ease',
    };

    const sectionStyle = {

        borderRadius: '8px',
        color: '#424242',
        ':hover': {
            bgcolor: '#e0f2f1',
            color: '#00796b',
        },
    };

    const drawerIconStyle = {
        color: '#00796b',
    };

    const appBarStyle = {
        backgroundColor: '#00796b',
        zIndex: (theme) => theme.zIndex.drawer + 1,
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* AppBar */}
            <AppBar position="fixed" sx={appBarStyle}>
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
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{ flexGrow: 1, cursor: 'pointer', px: '30px' }}
                        onClick={() => navigate('/admin/dashboard')}
                    >
                        ABC Restaurant Admin
                    </Typography>
                    {/* Account Menu */}
                    <Box>
                        <Tooltip title="Account">
                            <IconButton
                                onClick={handleMenuClick}
                                sx={{ color: '#fff' }}
                            >
                                <AccountCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                    mt: 1.5,
                                    bgcolor: '#e0f7fa',
                                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                },
                            }}
                            transformOrigin={{
                                horizontal: 'right',
                                vertical: 'top',
                            }}
                            anchorOrigin={{
                                horizontal: 'right',
                                vertical: 'bottom',
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    navigate('/admin/profile');
                                }}
                                sx={menuItemStyle}
                            >
                                <PersonIcon sx={{ mr: 1 }} />
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout} sx={{ ...menuItemStyle, ':hover': { color: '#d32f2f' } }}>
                                <LogoutIcon sx={{ mr: 1 }} />
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: '#f5f5f5',
                        padding: '20px',
                    },
                }}
            >
                <Toolbar />
                {/* <Box
                    sx={{
                        overflow: 'auto',
                        bgcolor: 'white',
                        color: 'white',
                        fontWeight: 'bold',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                > */}


                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItemButton
                                onClick={() => navigate('/admin/restaurants')}
                                sx={sectionStyle}
                            >
                                <ListItemIcon>
                                    <StorefrontIcon
                                        sx={drawerIconStyle}
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
                                        sx={drawerIconStyle}
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
                                        sx={drawerIconStyle}
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
                                        sx={drawerIconStyle}
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
                                            sx={drawerIconStyle}
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
                                            sx={drawerIconStyle}
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
                                            sx={drawerIconStyle}
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
                                            sx={drawerIconStyle}
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
                                            sx={drawerIconStyle}
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
                                            sx={drawerIconStyle}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={"Gallery"} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider />
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
                {/* </Box> */}
            </Drawer>

            {/* <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'black',
                    p: 3,
                    pt: 10, // Adjust this value to move the content down
                    minHeight: '100vh',
                }}
            > */}
            <Toolbar sx={{ minHeight: '40px' }} /> {/* Reduce Toolbar height if needed */}
            {/* Main content goes here */}
            {/* </Box> */}

        </Box>
    );
}
