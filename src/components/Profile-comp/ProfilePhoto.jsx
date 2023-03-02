import { useState, useEffect } from 'react'
import { storage } from '../../app/firebase'
import { ref, uploadBytes, list, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import "../CSS/ProfilePhoto.css"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { getDoc } from 'firebase/firestore'



const ProfilePhoto = (props) => {


  const [imageUpLoad, setImageUpLoad] = useState(null)
  const [imageList, setImageList] = useState(null)


  const uploadImage = () => {
    console.log(`images/${imageUpLoad.name + uuidv4()}`)
    const imageRef = ref(storage, `images/${imageUpLoad.name + uuidv4()}`)
    uploadBytes(imageRef, imageUpLoad).then(() => {    
      getDownloadURL(imageRef).then((url) => {
        //getDoc((prev) => {...prev, img:url})
        //console.log(imageUpLoad)
        console.log(url)
        setImageList(url)
      }).catch(error => {
        console.log(error.message, 'you get error img url')
      })
    setImageUpLoad(null)
    }).catch(error => {
        console.log(error.message)
    })
  }

  const imageListRef = ref(storage, 'images/')

  useEffect(() => {
    list(imageListRef).then((response) => {
      console.log(response)
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList(url)
        })
      })
    })
  }, [])


    return(
        <div className='photoProfile--'>
            <Avatar
                alt="Remy Sharp"
                src={imageList}
                sx={{ width: 200, height: 200 }}
            />
            <input type="file" 
                onChange={(e) => {
                setImageUpLoad(e.target.files)
                }}/>
            <button onClick={uploadImage} >add img</button>

           
        </div>
    )
}

export default ProfilePhoto