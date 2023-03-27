import React, { useState, useEffect, createContext } from 'react';
import { getDocs, collection, query, where, doc } from "firebase/firestore"
import { database } from '../../app/firebase';
import { storage, auth } from '../../app/firebase'
import { ref, list, getDownloadURL } from 'firebase/storage'
import "../CSS/ProfilePhoto.css"
import Avatar from '@mui/material/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth'
import "../CSS/AllIdeas.css"
import { Modal } from '@mui/material';
import { Box } from '@mui/system';

import Likes from './Likes';
import Susbscribe from './Subscribe';
import profile_foto from '../../assets/DefaultUser.png'
import arrow from "../../assets/arrow-down.png"
import { Link } from 'react-router-dom';
import TeamCreate from './TeamCreate';
import addIcon from "../../assets/addButton (2).png"

export const CreatingTeam = createContext()


const style2 = {
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


const AllIdeas = () => {
    const [teamModal, setTeamModal] = useState(false)
    const [isUser, setIsUser] = useState([])
    const [imageList, setImageList] = useState(null)
    const [user] = useAuthState(auth)
    const [selectedValue, setSelectedValue] = useState("Все")
    const imageListRef = ref(storage, `images/profile/${user?.email}`)
    const [searchResult, setSearchResult] = useState([])
    const [similarAnswers, setSimilarAnswers] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [ideaId, setIdeaId] = useState()

    const style = {
        width: "100%",
        height: "100%"
    }

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
                    } catch (err) {
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
    function arrowFunction(str, id, option) {
        const width = document.querySelector(".ideaDescr")?.offsetWidth;
        let res = Math.floor(width / 7.5)
        if (str.split("").length > res || option) {
            return (
                <button className="arrow" onClick={(e) => {
                    let elem = document.getElementById(id)
                    elem?.classList.toggle("ideaDescrActive")
                    let arrow = e.target
                    arrow?.classList.toggle("arrowActive")
                }}>
                    <img src={arrow} alt="" className="arrowImg" />
                </button >
            )
        } else {
            return (<></>)
        }
    }

    function searchIdea(e) {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        const search = searchValue
        let similar = []
        const maxResults = 6 // max count search results
        const filter_array = isUser.filter(item => {
            const lowerCaseSearch = search.toLowerCase()
            const lowerCaseItem = item.title.toLowerCase()

            let tags_text = ''
            item?.tags?.forEach(items => {
                if (similar.length >= maxResults) return
                tags_text += '#' + items + ' '
                if (items.toLowerCase().includes(lowerCaseSearch)) similar.push(items)
            })

            const lowerCaseTags = tags_text.toLowerCase()

            return lowerCaseTags.includes(lowerCaseSearch) || lowerCaseItem.includes(lowerCaseSearch)
        })
        setSearchResult(filter_array)
        setSimilarAnswers(similar)
    }, [searchValue])

    function takingId(id) {
        console.log(id);
        setTeamModal(true)
        setIdeaId(id)
    }

    return (
        <div>
            <div className="ideasSort">
                <input className='search-input' name="search" placeholder="Поиск" value={searchValue} onChange={searchIdea} />
                <div className='search-answers'>
                    {similarAnswers.map((item, index) => {
                        return (<div key={index} className='search-answer' onClick={() => {
                            setSearchValue(item)
                        }}>{item}</div>)
                    })}
                </div>
            </div>
            {searchResult.length == 0 && isUser.map((item, idx) => (
                <div className="ideaContainer" key={idx}>
                    <div className="authIdeas">
                        <div className="ideaImage">
                            <div className='avatar'>
                                <Link to={`/college-web/user/${item.author.split('@')[0].replace(/[^a-zA-z0-9]/gi, '')}`}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={item.imageUser}
                                        sx={{ width: 70, height: 70 }}
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="aboutIdea">
                            <div className="ideaTitle">
                                {item.title}
                            </div>
                            <div id={idx} className="ideaDescr">
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
                            {arrowFunction(item.description, idx, true)}
                        </div>
                    </div>
                    <div className="ideaActivity">
                        <div className="iconsNice">
                            <Likes current={item} />
                            <Susbscribe current={item} />
                            <div className="teamCreate">
                            <button onClick={() => takingId(item.id)}>
                                    <img src={addIcon} alt="createTeam" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
            
            {searchResult.length > 0 && searchResult.map((item, index) => (
                <div className="ideaContainer" key={item.id}>
                    <div className="authIdeas">
                        <div className="ideaImage">
                            <div className='avatar'>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={item.imageUser}
                                    sx={style}
                                />
                            </div>
                            <div className='ideaAuthor'>{item.author}</div>
                        </div>

                        <div className="aboutIdea">
                            <div className="ideaTitle">
                                {item.title}
                            </div>
                            <div id={index} className="ideaDescr">
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
                    </div>

                    <div className="ideaActivity">
                        <div className="corecters">
                            {arrowFunction(item.description, index, true)}
                        </div>
                        <div className="iconsNice">
                            <Likes current={item} />
                            <Susbscribe current={item} />
                            <div className="teamCreate">
                                <button onClick={() => takingId(item.id)}>
                                    <img src={addIcon} alt="createTeam" />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
            <CreatingTeam.Provider value={[teamModal, setTeamModal]}>
                <Modal
                    open={teamModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={style2}
                    >
                        <TeamCreate id={ideaId}  current={user} />
                    </Box>
                </Modal>
            </CreatingTeam.Provider>
        </div>
    );
};

export default AllIdeas;