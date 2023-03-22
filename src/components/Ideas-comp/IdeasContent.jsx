import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MyIdeas from './MyIdeas';
import AllIdeas from './AllIdeas';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../app/firebase"

function IdeasContent() {
    const [value, setValue] = React.useState('1');
    const [user] = useAuthState(auth)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <section className='ideasContent'>
            <div className="container">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                               
                                <Tab label="Все идеи" value="1" />
                                <Tab label="Мои идеи" value="2" />

                            </TabList>
                        </Box>
                        <TabPanel value="2">
                            <MyIdeas current={user}/>
                        </TabPanel>
                        <TabPanel value="1">
                            <AllIdeas/>
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </section>
    );
}
export default IdeasContent