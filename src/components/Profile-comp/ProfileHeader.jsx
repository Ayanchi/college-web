import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../../app/firebase";
import { useNavigate } from 'react-router-dom'

import "../CSS/ProfileHeader.css"

const ProfileHeader = () => {

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
                            <button>
                                add an idea
                            </button>
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