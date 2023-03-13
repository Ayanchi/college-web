import React from 'react';
import ProfileHeader from '../components/Profile-comp/ProfileHeader';
import IdeasContent from '../components/Ideas-comp/IdeasContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../app/firebase"

const Ideas = () => {
    const [user] = useAuthState(auth)
    return (
        <div>
            <ProfileHeader />
            <IdeasContent current={user}/>
        </div>
    );
};

export default Ideas;