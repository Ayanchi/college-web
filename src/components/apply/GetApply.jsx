import { useEffect, useState, useContext } from "react"
import { database } from "../../app/firebase"
import { getDocs, collection, setDoc, doc, query, where, limit } from "firebase/firestore"
import "../CSS/GetApply.css"
import { useForm } from "react-hook-form";
import { ModalContext } from "../../App"


const Registration = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
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
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    if (isLoading) {
        return (
            <div className="form">
                <form className="modal-form" onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="inputs">
                        <button onClick={() => setModal(false)}>x</button>
                        <div className="forms">
                            <input type="text"
                                placeholder="Name"
                                name="name"
                                defaultValue={userData[0]?.name || ''}
                                {...register('name', {
                                    required: "Параметр обязателен",
                                    maxLength: {
                                        value: 15,
                                        message: 'Ваше имя должно быть меньше 20 символов'
                                    },
                                    minLength: {
                                        value: 2,
                                        message: 'Ваше имя должно быть больше 3 символов'
                                    },
                                })} />
                            {errors.name && <span className="error" role="alert">{errors.name?.message}</span>}
                        </div>

                        <div className="forms">
                            <input type="text"
                                placeholder="Surename"
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
                            <input type="number"
                                placeholder="Phone number"
                                name="phone"
                                className="number"
                                defaultValue={userData[0]?.phone || ''}
                                {...register("phone", {
                                    required: "Параметр обязателен",
                                    minLength: {
                                        value: 9,
                                        message: "Номер не полный"
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: "Перебор !!!"
                                    }
                                })} />
                            {errors.phone && <span className="error" role="alert">{errors.phone?.message}</span>}

                        </div>

                        <div className="forms">
                            <input type="text"
                                placeholder="Skills"
                                name="skills"
                                defaultValue={userData[0]?.skills || ''}
                                {...register("skills", {
                                    required: "Параметр обязателен"

                                })} />
                        </div>

                    </div>
                    <button
                        className="butoon"
                        type="submit"
                    >
                        {userData[0]?.skills ? 'Обновить данные' : 'Submit Form'}
                    </button>

                </form>

            </div>

        )
    } else {
        return (
            <div className="modal">
                <button onClick={() => setModal(false)}>x</button>
                {userData[0] ? "Ваши данные успешно обновлено" : "Ваши данные успешно сохранены"}
            </div>
        )
    }



}





export default Registration