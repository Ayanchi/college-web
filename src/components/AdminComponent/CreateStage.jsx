import React, { useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import { collection, addDoc, Timestamp } from "firebase/firestore"

import { database } from '../../app/firebase';
import { ModalStages } from './Stages';


const CreateStage = () => {
    const [isSending, setisSending] = useState(true)
    const [creatingStage, setCreatingStage] = useContext(ModalStages)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { register, handleSubmit, formState: { errors } } = useForm({

    })

    const onSubmitForm = async (data) => {
        const timestamp = Timestamp.fromDate(selectedDate);
        try {
            await addDoc(collection(database, 'stages'), {
                title: data.title,
                description: data.description,
                grade: data.grade,
                deadline: timestamp
            });
            setisSending(false)
        } catch (error) {
            console.log(error)
        }
    }
    function handleDateChange(event) {
        setSelectedDate(new Date(event.target.value));
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
                        <div className="stageDeadline">
                            <label htmlFor="date">Select a date:</label>
                            <input type="datetime-local" id="localdate" name="date" onChange={handleDateChange} />
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