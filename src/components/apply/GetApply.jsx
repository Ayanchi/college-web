import { useEffect, useState } from "react"
import { database } from "../../app/firebase"
import { getDocs, collection } from "firebase/firestore"

const Registration = (props) => {
    const [formList, setFormList] = useState([])

    const formCollection = collection(database, 'ayana')

    useEffect(() => {
        const getFormList = async() => {
            try{
                const data = await getDocs(formCollection)
                const filterForm = data.docs.map((doc) => ({
                    ...doc.data(),
                     id: doc.id,
                }))
                console.log(data)
            }catch (error){
                console.log(error)
            }
            
        }

        getFormList()
    }, [])

    return (
        <div className="register">

        </div>
    )
}

export default Registration