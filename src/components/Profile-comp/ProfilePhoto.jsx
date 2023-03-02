import React from 'react';
import defUserPhoto from "../../assets/DefaultUser.png"
import ProfileEdit from './ProfileEdit';

import "../CSS/ProfilePhoto.css"

const ProfilePhoto = () => {
    return (
        <div>
            <div className="container">
                <div className="userInfo">
                    <div className="userPhoto">
                        <img src={defUserPhoto} alt="default user photo" />
                    </div>
                    <ProfileEdit/>
                </div>
            </div>
        </div>
    );
};

export default ProfilePhoto; <img src="" alt="" />