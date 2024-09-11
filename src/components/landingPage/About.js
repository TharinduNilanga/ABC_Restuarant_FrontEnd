import './LandingPageStyles.css';

import { Container, Typography } from "@mui/material";
import React from "react";

function About() {
    return (
        <Container id="about">
            <div className="description">
                <h1 style={{'color':'white'}}>About Us</h1>
                <Typography>
                    Welcome to ABC Restaurant, where we have been serving delightful culinary experiences since 2005. Our journey began with a passion for great food and exceptional service, and over the years, we have grown to become a cherished dining destination for food lovers across Sri Lanka.
                </Typography>
            </div>
            {/* <img src="/assets/collage.png" alt="collage of foods" /> */}
        </Container>
    )
}

export default About;