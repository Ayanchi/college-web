import { useEffect, useState } from "react"
import { database } from "../../app/firebase"
import { getDocs, collection, setDoc, doc, query, where, limit} from "firebase/firestore"
import "../CSS/GetApply.css"
import {useForm} from "react-hook-form";



const Registration = (props) => {
    const {register, handleSubmit, formState: { errors } } = useForm();
    const [userData, setUserData] = useState([])
    const [isSending, setisSending] = useState(false)

    useEffect(() => {
        const getFormList = async() => {
            try{
                const q = query(collection(database, "users"), where("idUser", "==", props.current.uid), limit(1));
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setUserData(filterForm)
            }catch (error){
                console.log(error)
            }
        }
        getFormList()
    }, [])

    const onSubmitForm = async (data) => {
        try{
            await setDoc(doc(database, "users", props.current.email), {
                idUser: props.current.uid,
                email: props.current.email,
                name: data.name,
                surename: data.surename,
                phone: data.phone,
                skills: data.skills
            });
        }catch(error) {
            console.log(error)
        }
    }



    return(
        <div className="form">
            <form className="modal-form" onSubmit={handleSubmit(onSubmitForm)}>
                <div className="inputs" class="relative mb-3 xl:w-96" data-te-input-wrapper-init>
    
                    <div className="forms">
                        <input type="text"
                        name="name"
                        className="form-input"
                        id="exampleFormControlInput1"

                        defaultValue={userData[0]?.name || ''}
                        {...register('name',{
                           
                            maxLength: {
                                value: 15,
                                message: 'Ваше имя должно быть меньше 20 символов'
                            },
                            minLength: {
                                value: 2,
                                message: 'Ваше имя должно быть больше 3 символов'
                            },
                            required: "Параметр обязателен",
                            required: true
                        })} 
                        />
                            
                        {errors.name && <span className="error" role="alert">{errors.name?.message}</span>}
                    </div>
    
                    <div className="forms" class="relative mb-3 xl:w-96" data-te-input-wrapper-init>
                        <input type="text"
                        name="surename"
                        className="form-input"
                        id="exampleFormControlInput1"
                        defaultValue={userData[0]?.surename || ''}
                        {...register('surename',{
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
    
                    <div className="forms" class="relative mb-3 xl:w-96" data-te-input-wrapper-init>
                        <input type="number"
                        name="phone"
                        className="form-input"
                        id="exampleFormControlInput1"
                        defaultValue={userData[0]?.phone || ''}
                        {...register("phone",{
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
    
                    <div className="forms" class="relative mb-3 xl:w-96" data-te-input-wrapper-init>
                        <input type="text"
                        name="skills"
                        className="form-input"
                        id="exampleFormControlInput1"
                        defaultValue={userData[0]?.skills || ''}
                        {...register("skills",{
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

}

    
    


export default Registration