import React from "react";
import ProfileHeader from "../components/Profile-comp/ProfileHeader"
import { auth } from "../app/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import TeamList from "../components/Admin-comp/TeamList";

export default function Team(){
    const [user] = useAuthState(auth)

    return(
        <div>
            <ProfileHeader/>
            {user ? <TeamList/> : 'Необходимо войти в систему!!!'}
        </div>
    )

}