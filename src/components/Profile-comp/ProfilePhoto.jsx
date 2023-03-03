import { useState, useEffect } from 'react'
import { storage, auth } from '../../app/firebase'
import { ref, uploadBytes, list, getDownloadURL } from 'firebase/storage'
import "../CSS/ProfilePhoto.css"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {useAuthState} from 'react-firebase-hooks/auth'

const ProfilePhoto = (props) => {
  const [imageUpLoad, setImageUpLoad] = useState(null)
  const [imageList, setImageList] = useState(null)
  const [user] = useAuthState(auth)

  const uploadImage = () => {
    if (user) {
      const imageRef = ref(storage, `images/profile/${user?.email}/profile`)
      uploadBytes(imageRef, imageUpLoad[0]).then(() => {    
        getDownloadURL(imageRef).then((url) => {
          setImageList(url)
        }).catch(error => { 
          console.log(error.message, 'you get error img url')
        })
        setImageUpLoad(null)
      }).catch(error => {
          console.log(error.message)
      })
    }
  }

  const imageListRef = ref(storage, `images/profile/${user?.email}/`)

  useEffect(() => {
    console.log(imageListRef)
    if (user) {
      list(imageListRef).then((response) => {
        console.log(response)
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList(url)
          })
        })
      })
    }
  }, [user])

  if (user) {
    return(
        <div className='photoProfile'>
            <Avatar
                alt="Remy Sharp"
                src={imageList}
                sx={{ width: 200, height: 200 }}
            />
            <input type="file" 
                onChange={(e) => {
                  setImageUpLoad(e.target.files)
                }}/>
            <button onClick={uploadImage}>Add img</button>
        </div>
    )
  } else {
    return (
      <div>Нужна регистрация пользователя</div>
    )
  }
}

export default ProfilePhoto
