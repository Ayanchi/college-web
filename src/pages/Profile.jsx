import React from 'react';
import ProfileHeader from "../components/ProfileComponents/ProfileHeader"
import { auth } from "../app/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileEdit from '../components/ProfileComponents/ProfileEdit';


const Profile = () => {
    const [user] = useAuthState(auth)

    return (
        <div>
            <ProfileHeader/>
            {user ? <ProfileEdit current={user} profile={true}/> : 'Необходимо войти в систему!!!'}
            
        </div>
    );
};

export default Profile;