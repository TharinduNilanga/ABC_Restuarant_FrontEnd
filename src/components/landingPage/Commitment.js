import './LandingPageStyles.css';
import { Container, Typography } from "@mui/material";
import React from "react";

function Commitment() {
    return (
        <Container id="commitment">
            <div className="description">
                <h1  style={{'color':'white'}}>Our Commitment</h1>
                <Typography>
                    At ABC Restaurant, we believe in the power of good food to bring people together. Our menu is crafted with care, using the finest ingredients to ensure every dish is a celebration of flavors. From traditional Sri Lankan cuisine to international favorites, our diverse offerings cater to every palate.
                </Typography>
                <Typography>
                    Join us at any of our locations for an unforgettable dining experience. Whether you're enjoying a family dinner, a romantic date, or a meal with friends, ABC Restaurant is the perfect place to create lasting memories. Thank you for being a part of our journey, and we look forward to serving you soon.
                </Typography>
            </div>
        </Container>
    )
}

export default Commitment;