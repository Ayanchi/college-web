import React, { useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database, storage } from '../../app/firebase'
import { getDocs, query, collection, where } from "firebase/firestore"
import { ref, getDownloadURL } from 'firebase/storage'

import Avatar from '@mui/material/Avatar';

import '../ProfileComponents/ProfileUsers.css'

export default function ProfileUsers(props) {
  const [user] = useAuthState(auth)
  const [userInfo, setUserInfo] = useState(true)

  useEffect(() => {
    const getFormList = async () => {
      try {
        const q = query(collection(database, "users"), where("link", "==", props.id));
        const userProfile = await getDocs(q);
        let userData = userProfile?.docs[0]?.data()
        console.log(userData)
        if (userData) {
          const imagetRef = `images/profile/${userData.email}/profile`
          getDownloadURL(ref(storage, imagetRef))
            .then(url => {
              setUserInfo({
                ...userData,
                image: url
              })
            })
            .catch(error => {
              console.log(error)
              setUserInfo({
                ...userData,
                image: ''
              })
            })

        }
      } catch (error) {
        setUserInfo(false)
        console.log(error)
      }
    }
    getFormList()
  }, [])

  if (user) {
    return (
      <div>
        {
          userInfo && (
            <div className='user'>
              <div className="userPhoto">
                <div className="photo">
                  <Avatar
                    alt="Remy Sharp"
                    src={userInfo?.image}
                    sx={{ width: 200, height: 200 }}
                  />
                </div>
                <div className="autor">
                  Автор {props.id}
                </div>
              </div>
              <div className="content">
                <div className="child">
                  Email: {userInfo?.email}
                </div>
                <div className="child">
                  Имя: {userInfo?.name}
                </div>
                <div className="child">
                  Фамилия: {userInfo?.surename}
                </div>
                <div className="child">
                  Способности: {userInfo?.skills}
                </div>
                <div className="child">
                  Соц сеть:
                  <a href={userInfo.userLink}> {userInfo?.userLink}</a>

                </div>
              </div>
            </div>
          )
        }
        {
          !userInfo && (
            <div className='user'>
              Такого пользователя не существует
            </div>
          )
        }
      </div>
    );
  } else {
    return (
      <div className='user'>
        Необходимо зайти в систему !!!
      </div>
    )
  }

};