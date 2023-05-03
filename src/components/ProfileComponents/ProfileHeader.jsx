import React, { useState, createContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../app/firebase";
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Link } from "react-router-dom"
import Modal from '@mui/material/Modal';
import { green } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { useAuthState } from 'react-firebase-hooks/auth';

import { allowed } from '../AdminComponent/AllowedUser';
import CheckSindingIdea from './CheckSending';

import headerLogo from "../../assets/headerLogo.jpg"

import "../CSS/ProfileHeader.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
}

const ModalIdea = createContext()
export { ModalIdea }

const ProfileHeader = () => {
    const [idea, setIdea] = useState(false)
    const [value, setValue] = useState(0);
    const [user] = useAuthState(auth)
    const [state, setState] = useState(false)

    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth)
            navigate('/college-web/')

        } catch (error) {
            console.log(error)
        }
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };



    function checkAdmin() {
        return allowed.includes(user?.email)
    }


    return (

        <div className='wrapper'>
            <div className="container">
                <header className='header'>
                    <div className="logo">
                        <Link to="/college-web">
                            <img src={headerLogo} alt="" />
                        </Link>
                    </div>
                    <div className="links">
                        <Button onClick={() => setState(true)}><MenuIcon sx={{ color: green[600] }} fontSize="large" /></Button>
                        <SwipeableDrawer
                            anchor={'right'}
                            open={state}
                            onClose={() => setState(false)}
                            onOpen={() => setState(true)}
                        >
                            <Box
                                sx={{ width: 250 }}
                                role="presentation"
                                onClick={() => setState(false)}
                            >
                                <List>
                                    <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>

                                        <Link to="/college-web/profile">
                                            <ListItemButton value={value}>
                                                <ListItemIcon>
                                                    {<Person4RoundedIcon sx={{ color: green[600] }} fontSize="large" />}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={<Typography sx={{ color: green[600] }} >Профиль</Typography>} />
                                            </ListItemButton>
                                        </Link>

                                        <Link to="/college-web/table">
                                            <ListItemButton value={value}>
                                                <ListItemIcon>
                                                    {<Groups2RoundedIcon sx={{ color: green[600] }} fontSize="large" />}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={<Typography sx={{ color: green[600], textAlign: 'left' }}>Список участников</Typography>} />
                                            </ListItemButton>
                                        </Link>

                                        <ModalIdea.Provider value={[idea, setIdea]}>
                                            <ListItemButton
                                                value={value}
                                                onClick={() => setIdea(true)}
                                            >
                                                <ListItemIcon>
                                                    {<LightbulbIcon sx={{ color: green[600] }} fontSize="large" />}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={<Typography sx={{ color: green[600] }}>Добавить идею</Typography>} />

                                            </ListItemButton>
                                            <Modal
                                                open={idea}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <CheckSindingIdea />
                                                </Box>
                                            </Modal>

                                        </ModalIdea.Provider>

                                        <Link to="/college-web/ideas">
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {<BatchPredictionIcon sx={{ color: green[600] }} fontSize="large" />}
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography sx={{ color: green[600] }}>Идеи</Typography>} />
                                            </ListItemButton>
                                        </Link>

                                        {checkAdmin() && (
                                            <Link to="/college-web/admin">
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        {<AdminPanelSettingsIcon sx={{ color: green[600] }} fontSize="large" />}
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography sx={{ color: green[600] }}>Администратор</Typography>} />
                                                </ListItemButton>
                                            </Link>

                                        )}
                                        <ListItemButton
                                            value={value}
                                            onClick={logout}
                                        >

                                            <ListItemIcon>
                                                {<LogoutIcon sx={{ color: green[600] }} fontSize="large" />}
                                            </ListItemIcon>
                                            <ListItemText
                                                disableTypography
                                                primary={<Typography sx={{ color: green[600] }} >Выйти</Typography>} />
                                        </ListItemButton>
                                    </ListItem>
                                </List>

                            </Box>
                        </SwipeableDrawer>

                    </div>
                </header>
            </div>
        </div>

    );
};

export default ProfileHeader;