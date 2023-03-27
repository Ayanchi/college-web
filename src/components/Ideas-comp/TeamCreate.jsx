import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { getDocs, setDoc, doc, query, where, collection, getDoc, onSnapshot } from 'firebase/firestore';
import { database } from '../../app/firebase';
import { CreatingTeam } from "./AllIdeas"
import { async } from '@firebase/util';


const TeamCreate = (props) => {
    const [isSending, setisSending] = useState(true)
    const { handleSubmit, formState: { errors } } = useForm({})
    const [teamModal, setTeamModal] = useContext(CreatingTeam)
    const [info, setInfo] = useState([])
    const [checkUser, setCheckUser] = useState(true)
    const [memberArray, setMemberArray] = useState([checkUser])

    

    //console.log(checkUser)
    //console.log(info)


    useEffect(() => {
        const getFormList = async () => {
            try {
                const q = query(collection(database, "ideas"), where("id", "==", props.id));
                // onSnapshot(q, (querySnapshot) => {
                //     const ideasData = []
                //     querySnapshot.docs.map((doc) => {
                //         ideasData.push(doc.data())
                //     })
                //     setInfo(ideasData)
                // })
                
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
            await setDoc(doc(database, 'teams', props.current.email), {
                author: props.current.email,
                members: memberArray, 

            });
            setisSending(false)

        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     const getTeamFormList = async () => {
    //         try{
    //             const q = query(collection(database, "teams"), where("author", "==", props.current.email));
    //             const teamData = await getDocs(q)
    //             const filterForm = teamData.docs.map((doc) => ({
    //                 ...doc.data(),
    //                 members: checkUser
    //             }))
    //         }catch (error){
    //             console.log(error)
    //         }
    //     }
    //     getTeamFormList()
    // })


    const valuelUsers = async () => {
        if (checkUser && true){

        }else{

        }
    }
    


    if (isSending) {
        return (
            <div className="ideaModal">
                <form className="idea-form" onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="send">
                        <button className="closebuttonIdea" onClick={() => setTeamModal(false)} >X</button>
                    </div>
                    <div className="mainInputs">
                        {info.map((il) => (
                            <>
                                <div className="firstInput">
                                    <div className="title-idea">Создание команды</div>
                                    <div className="ideaTitle">
                                        {il.title}
                                    </div>
                                </div>
                                <div className="idea">
                                    <div className="infoDescr" style={{overflowWrap: 'anywhere'}}>
                                        {il.description}
                                    </div>
                                </div>
                                {il.subscribe.map((el) => (
                                    <>
                                        <div className="select" style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            <div>
                                                <input 
                                                    type="checkbox"
                                                    checked={checkUser}
                                                    onChange = {(e) => setCheckUser(e.target.checked)}/>
                                            </div>
                                            <div>{el}</div>
                                        </div>
                                    </>

                                ))}
                            </>
                        ))}
                        

                    </div>

                    

                    <button
                        className="b-center b-block focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        type="submit"
                    >
                        Обновить данные
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
                <div className="modalMessage">Ваши данные успешно обновлены</div>
            </div>
        )
    }
};

export default TeamCreate;