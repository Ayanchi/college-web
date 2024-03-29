import { useState, useEffect } from 'react'
import { storage, auth } from '../../app/firebase'
import { ref, uploadBytes, list, getDownloadURL, deleteObject } from 'firebase/storage'
import "../CSS/ProfilePhoto.css"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {useAuthState} from 'react-firebase-hooks/auth'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const ProfilePhoto = (props) => {
  const [imageUpLoad, setImageUpLoad] = useState(null)
  const [imageList, setImageList] = useState(null)
  const [user] = useAuthState(auth)
  const [avatar, setAvatar] = useState(false)
  const [loadImage, setLoadImage] = useState(false)

  const imageListRef = ref(storage, `images/profile/${user?.email}/`)

  const uploadImage = () => {
    if (user && user.email) {
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
      setAvatar(false)
    }
  }

  const deleteImage = () => {
    if (user && user.email) {
      const imageRef = ref(storage, `images/profile/${user?.email}/profile`)
      deleteObject(imageRef).then(() => {
        alert('обновите страницу')
      }).catch((error) => {
        console.log('error')
      })
    }
  }

  useEffect(() => {
    if (user && user.email) {
      list(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList(url)
          })
        })
      })
    }
  }, [user])

  const prePreview = () => {
    setAvatar(true)
  }

  return(
      <div className='photoProfile'>
        <Avatar
            alt="Remy Sharp"
            src={imageList}
            sx={{ width: 200, height: 200 }}
        />
        <button className="b-center b-block focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
           onClick={prePreview}>Редактировать изображение</button>
        <button onClick={deleteImage}> Удалить изображение </button>
        <Modal
          open={avatar}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>

          <button className="closebuttonIdea" onClick={() => setAvatar(false)}>X</button >

            <Avatar
              alt="Remy Sharp"
              src={loadImage? loadImage : imageList}
              sx={{ width: 200, height: 200 }}
            />
              <label htmlFor="files" className="btn">Выбрать изображение</label>
              <input id="loadImage" type="file" name="files" 
                onChange={(e) => {
                  setImageUpLoad(e.target.files)
                  const file = document.getElementById("loadImage").files[0];
                  const reader = new FileReader();

                  reader.addEventListener('load', () => {
                    setLoadImage(reader.result)
                  });

                  if (file) {
                    reader.readAsDataURL(file);
                  }
                }}/>
              
              <button 
               className=" b-center b-block focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
               onClick={uploadImage}
               >Сохранить</button>
          </Box>
      </Modal>
    </div>
  )

}

export default ProfilePhoto
