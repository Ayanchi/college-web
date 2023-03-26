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



export function TeamsPage (props) {

    const [userIdea, setUserIdea] = useState([])
    const [subscriber, setSubscriber] = useState([])
    const [IdeaEditcontext, setIdeaEditcontext] = useState(false)
    const [ideaId, setIdeaId] = useState()
    const [user] = useAuthState(auth)
    //const [ideaEdit, setIdeaEdit] = useContext(ModalIdeaEdit)



    useEffect(() => {
        const getFormList = async () => {
            try {
                const q = query(collection(database, "ideas"), where("author", "==", props.current));
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                setUserIdea(filterForm)
            } catch (error) {
                console.log(error)
            }
        }
        getFormList()
    }, [])

    useEffect(() => {
        const getFormList = async() =>{
            try{
                const q = query(collection(database, "ideas"), where("subscribe", "array-contains", props.current));
                const data = await getDocs(q)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                //console.log(query(collection(database, "ideas"), where("subscribe", "==", props.current)))
                setSubscriber(filterForm)
            }catch(error){
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
    const deleteSubscribeUser = async () => {
        const q = collection(database, "ideas").where("subscribe", "array-contains", props.current);
        // const data = await getDocs(q)
        // updateDoc( data.docs.map((doc) => ({
        //     ...doc.data(),
        //     subscribe: arrayRemove(props.current)
        // }))
        // )
        q.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.updateDoc({ subscribe: arrayRemove(props.current) });
            });
          });
        // console.log(data)
        // await updateDoc(q,{
            
        //     subscribe: arrayRemove(props.current)
        // })
    }



    return(
        <div>
            <div className="UsersIdeas">
                <p>Ваши идеи</p>
                {userIdea.map((item) => (
                    <div className="ideaTitle" key={item.id}>
                       <div className="title">
                            Идея: {item.title}
                       </div>
                       <br />
                       <div className="description"
                        style={{display: 'flex'}}>
                            Тема:  
                            <div className="textDescription"
                            style={{overflow: 'auto', width: '500px', marginLeft: '5px'}}>
                              {item.description}
                            </div>
                            
                        </div>
                       <div className="corecters">
                            
                            <div>
                                <button className="pencil" onClick={(e) => takingIdeaId(e)} >
                                    <img src={pencil} alt="" />
                                </button>
                                
                            </div>
                        </div>
                    </div>
                ))}


            </div>
            <div className="UsersJoinIdeas">
                <p>Идеи к которам вы присоединились</p>
                {subscriber.map((item) => (
                    <div className="ideaTitle" key={item.id}> 
                        <div className="title">
                            Идея: {item.title}
                        </div>
                        <br />
                        <div className="description"
                        style={{display: 'flex'}}>
                            Тема:  
                            <div className="textDescription"
                            style={{overflow: 'auto', width: '500px', marginLeft: '5px'}}>
                              {item.description}
                            </div>
                            
                        </div>
                        <div className="delete">
                            <button onClick={ deleteSubscribeUser}> покинуть идею</button>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}