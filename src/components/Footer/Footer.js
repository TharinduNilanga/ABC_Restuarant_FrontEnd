import { useNavigate } from 'react-router-dom';

import { Typography, Link, Container } from '@mui/material';
import React from 'react';

function Footer(props) {
    const navigate = useNavigate();
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: '20px 0px',
                textAlign: 'center',
                // mt: '30px',
                userSelect: 'none',
            }}
        >
            <Typography
                className='footer-copyrights'
                sx={{
                    fontSize: '14px',
                    mt: '10px',
                }}
            >
                {'© '}
                {new Date().getFullYear()}
                {' '}
                <Link color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }} >
                    ABC Restaurent
                </Link>
                {'.'}
            </Typography>
            <Typography
                sx={{
                    mt: '0px',
                    fontSize: '14px',
                }}
            >
                {'All rights reserved.'}
            </Typography>
            <Typography
                className='footer-credits'
                sx={{
                    fontSize: '12px',
                    pt: '10px',
                }}
            >
                Designed & Developed by  Tharindu Nilanga
            </Typography>
        </Container>
    )
}

export default Footer;
