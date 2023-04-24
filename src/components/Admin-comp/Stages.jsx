import React, { useState, useEffect, createContext } from 'react';
import { getDocs, collection } from "firebase/firestore"
import { database } from '../../app/firebase';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CreateStage from './CreateStage';

import "./../CSS/Stages.css" 

const ModalStages = createContext()
export { ModalStages }

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

const Stages = () => {
    const [stages, setStages] = useState([])

    const [create, setCreate] = useState(false)



    useEffect(() => {
        const getFormList = async () => {
            try {
                const q = collection(database, "stages")
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setStages(filterForm)
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    return (
        <section className="stages">
            <div className="createStages">
                <button onClick={() => setCreate(true)}>
                    Создать
                </button>
                <ModalStages.Provider value={[create, setCreate]}>
                    <Modal
                        open={create}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <CreateStage />
                        </Box>
                    </Modal>
                </ModalStages.Provider>
            </div>
            <div className="stagesBody">
                {stages?.map((el, idx) => {
                    return (
                        <div className="stageItem" key={idx}>
                            <div className="stageTItle">
                                {el.title}
                            </div>
                            <div className="stageDescr">
                                {el.description}
                            </div>
                            <div className="stageGrade">
                                {el.grade}
                            </div>
                            <div className="stageDeadline">
                                {console.log(el.deadline)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    );
};

export default Stages;