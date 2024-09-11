import './LandingPageStyles.css';

import { Typography } from '@mui/material';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import React from 'react';

function Footer() {
    return (
        <footer className="landingpageFooter">
            <div className='landingpageFooter-main'>
                <div className='landingpageFooter-logo'>
                    {/* <img src='/assets/logo.png' alt='logo' /> */}
                </div>
                <div className='landingpageFooter-socials'>

                </div>
            </div>
            <Typography className='landingpageFooter-copyrights'>
                © 2024 ABC Restaurent.
                <br />
                All rights reserved.
            </Typography>
            {/* <Typography className='landingpageFooter-credits'>
                    Designed & Developed by <a href='https://www.linkedin.com/in/madhusha-weerasiri' style={{ color: 'white', textDecoration:'underline'}}>Madhusha Weerasiri</a>
                </Typography> */}
        </footer>
    )
}

export default Footer;
