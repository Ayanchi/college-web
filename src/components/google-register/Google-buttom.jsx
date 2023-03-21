import "../CSS/Google-buttom.css"
import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider, auth } from "../../app/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { ModalContext } from '../../App'
import { getDocs, collection, query, where, limit } from "firebase/firestore"
import { database } from "../../app/firebase"

function GoogleButtom() {
    const [modal, setModal] = React.useContext(ModalContext)

    const signInWithGoogle = async () => {
        try {
            const auth_user = await signInWithPopup(auth, googleProvider)
            if (auth_user?.user) {
                const q = query(collection(database, "users"), where("idUser", "==", auth_user.user.uid), limit(1));
                const data = await getDocs(q)
                if (data?.docs && data.docs?.length === 0) {
                    setModal(true)
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }

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