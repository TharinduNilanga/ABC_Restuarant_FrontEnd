import './LandingPageStyles.css';

import { Container, Typography } from '@mui/material';
import React from 'react';

function Facilities() {
    return (
        <Container id='facilities'>
            <div className="description">
                <h1  style={{'color':'white'}}>Our Facilities</h1>
                <div className='serviseImg'>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img src='/assets/dine-in.png' alt='dine-in'/>
                                    <h3><u>Dine-In Experience</u></h3>
                                    <Typography>
                                        we pride ourselves on offering a memorable dine-in experience. Our warm and welcoming ambiance, coupled with attentive service, ensures that every visit is special. Whether you're celebrating a milestone or enjoying a casual meal with loved ones, our comfortable and stylish interiors provide the perfect setting.
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <br/>
                                    <br/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src='/assets/delivery.png' alt='delivery' />
                                    <h3><u>Takeaway & Delivery</u></h3>
                                    <Typography>
                                        Enjoy the delicious flavors of ABC Restaurant from the comfort of your home. Our convenient takeaway and delivery services bring your favorite dishes right to your doorstep. With a few clicks, you can order from our extensive menu and savor the same quality and taste that you love.
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <img src="/assets/services.png" alt="photo collage of dining area" /> */}
        </Container>
    )
}

export default Facilities;