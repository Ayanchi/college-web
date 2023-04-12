import React from 'react';
import ProfileHeader from '../components/Profile-comp/ProfileHeader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../app/firebase"
import AdminPage from '../components/Admin-comp/AdminPage';

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