import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../app/firebase";
import ProfileIdea from './ProfileIdea';
import { ModalIdea } from "./ProfileHeader"
import { useContext } from 'react';
import React from "react"



const CheckSindingIdea = () => {

    const [user] = useAuthState(auth)
    const [idea, setIdea] = useContext(ModalIdea)


    if (user) {
        return (
            <div>
                <ProfileIdea current={user} />
            </div>

        )

    } else {
        return (
            <div>
                <button className="closebuttonIdea" onClick={() => setIdea(false)}>X</button >
                <div className="youNeedReges">вам нужно войти в акк GOOGLE</div>
            </div>
        )
    }
}

export default CheckSindingIdea
