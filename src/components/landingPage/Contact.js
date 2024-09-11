import './LandingPageStyles.css';

import { Container, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { IoLocationSharp } from "react-icons/io5";
import React from 'react';

function Contact() {
    return (
        <Container id="contact">
            <div className="description">
                <h1  style={{'color':'white'}}>Contact Us</h1>
                <table width={'100%'}>
                    <tbody>
                        <tr>
                            <td rowSpan={2} width={'10%'}>
                                <IoLocationSharp className='contact-icon' style={{ color: '#fe9e0d', fontSize: '2rem' }} textAlign={'right'} />
                            </td>
                            <td rowSpan={2} width={'55%'}>
                                <Typography variant="h6" component="h2" className='contact-txt' textAlign={'left'}>
                                    ABC Restaurent,
                                    <br />
                                    1234 Main Street,
                                    <br />
                                    Colombo 0003.
                                </Typography>
                            </td>
                            <td width={'10%'}>
                                <PhoneIcon className='contact-icon' style={{ color: '#fe9e0d', fontSize: '1.2rem' }} textAlign={'right'} />
                            </td>
                            <td>
                                <Typography variant="h6" component="h2" className='contact-txt' textAlign={'left'}>+94111234567</Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <EmailIcon className='contact-icon' style={{ color: '#fe9e0d', fontSize: '1.4rem' }} textAlign={'right'} />
                            </td>
                            <td>
                                <Typography variant="h6" component="h2" className='contact-txt' textAlign={'left'} >contact@abc.com</Typography>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Container>
    )
}

export default Contact;