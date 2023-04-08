import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { getDocs, setDoc, doc, query, where, collection, getDoc, onSnapshot, addDoc } from 'firebase/firestore';
import { database } from '../../app/firebase';
import { CreatingTeam } from "./AllIdeas"
import { async } from '@firebase/util';
import "../CSS/TeamCreate.css"


const TeamCreate = (props) => {
    const currentEmail = props.current.email

    const [isSending, setisSending] = useState(true)
    const {register, handleSubmit, formState: { errors } } = useForm({

    })
    const [teamModal, setTeamModal] = useContext(CreatingTeam)
    const [info, setInfo] = useState([])
    const [checkUser, setCheckUser] = useState([currentEmail])
    const [memberArray, setMemberArray] = useState([checkUser])

    useEffect(() => {
        const getFormList = async () => {
            try {
                const q = query(collection(database, "ideas"), where("id", "==", props.id));
                const idea = await getDocs(q)
                const filterForm = idea.docs.map((doc) => ({
                    ...doc.data(),
                    //subscribe: checkUser
                }))
                setInfo(filterForm)
                //console.log(filterForm)
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    const onSubmitForm = async (data) => {
        try {
            
            await addDoc(collection(database, 'teams'), {
                author: info[0].author,
                creator: currentEmail,
                title: info[0].title,
                description: info[0].description,
                members: checkUser,
                teamName: data.teamName,
                idIdea: props.id
            });

            setisSending(false)
        } catch (error) {
            console.log(error)
        }
    }
    const takingNamesOfMembers = (e) => {
        let name = e.target.nextSibling.innerText
        if (e.target.checked && !checkUser.includes(name)) {
            setCheckUser([...checkUser, name])
        } else {
            const index = checkUser.indexOf(name)
            if (index) {
                let newArray = checkUser
                newArray.splice(index, 1)
                setCheckUser(newArray)
            }
        }
    }

    if (isSending) {
        return (
            <div className="ideaModal">
                <form className="idea-form" onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="send">
                        <button className="closebuttonIdea" onClick={() => setTeamModal(false)}>X</button>
                    </div>
                    <div className="teamContainer">
                        {info.map((il, idx) => (
                            <>
                                <div className="firstInput" key={idx}>
                                    <div className="title-idea">Создание команды</div>
                                    <input
                                        type="text"
                                        placeholder="Название команды"
                                        name="teamName"
                                        className="input-team"
                                        {...register('teamName')}
                                    />
                                    <div className="ideaTitle">
                                        {il.title}
                                    </div>
                                </div>
                                <div className="idea">
                                    <div className="infoDescr" style={{ overflowWrap: 'anywhere' }}>
                                        {il.description}
                                    </div>
                                </div>
                                <div className="subList">
                                    {il.subscribe.filter(it => it !== currentEmail).map((el, idx) => (
                                        <>
                                            <div className='subListInfo' key={idx}>
                                                <input
                                                className='subCheckbox'
                                                    type="checkbox"
                                                    onClick={(e) => takingNamesOfMembers(e)} />
                                                <div className='memberName'>
                                                    {el}
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </>
                        ))}
                    </div>
                    <button
                        className="b-center b-block focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        type="submit"
                    >
                        Создать команду
                    </button>
                </form>
            </div>
        )
    } else {
        return (
            <div className="modal">
                <div className="modalClose">
                    <button className="closebutton" onClick={() => setTeamModal(false)} >x</button>
                </div>
                <div className="modalMessage">Команда успешно создана</div>
            </div>
        )
    }
};

export default TeamCreate;