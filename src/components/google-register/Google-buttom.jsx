import "../CSS/Google-buttom.css"
import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider, auth } from "../../app/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { ModalContext } from '../../App'

function GoogleButtom() {
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }
    }

    const [modal, setModal] = React.useContext(ModalContext)

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }

    const [user] = useAuthState(auth);

    if (user) {
        return (
            <div>
                <Button 
                    onClick={() => setModal(true)}
                    style={{
                        backgroundColor: '#b2ff00', 
                        color: '#150b50', 
                        fontWeight : '800', 
                        margin: '0 auto 20px auto', 
                        display: 'inline-block'
                    }}
                >
                    АНКЕТА УЧАСТНИКА
                </Button>
                <Stack spacing={2} direction="row">
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#b2ff00', 
                            color: '#150b50', 
                            fontWeight : '800', 
                            margin: '0 auto', 
                            display: 'inline-block'
                        }}
                        onClick={logout}>  
                            ВЫЙТИ
                    </Button>
                </Stack>
            </div>
        )
    } else {
        return (
            <div>
                <Button 
                        variant="contained"
                        style={{backgroundColor: '#b2ff00', color: '#150b50', fontWeight: '800'}}
                        onClick={signInWithGoogle}>
                        ПРИНЯТЬ УЧАСТИЕ</Button>

            </div>
        )
    }

}

export default GoogleButtom