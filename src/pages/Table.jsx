import React from "react";
import ProfileHeader from "../components/Profile-comp/ProfileHeader"
import { auth } from "../app/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import IdeaTable from "../components/Table-comp/IdeaTable";


export default function Table(){
    const [user] = useAuthState(auth)

    return(
        <div>
            <ProfileHeader/>
            {user ? <IdeaTable/> : 'Необходимо войти в систему!!!'}
        </div>
    )

}