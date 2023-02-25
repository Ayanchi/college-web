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
                <button className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setModal(true)}>Подать заявку на участие</button>
                <Stack spacing={2} direction="row">
                    <Button
                        variant="contained"
                        onClick={logout}>
                        Выйти из аккаунта
                    </Button>
                </Stack>
            </div>
        )
    } else {
        return (
            <div>
                <div className="little">Зарегистрируйтесь через GOOGLE чтобы подать заявку</div>
                <Stack spacing={2} direction="row">
                <button onClick={signInWithGoogle} type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                    <svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                    Войти с помощью Google
                </button>
                </Stack>
            </div>
        )
    }

}

export default GoogleButtom