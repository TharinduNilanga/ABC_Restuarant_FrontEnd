import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AllReservations from "./AllReservations";
import NotConfirmed from "./NotConfirmed";
import Confirmed from "./Confirmed";

export default function Tabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        sx={{
                            display: 'flex',
                            gap: '80px',
                        }}
                    >
                        <Tab
                            label="All"
                            value="1"
                            sx={{
                                color: value === '1' ? '#00796b' : '#00796b',
                                '&.Mui-selected': {
                                    color: '#00796b',
                                },
                                '&:hover': {
                                    color: '#00796b',
                                }
                            }}
                        />
                        <Tab
                            label="Not Finished"
                            value="2"
                            sx={{
                                color: value === '2' ? '#00796b' : '#00796b',
                                '&.Mui-selected': {
                                    color: '#00796b',
                                },
                                '&:hover': {
                                    color: '#00796b',
                                }
                            }}
                        />
                        <Tab
                            label="Finished"
                            value="3"
                            sx={{
                                color: value === '3' ? '#00796b' : '#00796b',
                                '&.Mui-selected': {
                                    color: '#00796b',
                                },
                                '&:hover': {
                                    color: '#00796b',
                                }
                            }}
                        />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <AllReservations />
                </TabPanel>
                <TabPanel value="2">
                    <NotConfirmed />
                </TabPanel>
                <TabPanel value="3">
                    <Confirmed />
                </TabPanel>
            </TabContext>
        </Box>
    );
}