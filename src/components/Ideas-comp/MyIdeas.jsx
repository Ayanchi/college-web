import React, { useState, useEffect } from 'react';
import { getDocs, collection, where, query } from "firebase/firestore"
import { database } from '../../app/firebase';
import { storage, auth } from '../../app/firebase'
import { ref, list, getDownloadURL } from 'firebase/storage'
import "../CSS/ProfilePhoto.css"
import Avatar from '@mui/material/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SubsLiks from './SubsLikes';

import "../CSS/AllIdeas.css"


const MyIdeas = () => {
    const [user] = useAuthState(auth)
    const [isUser, setIsUser] = useState([])
    const [imageList, setImageList] = useState(null)
    const [avatar, setAvatar] = useState(false)
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
    const prePreview = () => {
        setAvatar(true)
    }

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

    // useEffect(() => {
    //     function uniqValues() {
    //         let res = []
    //         let uniqSelectRes = []
    //         isUser.map((el) => {
    //             res.push(el.select)
    //             uniqSelectRes = res.filter(function (item, pos) {
    //                 return res.indexOf(item) == pos;
    //             })
    //             console.log(uniqSelectRes);
    //             return setAllSelectValues(uniqSelectRes)
    //         })
    //     }
    //     uniqValues()
    // }, [])


    function handleSelectChange(e) {
        setSelectedValue(e.target.value)
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
            {isUser.map((item) => ( 
                <div className="ideaContainer" key={item.id}>
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
                        <div className="ideaDescr">
                            {item.description}
                        </div>
                    </div>
                    <div className="ideaActivity">
                        <SubsLiks/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyIdeas;