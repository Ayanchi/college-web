import { useEffect, useState, useContext } from "react"
import { database } from "../../app/firebase"
import { getDocs, collection, setDoc, doc, query, where, limit } from "firebase/firestore"
import "../CSS/GetApply.css"
import { useForm } from "react-hook-form";
import { ModalContext } from "../../App"

const Registration = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: async () => await getData()
    });

    async function getData() {
        const q = query(collection(database, "users"), where("idUser", "==", props.current.uid), limit(1));
        const data = await getDocs(q)
        const filterForm = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        if (filterForm.length > 0)
            return filterForm[0]
        else
            return {
                name: '',
                surename: '',
                phone: '',
                skills: ''
            }
    }

    const [userData, setUserData] = useState([])
    const [isSending, setisSending] = useState(true)
    const [modal, setModal] = useContext(ModalContext)

    useEffect(() => {
        const getFormList = async () => {
            try {
                const q = query(collection(database, "users"), where("idUser", "==", props.current.uid), limit(1));
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setUserData(filterForm)
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    useEffect(() => {
        setModal(true)
    }, [modal])

    const onSubmitForm = async (data) => {
        try {
            await setDoc(doc(database, "users", props.current.email), {
                idUser: props.current.uid,
                email: props.current.email,
                name: data.name,
                surename: data.surename,
                phone: data.phone,
                skills: data.skills
            });
            setisSending(false),
            setModal(true)
        } catch (error) {
            console.log(error)
        }
    }

    if (isSending) {
        return (
            <div className="form">
                <button className="closebutton" onClick={() => setModal(false)}>x</button>
                <form className="modal-form" onSubmit={handleSubmit(onSubmitForm)}>
                    <h3 className="formTitle">
                        Анкета участника
                    </h3>
                    <div className="inputs">
                        <div className="forms">
                            <label>Напишите ваше имя...</label>
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
                            <label>Напишите вашу фамилию...</label>
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
                            <label>Напишите ваш номер телефона...</label>
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
                            <label>Опишите ваши способности...</label>
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
        )
    } else {
        return (
            <div className="modal">
                <button className="closebutton" onClick={() => setModal(false)}>x</button>
                <div className="modalMessage">{userData[0] ? "Ваши данные успешно обновлены" : "Ваши данные успешно сохранены"}</div>
            </div>
        )
    }

}





export default Registration