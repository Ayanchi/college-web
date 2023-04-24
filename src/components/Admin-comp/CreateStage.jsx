import React,{useContext, useState} from 'react';
import { ModalStages } from './Stages';
import { useForm } from 'react-hook-form';
import { collection, addDoc, query} from "firebase/firestore"
import { database } from '../../app/firebase';

const CreateStage = () => {
    const [isSending, setisSending] = useState(true)
    const [create, setCreate] = useContext(ModalStages)
    const { register, handleSubmit, formState: { errors } } = useForm({

    })

    const onSubmitForm = async (data) => {
        try {
            await addDoc(collection(database, 'stages'), {
                title: data.title,
                description: data.description,
                grade: data.grade,
                // deadline: data.deadline
            });
            setisSending(false)
        } catch (error) {
            console.log(error)
        }
    }




    if (isSending) {
        return (
            <div className="ideaModal">
                <div className="send">
                    <button className="closebuttonIdea" onClick={() => setCreate(false)}>X</button>
                </div>
                <form className="idea-form" onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="mainInputs">
                        <div className="firstInput">
                            <div className="title-idea">Создание этапа</div>
                            <input
                                name="title"
                                type="text"
                                placeholder="Тема этапа"
                                {...register('title', {
                                    required: "Параметр обязателен",
                                })}
                            />
                            {errors.title && <span className="error" role="alert">{errors.title?.message}</span>}
                        </div>
                        <div className="stageDescription">
                            <textarea
                                name="description"
                                type="text"
                                placeholder="Ваш этап"
                                className="yourIdea"
                                {...register('description', {
                                    required: "Параметр обязателен",
                                })}
                            >
                            </textarea>
                            {errors.description && <span className="error" role="alert">{errors.description?.message}</span>}
                        </div>
                        <div className="stageGrade">
                            <input
                                name="title"
                                type="number"
                                placeholder="Оценка этапа"
                                {...register('grade', {
                                    required: "Параметр обязателен",
                                })}
                            />
                            {errors.title && <span className="error" role="alert">{errors.title?.message}</span>}
                        </div>
                    </div>

                    <button
                        className="b-center b-block focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        type="submit"
                    >
                        Cоздать
                    </button>
                </form>
            </div>
        )
    } else {
        return (
            <div className="send">
                <button className="closebuttonIdea" onClick={() => setCreate(false)}>X</button>
                <div className="sendingIdea">Новый этап создан</div>
            </div>
        )
    }
};

export default CreateStage;