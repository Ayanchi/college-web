import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import UsersTable from './UsersTable';
import TeamsTable from './TeamsTable';

export default function IdeaTable() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Участники" value="1" />
            <Tab label="Команды" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UsersTable/>
        </TabPanel>
        <TabPanel value="2">
          <TeamsTable/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}