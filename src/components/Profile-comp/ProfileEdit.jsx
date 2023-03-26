import React, { useState, useEffect, useContext } from 'react';
import { database } from "../../app/firebase"
import { query, setDoc, doc, getDoc } from "firebase/firestore"
import { useForm } from "react-hook-form";
import ProfilePhoto from './ProfilePhoto';
import { ModalContext } from "../../App"
import "../CSS/ProfileEdit.css"
import { TeamsPage } from '../Ideas-comp/TeamsPage';


const ProfileEdit = (props) => {

    const [userData, setUserData] = useState([])
    const [isSending, setIsSending] = useState(true)
    const [modal, setModal] = useContext(ModalContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: async () => await getData()
    });

    useEffect(() => {
        // Тут мы каждому пользователю создадим ссылку
        if (!props.current.hasOwnProperty('link')) {
            const user_link = props.current.email.split('@')[0].replace(/[^a-zA-z0-9]/gi, '');
            addLink(user_link)
        }
    }, [])

    async function addLink(link) {
        try {
            if (link) {
                const data = await (await getDoc(doc(database, 'users', props.current.email))).data()
                await setDoc(doc(database, "users", props.current.email), {
                    ...data,
                    link: link
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function getData() {
        const q = query(doc(database, "users", props.current.email));
        const data = await getDoc(q)
        const user_data = data.data()

        if (user_data?.name)
            return user_data
        else
            return {
                name: '',
                surename: '',
                phone: '',
                skills: ''
            }
    }
    useEffect(() => {
        const getFormList = async () => {
            try {
                const q = query(doc(database, "users", props.current.email));
                const data = await getDoc(q)
                setUserData(data.data())
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    const onSubmitForm = async (data) => {
        try {
            await setDoc(doc(database, "users", props.current.email), {
                idUser: props.current.uid,
                email: props.current.email,
                name: data.name,
                surename: data.surename,
                phone: data.phone,
                skills: data.skills,
                userLink: data.userLink,
                link: userData.link
            });
            setIsSending(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="container">
                <div className="userInfo">
                    <div className="userPhoto">
                        <ProfilePhoto />
                    </div>
                    <div className="profileForm">
                        {(!isSending) ? (
                            <div className="modal modalStyle">
                                <div className="closebutton">
                                    <button onClick={() => setIsSending(true)}>x</button>
                                </div>
                                <div className="modalMessage">Ваши данные успешно обновлены</div>
                            </div>
                        ) : ''}
                        <form className="profileModalForm" onSubmit={handleSubmit(onSubmitForm)}>
                            <h3 className="ProfileFormTitle">
                                Анкета участника
                            </h3>
                            <div className="inputs">
                                <div className="forms">
                                    <label> Ваше имя</label>
                                    <input type="text"
                                        placeholder="Ваше имя"
                                        name="name"
                                        defaultValue={userData[0]?.name || ''}
                                        {...register('name', {
                                            required: "Параметр обязателен",
                                            maxLength: {
                                                value: 15,
                                                message: 'Ваше имя должно быть меньше 20 символов'
                                            },
                                            minLength: {
                                                value: 3,
                                                message: 'Ваше имя должно быть больше 3 символов'
                                            },
                                        })} />
                                    {errors.name && <span className="error" role="alert">{errors.name?.message}</span>}
                                </div>

                                <div className="forms">
                                    <label>Ваша фамилия</label>
                                    <input type="text"
                                        placeholder="Ваша фамилия"
                                        name="surename"
                                        defaultValue={userData[0]?.surename || ''}
                                        {...register('surename', {
                                            required: "Параметр обязателен",
                                            maxLength: {
                                                value: 30,
                                                message: 'Вашa фамилия должна быть меньше 30 символов'
                                            },
                                            minLength: {
                                                value: 5,
                                                message: 'Вашa фамилия должна быть больше 5 символов'
                                            }
                                        })} />
                                    {errors.surename && <span className="error" role="alert">{errors.surename?.message}</span>}
                                </div>

                                <div className="forms">
                                    <label>Ваш номер телефона</label>
                                    <input type="number"
                                        placeholder="Ваш номер"
                                        name="phone"
                                        className="number"
                                        defaultValue={userData[0]?.phone || ''}
                                        {...register("phone", {
                                            required: "Параметр обязателен",
                                            minLength: {
                                                value: 8,
                                                message: "Номер не полный"
                                            },
                                            maxLength: {
                                                value: 18,
                                                message: "Перебор !!!"
                                            }
                                        })} />
                                    {errors.phone && <span className="error" role="alert">{errors.phone?.message}</span>}

                                </div>
                                <div className="forms">
                                    <label>Ссылка на социальную сеть</label>
                                    <input type="link"
                                        placeholder="Социальная сеть"
                                        name="userLink"
                                        className="userLink"
                                        defaultValue={userData[0]?.userLink || ''}
                                        {...register("userLink", {
                                            maxLength: {
                                                value: 30,
                                                message: "Ссылка превышает колличество символов"
                                            }
                                        })} />
                                    {errors.userLink && <span className="error" role="alert">{errors.userLink?.message}</span>}

                                </div>

                                <div className="forms">
                                    <label>Ваши способности</label>
                                    <textarea type="text"
                                        placeholder="Ваши способности"
                                        name="skills"
                                        defaultValue={userData[0]?.skills || ''}
                                        {...register("skills", {
                                            required: "Параметр обязателен"
                                        })}>
                                    </textarea>
                                    {errors.skills && <span className="error" role="alert">{errors.skills?.message}</span>}
                                </div>
                            </div>
                            <button
                                className="b-center b-block focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                type="submit"
                            >
                                {userData[0]?.name ? 'Обновить данные' : 'Сохранить данные'}
                            </button>
                        </form>

                    </div>
                </div>
                <div className="teamPart">
                    <TeamsPage current={props.current.email}/>
                </div>
            </div>
        </div>
    )
};

export default ProfileEdit;