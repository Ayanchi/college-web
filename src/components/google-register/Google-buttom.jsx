import "../CSS/Google-buttom.css"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider, auth } from "../../app/firebase";
import { async } from "@firebase/util";
import { useAuthState } from 'react-firebase-hooks/auth';
import Registration from "../apply/GetApply";

function GoogleButtom(){

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
        }catch (error){
            console.log(error)
        }
    }

    const logout = async () => {
        try{
            await signOut(auth)
        }catch (error){
            console.log(error)
        }
    }

    const [user] = useAuthState(auth);

    if(user) {
        return(  
            <div>
                <Registration />
                <Stack spacing={2} direction="row">
                    <Button 
                        variant="contained"
                        onClick={logout}>  
                            Sing out
                    </Button>
                </Stack>
            </div>
        )
    }else{
        return(
            <div>
                <div className="little">Зарегистрируйтесь через GOOGLE</div>
                <Stack spacing={2} direction="row">
                    <Button 
                        variant="contained"
                        onClick={signInWithGoogle}>
                        Sing in with GOOGLE
                    </Button>
                </Stack>
            </div>
        )
    }

}

export default GoogleButtom