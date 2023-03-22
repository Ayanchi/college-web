import { ModalIdea } from "./ProfileHeader"
import { useContext, useState, useEffect } from "react"
import { database } from "../../app/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore"
import React from "react"
import { useForm } from "react-hook-form";
import "../CSS/ProfileIdea.css"


const ProfileIdea = (props) => {

    const [idea, setIdea] = useContext(ModalIdea)
    const [isUser, setIsUser] = useState([])
    const [selectedValue, setSelectedValue] = useState('другое...')
    const [checked, setChecked] = useState(false)
    const [isSending, setisSending] = useState(true)
    const [like, setLike] = useState([])
    const [subscribe, setSubscribe] = useState([])


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    const { register, handleSubmit, formState: { errors } } = useForm({

    })


    function handleSelectChange(e) {
        setSelectedValue(e.target.value);
    }

    useEffect(() => {
        const getFormList = async () => {
            try {
                const q = collection(database, "ideas");
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setIsUser(filterForm)
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    const onSubmitForm = async (data) => {
        try {
            const tagsIdea = data.tags.replace(/[^a-zа-яёA-ZА-ЯЁ0-9#]/gi, '').split('#').filter(element => element !== '')
            await addDoc(collection(database, "ideas"), {
                title: data.title,
                checkbox: checked,
                tags: tagsIdea,
                description: data.description,
                like: like,
                subscribe: subscribe,
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
                <button className="closebuttonIdea" onClick={() => setIdea(false)}>X</button>
                <form className="idea-form" onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="mainInputs">
                        <div className="firstInput">
                            <input
                                name="title"
                                type="text"
                                placeholder="Тема идеи"
                                {...register('title', {
                                    required: "Параметр обязателен",
                                    maxLength: {
                                        value: 20,
                                        message: 'Название идеи должно быть меньше 20 символов'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Название идеи должно быть больше 3 символов'
                                    },
                                })}
                            />
                            {errors.title && <span className="error" role="alert">{errors.title?.message}</span>}
                        </div>
                        <div className="idea">
                            <textarea
                                name="description"
                                type="text"
                                placeholder="Ваша идея"
                                className="yourIdea"
                                {...register('description', {
                                    required: "Параметр обязателен",
                                })}
                            >
                            </textarea>
                            {errors.description && <span className="error" role="alert">{errors.description?.message}</span>}
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
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}

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
                            <input
                                type="text"
                                placeholder="Теги:(#медицина #бизнес)"
                                name="tags"
                                className="input-tags"
                                defaultValue={isUser?.tags}
                                {...register('tags', {})}
                            />
                        </p>
                    </div>

                    <button
                        className="b-center b-block focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        type="submit"
                    >
                        создать
                    </button>
                </form>
            </div>
        )
    } else {
        return (
            <div className="send">
                <button className="closebuttonIdea" onClick={() => setIdea(false)}>X</button>
                <div className="sendingIdea">Ваша идея успешно отправленна</div>
            </div>
        )
    }
}

export default ProfileIdea