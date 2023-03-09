import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../app/firebase";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState, createContext } from 'react';
import "../CSS/ProfileHeader.css"
import ProfileIdea from './ProfileIdea';

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
}

const ModalIdea = createContext()
export {ModalIdea}

const ProfileHeader = () => {

    const [idea, setIdea] = useState(false)

    const navigate = useNavigate()

    const logout = async () => {
        try {
            await signOut(auth)
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    

    return (
        <div className='wrapper'>
            <div className="container">
                <header className='header'>
                    <div className="logo">
                        LOGO
                    </div>
                    <div className="links">
                        <div className="link">
                            <button onClick={logout}>
                                log out
                            </button>
                        </div>
                        <div className="link">
                            <ModalIdea.Provider value={[idea, setIdea]}>
                                <button onClick={() => setIdea(true)}>
                                    add an idea
                                </button>
                                <Modal
                                    open={idea}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <ProfileIdea/>
                                    </Box>
                                </Modal>
                            </ModalIdea.Provider>
                        </div>
                        
                        <div className="link">
                            <button>
                                All ideas
                            </button>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default ProfileHeader;