import "../CSS/Google-buttom.css"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { signInWithPopup, signOut } from "firebase/auth";
import { googleProvider, auth } from "../../app/firebase";
import { async } from "@firebase/util";

function GoogleButtom(){

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
        }catch (error){
            console.log(error)
        }
    }
        
    

    return(
        <div>
            <p>Зарегистрируйтесь через GOOGLE</p>
            <Stack spacing={2} direction="row">
                <Button 
                    variant="contained"
                    onClick={signInWithGoogle}>
                    
                    Sing in with GOOGLE</Button>
            </Stack>
        </div>
    )
}

export default GoogleButtom