import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where, doc } from "firebase/firestore"
import { database } from '../../app/firebase';
import { storage, auth } from '../../app/firebase'
import { ref, list, getDownloadURL } from 'firebase/storage'
import "../CSS/ProfilePhoto.css"
import Avatar from '@mui/material/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth'
import SubsLiks from './SubsLikes';
import "../CSS/AllIdeas.css"
import arrow from "../../assets/arrow-down.png"

const AllIdeas = () => {
    const [isUser, setIsUser] = useState([])
    const [imageList, setImageList] = useState(null)
    const [user] = useAuthState(auth)
    const [selectedValue, setSelectedValue] = useState("все")
    const [allSelectValues, setAllSelectValues] = useState(['все', 'другое...', 'дизайн', 'маркетинг', 'программист'])
    const imageListRef = ref(storage, `images/profile/${user?.email}/`)



    useEffect(() => {

        if (user) {
            list(imageListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url) => {
                        setImageList(url)
                    })
                })
            })
        }
    }, [user])


    ////////////////////////////////////////////////

    useEffect(() => {
        const getFormList = async () => {
            try {
                if (selectedValue == allSelectValues[0]) {
                    const q = query(collection(database, "ideas"), where("checkbox", "==", true));
                    const data = await getDocs(q)
                    const filterForm = data.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                    setIsUser(filterForm)
                } else {
                    const q = query(collection(database, "ideas"), where("select", "==", selectedValue), where("checkbox", "==", true));
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
        getFormList()
    }, [selectedValue])

    function handleSelectChange(e) {
        setSelectedValue(e.target.value)

    }

    return (
        <div>
            <div className="ideasSort">
                <select size="3" name="select" onChange={handleSelectChange}>
                    {allSelectValues?.map((el, idx) => (
                        <option value={el} key={idx}>{el}</option>
                    ))}
                </select>
            </div>
            {isUser.map((item) => (
                <div className="ideaContainer" key={item.id}>
                    <div className="ideaImage">
                        <Avatar
                            alt="Remy Sharp"
                            src={imageList}
                            sx={{ width: 70, height: 70 }}
                        />
                    </div>
                    <div className="aboutIdea">
                        <div className="ideaTitle">
                            {item.title}
                        </div>
                        <div id={item.id} className="ideaDescr">
                            {item.description}
                        </div>
                    </div>
                    <div className="ideaActivity">
                        <SubsLiks />
                        <button className="arrow" onClick={(e) => {
                            let elem = document.getElementById(item.id)
                            elem?.classList.toggle("ideaDescrActive")
                            let arrow = e.target
                            arrow?.classList.toggle("arrowActive")
                        }}>
                            <img src={arrow} alt="" />
                        </button>
                        
                    </div>
                </div>
            ))
            }
        </div>
    );
};

export default AllIdeas;