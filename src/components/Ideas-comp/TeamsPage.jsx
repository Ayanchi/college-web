import "../CSS/TeamsPage.css"
import { useState, useEffect, useContext } from "react"
import { query, getDoc, collection, where, updateDoc, arrayRemove, doc, getDocs} from "firebase/firestore"
import { database, auth } from "../../app/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import pencil from "../../assets/pencil.png"
import { ModalIdeaEdit } from "./MyIdeas"
import { Link } from "react-router-dom"

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
                    ...doc.data(),
                    id: doc.id
                }))
                setSubscriber(filterForm)
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    const deleteSubscribeUser = async (id) => {
        const docRef = doc(database, "teams", id);
        const docSnap = await getDoc(docRef);
        await updateDoc(docSnap.ref, {
            members: arrayRemove(props.current)
        });
        setSubscriber(subscriber.filter(item => item.id != id))
    }

    return (
        <div>
            <div className="UsersJoinIdeas">
                <div className="UsersJoinIdeasTitle">Ваши команды: </div>
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
                                            <Link to={`/college-web/user/${meber.split('@')[0].replace(/[^a-zA-z0-9]/gi, '')}`}>
                                                {meber}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="delete">
                            <button onClick={() => deleteSubscribeUser(elem.id)}> Покинуть команду </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )

}