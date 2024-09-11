import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';



const logoStyle = {
    width: '100px',
    height: 'auto',
    cursor: 'pointer',
};

function AppAppBar() {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                    width: '100vw', // Ensure the AppBar takes the full width
                }}
            >
                {/* No Container to allow full-width alignment */}
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end', // Align buttons to the right
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 0.5,
                            alignItems: 'flex-end',
                        }}
                    >
                        <Button
                            color="primary"
                            variant="text"
                            size="small"
                            component="a"
                            onClick={() => navigate('/login')}
                            target="_blank"
                            style={{ color: 'white', background: '#00796b'  }}
                        >
                            LOG IN
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            component="a"
                            onClick={() => navigate('/register')}
                            target="_blank"
                            style={{ color: 'black', background: 'white' }}
                        >
                            REGISTER
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>

    );
}

export default AppAppBar;