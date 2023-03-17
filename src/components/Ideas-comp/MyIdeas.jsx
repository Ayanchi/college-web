import React, { useState, useEffect } from 'react';
import { getDocs, collection, where, query } from "firebase/firestore"
import { database } from '../../app/firebase';
import { storage, auth } from '../../app/firebase'
import { ref, list, getDownloadURL } from 'firebase/storage'
import "../CSS/ProfilePhoto.css"
import Avatar from '@mui/material/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Likes from './Likes';
import Susbscribe from './Subscribe';
import arrow from "../../assets/arrow-down.png"
import IdeaEdit from "./IdeaEdit"
import { Modal } from '@mui/material';
import { createContext } from "react"
import { Box } from '@mui/system';
import pencil from "../../assets/pencil.png"
const ModalIdeaEdit = createContext()
export { ModalIdeaEdit }

import "../CSS/AllIdeas.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black'
};


const MyIdeas = (props) => {
    const [user] = useAuthState(auth)
    const [isUser, setIsUser] = useState([])
    const [imageList, setImageList] = useState(null)
    const [avatar, setAvatar] = useState(false)
    const [ideaEdit, setIdeaEdit] = useState(false)
    const [selectedValue, setSelectedValue] = useState("все")
    const [allSelectValues, setAllSelectValues] = useState(['все', 'другое...', 'дизайн', 'маркетинг', 'программист'])
    const imageListRef = ref(storage, `images/profile/${user?.email}/`)
    const [ideaId, setIdeaId] = useState()

    useEffect(() => {

        if (user && user.email) {
            list(imageListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setImageList(url)
                    })
                })
            })
        }
    }, [user])

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getFormList(user)
            }
        });
    }, [selectedValue])
    const getFormList = async (user) => {
        try {
            if (selectedValue == allSelectValues[0]) {
                const q = query(collection(database, "ideas"), where("author", "==", user.email));
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setIsUser(filterForm)
            } else {
                const q = query(collection(database, "ideas"), where("author", "==", user.email), where("select", "==", selectedValue));
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setIsUser(filterForm)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleSelectChange(e) {
        setSelectedValue(e.target.value)
    }

    const takingIdeaId = (e) => {
        setIdeaEdit(true)
        let button = e.target.parentNode.parentNode.parentNode
        let id = button.getAttribute("id")
        setIdeaId(id)
    }



    return (
        <div>
            <div className="ideasSort">
                {allSelectValues ? <select size="3" name="select" onChange={handleSelectChange}>
                    {allSelectValues?.map((el, idx) => (
                        <option value={el} key={idx}>{el}</option>
                    ))}
                </select> : <></>}
            </div>
            {isUser.map((item, idx) => (
                <div className="ideaContainer" id={item.id} key={item.id}>
                    <div className="ideaImage">
                        <Avatar
                            alt="Remy Sharp"
                            src={imageList}
                            sx={{ width: 50, height: 50 }}
                        />
                    </div>
                    <div className="aboutIdea">
                        <div className="ideaTitle">
                            {item.title}
                        </div>
                        <div id={idx} className="ideaDescr">
                            {item.description}
                        </div>
                    </div>
                    <div className="ideaActivity">
                        <Likes current={item} />
                        <Susbscribe current={item} />
                        <button className="arrow" onClick={(e) => {
                            let elem = document.getElementById(idx)
                            elem?.classList.toggle("ideaDescrActive")
                            let arrow = e.target
                            arrow?.classList.toggle("arrowActive")
                        }} >
                            <img src={arrow} alt="" />
                        </button>
                        <button className="pencil" onClick={(e) => takingIdeaId(e)}>
                            <img src={pencil} alt="" />
                        </button>

                    </div>
                </div>
            ))}
            <ModalIdeaEdit.Provider value={[ideaEdit, setIdeaEdit]}>

                <Modal
                    open={ideaEdit}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={style}
                    >
                        <IdeaEdit id={ideaId} current={user}/>
                    </Box>
                </Modal>
            </ModalIdeaEdit.Provider>
        </div>
    );
};

export default MyIdeas;