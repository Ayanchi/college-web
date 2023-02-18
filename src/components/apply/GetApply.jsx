import { useEffect, useState } from "react"
import { database } from "../../app/firebase"
import { getDocs, collection, addDoc } from "firebase/firestore"
import { async } from "@firebase/util"
import "../CSS/GetApply.css"
import {useForm} from "react-hook-form";


const Registration = (props) => {
    const [formList, setFormList] = useState([])

    const [name, setName] = useState("")
    const [surename, setSurename] = useState("")
    const [phone, setPhone] = useState(0)
    const [skills, setSkills] = useState("")

    const {register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        console.log(data)
    }


    const formCollection = collection(database, 'college-web')

    useEffect(() => {
        const getFormList = async() => {
            try{
                const data = await getDocs(formCollection)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data(),
                     id: doc.id,
                }))
                console.log(filterForm)
            }catch (error){
                console.log(error)
            }
            
        }

        getFormList()
    }, [])

    const onSubmitForm = async () => {
        try{
            await addDoc(formCollection, {
                name: name,
                surename: surename,
                phone: phone,
                skills: skills
            })
        }catch(error) {
            console.log(error)
        }
    }

    
    return (
        <div className="form">
            <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="inputs">

                        <div className="forms">
                            <input type="text"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            name="name" 
                            {...register('name', {
                                required: "Параметр обязателен",
                                maxLength: {
                                    value: 15,
                                    message: 'Ваше имя должно быть меньше 20 символов'
                                },
                                minLength: {
                                    value: 2,
                                    message: 'Ваше имя должно быть больше 3 символов'
                                }
                            })} />
                            {errors.name && <span className="error" role="alert">{errors.name?.message}</span>}

                        </div>

                        <div className="forms">
                            <input type="text"
                            placeholder="Surename"
                            onChange={(e) => setSurename(e.target.value)}
                            name="surename" 
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
                            onChange={(e) => setPhone(e.target.value)}
                            name="phone" 
                            {...register("phone", {
                                required: "Параметр обязателен",
                                minLength: {
                                    value: 9,
                                    message: "Номер не полный"
                                },
                                maxLength: {
                                    value:11,
                                    message: "Перебор !!!"
                                }
                            })} />
                        {errors.phone && <span className="error" role="alert">{errors.phone?.message}</span>}

                        </div>

                        <div className="forms">
                            <input type="text"
                            placeholder="Skills"
                            onChange={(e) => setSkills(e.target.value)}
                            name="skills" 
                            {...register("skills", {
                                required: "Параметр обязателен"
                            })} />
                        </div>


                </div>
                <button className="butoon" onClick={onSubmitForm}>Submit Form</button>
            </form>

        </div>
    )
}

export default Registration