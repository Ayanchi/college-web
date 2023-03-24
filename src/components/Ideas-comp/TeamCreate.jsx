import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { getDoc, addDoc, doc } from 'firebase/firestore';
import { database } from '../../app/firebase';
import { CreatingTeam } from "./AllIdeas"


const TeamCreate = (props) => {
    const [isSending, setisSending] = useState(true)
    const { handleSubmit, formState: { errors } } = useForm({})
    const [teamModal, setTeamModal] = useContext(CreatingTeam)
    const [info, setInfo] = useState([])

    useEffect(() => {
        const getFormList = async () => {
            try {
                const idea = await getDoc(doc(database, 'ideas', props?.id))
                const responce = idea.data()
                setInfo(responce)
                console.log(info);
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    const onSubmitForm = async (data) => {
        try {
            await addDoc(doc(database, 'teams'), {
                title: data.title,
                checkbox: checked,
                tags: tagsIdea,
                description: data.description,
                author: props.current.email
            });
            setisSending(false)

        } catch (error) {
            console.log(error)
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
                        <div className="firstInput">
                            <div className="title-idea">Создание команды</div>
                            <div className="ideaTitle">
                                {info?.title}
                            </div>
                        </div>
                        <div className="idea">
                            <div className="infoDescr">
                                {info?.description}
                            </div>
                        </div>
                    </div>

                    <div className="select">
                        {info?.subscribe.map((el) => (
                            <>
                                <input type="checkbox" />
                                <div>{el}</div>
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
                    <button className="closebutton" >x</button>
                </div>
                <div className="modalMessage">Ваши данные успешно обновлены</div>
            </div>
        )
    }
};

export default TeamCreate;