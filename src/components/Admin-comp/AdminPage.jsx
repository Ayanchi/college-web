import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import TeamsTable from '../Table-comp/TeamsTable';





export default function AdminPage() {

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <section className="admin">
            <div className="container">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Этапы" value="1" />
                                <Tab label="Оценка команды" value="2" />
                                <Tab label="Просмотр команд" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">

                        </TabPanel>
                        <TabPanel value="2">

                        </TabPanel>
                        <TabPanel value="3">
                            <TeamsTable />
                        </TabPanel>
                    </TabContext>
                    
                </Box>
            </div>
        </section>
    )
}