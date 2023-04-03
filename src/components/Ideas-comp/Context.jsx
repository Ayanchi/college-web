/*import { auth } from '../../app/firebase'
import { createContext } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useAuthState } from 'react-firebase-hooks/auth';
import IdeaEdit from "./IdeaEdit"
import { useState, useEffect } from "react"


const ModalIdeaEdit = createContext()
export { ModalIdeaEdit }

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '0 30px 30px',
    color: 'black'
};
export function Context (){
    const [user] = useAuthState(auth)
    const [ideaEdit, setIdeaEdit] = useState(false)

   
    return(
        <div>
            <ModalIdeaEdit.Consumer value={[ideaEdit, setIdeaEdit]}>

                <Modal
                    open={ideaEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={style}
                    >
                        <IdeaEdit current={user} />
                    </Box>
                </Modal>
            </ModalIdeaEdit.Consumer>
        </div>
    )
    
}*/