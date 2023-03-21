import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../app/firebase";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom"
import Modal from '@mui/material/Modal';
import { useState, createContext } from 'react';
import "../CSS/ProfileHeader.css"
import CheckSindingIdea from './CheckSending';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { display } from '@mui/system';

import logOut from "../../assets/logout.png"
import headerLogo from "../../assets/headerLogo.jpg"


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

    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth)
            navigate('/college-web/')

        } catch (error) {
            console.log(error)
        }
    }



    return (

        <div className='wrapper'>
            <div className="container">
                <header className='header'>
                    <div className="logo">
                        <Link to="/college-web/profile">
                            <img src={headerLogo} alt="" />
                        </Link>
                    </div>
                    <div className="links">
                        <Box sx={{ width: 300, display: 'flex' }}>
                            <BottomNavigation
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            >
                                <BottomNavigationAction 
                                icon={<img src={logOut} className='logOutImg' />} 
                                onClick={logout} 
                                
                                />
                            </BottomNavigation>
                            <ModalIdea.Provider value={[idea, setIdea]}>
                                <BottomNavigation
                                    showLabels
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                >
                                    <BottomNavigationAction label="Добавить идею" onClick={() => setIdea(true)} />
                                    <Modal
                                        open={idea}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <CheckSindingIdea />
                                        </Box>
                                    </Modal>
                                </BottomNavigation>

                            </ModalIdea.Provider>


                            <Link to="/college-web/ideas">
                                <BottomNavigation
                                    showLabels
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                >
                                    <BottomNavigationAction label="Список идей" />
                                </BottomNavigation>
                            </Link>


                        </Box>

                    </div>
                </header>
            </div>
        </div>

    );
};

export default ProfileHeader;