import React, { useState, useEffect, createContext} from 'react';
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

const AllIdeas = () => {
    const [isUser, setIsUser] = useState([])
    const [imageList, setImageList] = useState(null)
    const [user] = useAuthState(auth)
    const [selectedValue, setSelectedValue] = useState("Все")
    const imageListRef = ref(storage, `images/profile/${user?.email}`)
    const [searchResult, setSearchResult] = useState([])
    const [similarAnswers, setSimilarAnswers] = useState([])
    const [searchValue, setSearchValue] = useState('')

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

    useEffect(() => {
        const getFormList = async () => {
            try {
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

    function searchIdea(e) {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        const search = searchValue
        let similar = []
        const filter_array = isUser.filter(item => {
            let tags_text = ''
            item?.tags?.forEach(item => {
                tags_text += '#' + item + ' '
                if (item.includes(search)) similar.push(item)
            })
           return tags_text.includes(search) || item.title.includes(search)
        })
        setSearchResult(filter_array)
        setSimilarAnswers(similar)
    }, [searchValue])

    return (
        <div>
            <div className="ideasSort">
                <input className='search-input' name="search" placeholder="Поиск" value={searchValue} onChange={searchIdea}/>
                <div className='search-answers'>
                    {similarAnswers.map((item, index) => {
                        return (<div key={index} className='search-answer' onClick={() => {
                            setSearchValue(item)
                        }}>{item}</div>)
                    })}
                </div>
            </div>
            {searchResult.length == 0 && isUser.map((item, index) => (
                <div className="ideaContainer" key={index}>
                    <div className="authIdeas">
                        <div className="ideaImage">
                            <div>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={item.imageUser}
                                    sx={{ width: 70, height: 70 }}
                                />
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
                            <div className="tags-area">
                                Теги: 
                                {
                                    item?.tags?.map((item, index) => {
                                        return (<span key={index} className='tag-select' onClick={() => setSearchValue(item)}>{' #' + item + ' '}</span>)
                                    })
                                }
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
            {searchResult.length > 0 && searchResult.map((item, index) => (
                <div className="ideaContainer" key={item.id}>
                    <div className="authIdeas">
                        <div className="ideaImage">
                            <div>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={item.imageUser}
                                    sx={{ width: 70, height: 70 }}
                                />
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
                            <div className="tags-area">
                                Теги: 
                                {
                                    item?.tags?.map(item => {
                                        return (<span className='tag-select' onClick={() => setSearchValue(item)}>{' #' + item + ' '}</span>)
                                    })
                                }
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