import { useState, useEffect } from 'react'
import { storage, auth } from '../../app/firebase'
import { ref, uploadBytes, list, getDownloadURL } from 'firebase/storage'
import "../CSS/ProfilePhoto.css"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {useAuthState} from 'react-firebase-hooks/auth'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '45%',
  left: '30%',
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
  //const handleClose = () => setAvatar(false)

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
    setAvatar(true)
 
  }

  const imageListRef = ref(storage, `images/profile/${user?.email}/`)

  useEffect(() => {
    //console.log(imageListRef)
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

  const prePreview = () => {
    uploadImage()
    setAvatar(true)
  }

  const goNext = () =>{
    setAvatar(false)
  }

  const rmPhoto = () => {
    const fileReff = imageListRef.child(`profile`) 
    fileReff.delete()
      .then(() => {
        console.log('File deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      })
  }


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
          <button onClick={prePreview}>Preview photo</button>

          <Modal
            open={avatar}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Avatar
                alt="Remy Sharp"
                src={imageList}
                sx={{ width: 200, height: 200 }}
              />
              <button onClick={goNext}>Add img</button>
              <br />
              <button onClick={rmPhoto}>go back</button>
            </Box>
        </Modal>
    </div>
  )

}

export default ProfilePhoto
