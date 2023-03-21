import React from 'react';
import ProfileHeader from "../components/Profile-comp/ProfileHeader"
import { auth } from "../app/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfileUsers from '../components/Profile-comp/ProfileUsers';
import { useParams } from 'react-router-dom';

const Users = () => {
    const [user] = useAuthState(auth)
    const id_user = useParams()
    //console.log(id_user)

    return (
        <div>
            <ProfileHeader/>
            {user ? <ProfileUsers current={user} id={id_user.id}/> : 'Необходимо войти в систему!!!'}
        </div>
    );
};

export default Users;