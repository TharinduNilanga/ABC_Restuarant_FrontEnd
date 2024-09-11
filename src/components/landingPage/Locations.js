import './LandingPageStyles.css';

import { Container, Typography } from "@mui/material";
import React from "react";

function Location() {
    return (
        <Container id="location">
            <div className="description">
                <h1  style={{'color':'white'}}>Our Locations</h1>
                <Typography>
                    With a commitment to bringing our delicious offerings closer to you, ABC Restaurant proudly operates in eleven vibrant locations across the country. Whether you're in the bustling city or the serene hills, you can find us in:
                </Typography>
                <ul>
                    <li>
                        <b>Kollupitiya</b>: A perfect spot in the heart of Colombo, offering a cozy ambiance for a relaxing meal.
                    </li>
                    <li>
                        <b>Bambalapitiya</b>: Located in one of Colombo's most dynamic areas, catering to both locals and tourists.
                    </li>
                    <li>
                        <b>Kottawa</b>: Serving delightful dishes in a family-friendly environment.
                    </li>
                    <li>
                        <b>Maharagama</b>: A haven for food enthusiasts looking to enjoy a variety of flavors.
                    </li>
                    <li>
                        <b>Kadawatha</b>: Bringing our signature tastes to this bustling suburban area.
                    </li>
                    <li>
                        <b>Kandy</b>: Nestled in the cultural capital, offering a unique dining experience amidst the historic charm.
                    </li>
                    <li>
                        <b>Kalutara</b>: Perfect for those who love to dine by the sea, enjoying fresh and flavorful meals.
                    </li>
                    <li>
                        <b>Galle</b>: Located in the scenic coastal city, offering a blend of tradition and modernity in every dish.
                    </li>
                    <li>
                        <b>Matara</b>: Serving up delightful culinary creations in this southern gem.
                    </li>
                    <li>
                        <b>Nuwara Eliya</b>: A tranquil retreat in the hill country, perfect for a cozy meal in a picturesque setting.
                    </li>
                    <li>
                        <b>Badulla</b>: Bringing warmth and flavor to this charming town.
                    </li>
                    <li>
                        <b>Ella</b>: Offering a unique dining experience in one of the most picturesque and popular destinations in Sri Lanka.
                    </li>
                </ul>
            </div>
            {/* <img src="/assets/locations.png" alt="collage of locations" /> */}
        </Container>

    )
}

export default Location;