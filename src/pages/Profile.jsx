import React from 'react';
import ProfileHeader from "../components/Profile-comp/ProfileHeader"
import { auth } from "../app/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileEdit from '../components/Profile-comp/ProfileEdit';


const Profile = () => {
    const [user] = useAuthState(auth)

    return (
        <div>
            <ProfileHeader/>
            {user ? <ProfileEdit current={user}/> : 'Необходимо войти в систему!!!'}
            
        </div>
    );
};

export default Profile;