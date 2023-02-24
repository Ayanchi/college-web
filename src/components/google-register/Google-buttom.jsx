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
            setUser(false)
        } catch (error) {
            console.log(error)
        }
    }

    const [user] = useAuthState(auth);

    if (user) {
        return (
            <div>
                <Button onClick={() => setModal(true)}>Подать заявку</Button>
                <Stack spacing={2} direction="row">
                    <Button
                        variant="contained"
                        onClick={logout}>
                        Sing out
                    </Button>
                </Stack>
            </div>
        )
    } else {
        return (
            <div>
                <div className="little">Зарегистрируйтесь через GOOGLE</div>
                <Stack spacing={2} direction="row">
                    <Button
                        variant="contained"
                        onClick={signInWithGoogle}>
                        Sing in with GOOGLE</Button>
                </Stack>
            </div>
        )
    }

}

export default GoogleButtom