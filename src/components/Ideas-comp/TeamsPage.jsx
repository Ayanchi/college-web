import "../CSS/TeamsPage.css"
import { useState, useEffect, useContext } from "react"
import { query, getDocs, collection, where, updateDoc, arrayRemove, doc } from "firebase/firestore"
import { database, auth } from "../../app/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import pencil from "../../assets/pencil.png"
import { ModalIdeaEdit } from "./MyIdeas"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '0 30px 30px',
    color: 'black'
};



export function TeamsPage(props) {

    const [subscriber, setSubscriber] = useState([])
    const [IdeaEditcontext, setIdeaEditcontext] = useState(false)
    const [ideaId, setIdeaId] = useState()
    const [user] = useAuthState(auth)

    useEffect(() => {
        const getFormList = async () => {
            try {
                const q = query(collection(database, "teams"), where("members", "array-contains", props.current));
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                setSubscriber(filterForm)
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    })

    const takingIdeaId = (e) => {
        let button = e.target.closest('.ideaTitle')
        let id = button.getAttribute("id")
        setIdeaId(id)
        setIdeaEditcontext(true)
    }

    // function arrowFunction(str, id) {
    //     if (str.split("").length > 40) {
    //         return (
    //             < button className="arrow" onClick={(e) => {
    //                 let elem = document.getElementById(id)
    //                 elem?.classList.toggle("ideaDescrActive")
    //                 let arrow = e.target
    //                 arrow?.classList.toggle("arrowActive")
    //             }}>
    //                 <img src={arrow} alt="" className="arrowImg" />
    //             </button >
    //         )
    //     } else {
    //         return (<div></div>)
    //     }
    // }
    const deleteSubscribeUser = async (id) => {
        const q = query(collection(database, "ideas"), where('id', '==', id), where("subscribe", "array-contains", props.current));
        getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref, {
                    subscribe: arrayRemove(props.current)
                }
                );
            });
        });
    }
    return (
        <div>
            <div className="UsersJoinIdeas">
                <div className="UsersJoinIdeasTitle">Идеи к которам вы присоединились</div>
                {subscriber.map((elem, idx) => (
                    <div className="teamIdeaContainer" key={idx}>
                        <div className="teamInfo">
                            <div className="teamName">
                                Название команды: {elem.teamName}
                            </div>
                            <div className="title">
                                Идея: {elem.title}
                            </div>
                            <br />
                            <div className="description"
                                style={{ display: 'flex' }}>
                                Тема:
                                <div className="textDescription"
                                    style={{ overflow: 'auto', width: '500px', marginLeft: '5px', height: '130px' }}>
                                    {elem.description}
                                </div>
                            </div>
                            <div className="teamMembers">
                                Участники:
                                <ul className="teamDots">
                                    {elem.members.map(meber => (
                                        <li className="memberName">
                                            {meber}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="delete">
                            <button onClick={() => deleteSubscribeUser(elem.id)}> покинуть идею</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )

}