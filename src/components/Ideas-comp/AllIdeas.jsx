import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, where, doc } from "firebase/firestore"
import { database } from '../../app/firebase';
import { storage, auth } from '../../app/firebase'
import { ref, list, getDownloadURL } from 'firebase/storage'
import "../CSS/ProfilePhoto.css"
import Avatar from '@mui/material/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth'
import "../CSS/AllIdeas.css"
import Likes from './Likes';
import Susbscribe from './Subscribe';
import profile_foto from '../../assets/DefaultUser.png'


import arrow from "../../assets/arrow-down.png"
import { Link } from 'react-router-dom';

const AllIdeas = () => {
    const [isUser, setIsUser] = useState([])
    const [imageList, setImageList] = useState(null)
    const [user] = useAuthState(auth)
    const [selectedValue, setSelectedValue] = useState("Все")
    const [allSelectValues, setAllSelectValues] = useState(['Все', 'Другое', 'Медицина', 'Бизнес', 'Правительство'])
    const imageListRef = ref(storage, `images/profile/${user?.email}`)

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
                    const filterForm = data.docs.map(async (doc) => {
                        const data = doc.data()
                        let url
                        try {
                            const imageRef = ref(storage, `images/profile/${data.author}/profile`)
                            url = await getDownloadURL(imageRef)
                        } catch(err) {
                            url = profile_foto
                        }
                        

                        return {
                            ...data,
                            id: doc.id,
                            imageUser: url
                        }
                    });

                    const result = await Promise.all(filterForm)

                    setIsUser(result)
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
    function arrowFunction(str, id) {
        if (str.split("").length > 60) {
            return (
                < button className="arrow" onClick={(e) => {
                    let elem = document.getElementById(id)
                    elem?.classList.toggle("ideaDescrActive")
                    let arrow = e.target
                    arrow?.classList.toggle("arrowActive")
                }}>
                    <img src={arrow} alt="" />
                </button >
            )
        } else {
            return (<div></div>)
        }
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
            {isUser.map((item, index) => (
                <div className="ideaContainer" key={item.id}>
                    <div className="authIdeas">
                        <div className="ideaImage">
                            <div>
                                <Link to={`/college-web/user/${item.author.split('@').filter(elem => elem !== 'gmail.com')}`} >
                                    <Avatar
                                        alt="Remy Sharp"    
                                        src={item.imageUser}
                                        sx={{ width: 70, height: 70 }}
                                    />
                                </Link>
                            </div>
                            <div>{item.author}</div>
                        </div>
                    
                        <div className="aboutIdea">
                            <div className="ideaTitle">
                                {item.title}
                            </div>
                            <div id={item.id} className="ideaDescr">
                                {item.description}
                            </div>
                        </div>
                        <div className="corecters">
                            {arrowFunction(item.description, item.id)}
                        </div>
                    </div>
                    <div className="ideaActivity">
                        <div className="iconsNice">
                            <Likes current={item} />
                            <Susbscribe current={item} />
                            
                        </div>
                        
                        
                    </div>
                </div>
            ))
            }
        </div>
    );
};

export default AllIdeas;