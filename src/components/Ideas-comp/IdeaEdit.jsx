import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ModalIdeaEdit } from './MyIdeas';
import { useForm } from "react-hook-form";
import { database, auth } from "../../app/firebase";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import "../CSS/GetApply.css"
import { useAuthState } from 'react-firebase-hooks/auth'





const IdeaEdit = (props) => {
    const [isUser, setIsUser] = useState()
    const [selectedValue, setSelectedValue] = useState()
    const [checked, setChecked] = useState()
    const [isSending, setisSending] = useState(true)
    const [ideaEdit, setIdeaEdit] = useContext(ModalIdeaEdit)
    const [user] = useAuthState(auth)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: async () => await getData()
    })


    async function getData() {
        const idea = await getDoc(doc(database, 'ideas', props?.id))
        const responce = idea.data()
        if (responce?.title) {
            return {
                title: responce.title,
                description: responce.description,
                checked: responce.checkbox,
                select: responce.select
            }
        } else {
            return {
                title: '',
                description: '',
                checked: false,
                select: ''
            }
        }
    }

    useEffect(() => {
        const getFormList = async () => {
            try {
                const idea = await getDoc(doc(database, 'ideas', props?.id))
                const responce = idea.data()
                setIsUser(responce)
                setChecked(responce?.checkbox)
                setSelectedValue(responce?.select)

            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    function handleSelectChange(e) {
        setSelectedValue(e.target.value);
    }
    function checkedClick(e) {
        let res = e.target.checked
        setChecked(res)
    }

    const onSubmitForm = async (data) => {
        try {

            await updateDoc(doc(database, 'ideas', props.id), {
                title: data.title,
                checkbox: checked,
                select: selectedValue,
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
                    <button className="closebuttonIdea" onClick={() => setIdeaEdit(false)}>X</button>

                    <div className="mainInputs">
                        <div className="firstInput">
                            <input
                                name="title"
                                type="text"
                                placeholder="Тема идеи"
                                defaultValue={isUser?.title || ''}
                                {...register('title', {
                                    required: "Параметр обязателен",
                                    maxLength: {
                                        value: 15,
                                        message: 'Ваше имя должно быть меньше 20 символов'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Ваше имя должно быть больше 3 символов'
                                    },
                                })}
                            />
                            {errors.author && <span className="error" role="alert">{errors.author?.message}</span>}
                        </div>
                        <div className="idea">
                            <textarea
                                name="description"
                                type="text"
                                placeholder="Ваша идея"
                                defaultValue={isUser?.description || ''}
                                className="yourIdea"
                                {...register('description', {
                                    required: "Параметр обязателен",
                                })}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div>
                            <input
                                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                name="checkbox"
                                defaultChecked={isUser?.checkbox}
                                onClick={(e) => checkedClick(e)}
                            />
                            <label
                                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                htmlFor="flexSwitchCheckDefault"
                            >показать или спрятать идею
                            </label>
                        </div>
                    </div>

                    <div className="select">
                        <p>
                            <select size="3" name="select" value={selectedValue} onChange={handleSelectChange}>
                                <option disabled>Выберите Направление</option>
                                <option value="Медицина">Медицина</option>
                                <option value="Бизнес">Бизнес</option>
                                <option value="Правительство">Правительство</option>
                                <option value="Другое">Другое</option>
                            </select>
                        </p>
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
                    <button className="closebutton" onClick={() => setIdeaEdit(false)}>x</button>
                </div>
                <div className="modalMessage">Ваши данные успешно обновлены</div>


            </div>
        )
    }
}

export default IdeaEdit;