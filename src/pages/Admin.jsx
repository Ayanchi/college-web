import React from 'react';
import ProfileHeader from '../components/ProfileComponents/ProfileHeader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../app/firebase"
import AdminPage from '../components/AdminComponent/AdminPage';

const Admin = () => {
    const [user] = useAuthState(auth)
    return (
        <div>
            <ProfileHeader />
            <AdminPage current={user}/>
        </div>
    );
};

export default Admin;