import { async } from '@firebase/util';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database, storage } from '../../app/firebase'
import { getDocs, collection, query, where, doc } from "firebase/firestore"
import profile_foto from '../../assets/DefaultUser.png'
import Avatar from '@mui/material/Avatar';
import { ref, list, getDownloadURL } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '../Profile-comp/ProfileUsers.css'





export default function ProfileUsers(props) {
    
    const [user] = useAuthState(auth)
    const [userInfo, setUserInfo] = useState([])
    const [photoInfo, setPhotoInfo] = useState([])
    const [email, setEmail] = useState([])
    const imageListRef = ref(storage, `images/profile/${user?.email}`)
    const [imageList, setImageList] = useState(null)
    //console.log(props.id)




    // useEffect(() => {
    //   const getFormlist = async (user) => {
    //     try{

          
    //         setUserInfo(filterForm)
            
    //       }
    //     }catch (error){
    //       console.log(error)
    //     }
    //   }
    //   getFormlist()
    // }, [user])

    useEffect(() => {
      if (user) {
          list(imageListRef).then((response) => {
              response.items.forEach((item) => {
                  getDownloadURL(item).then((url) => {
                      setImageList(url)
                  })
              })
          })
      }
    }, [user])

    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
          if (user) {
              getFormList(user)
          }
      });
    }, [])


    const getFormList = async () => {
        try {
            if (user) {
              setEmail(props.id)
              console.log(email)
              const q = query(collection(database, "ideas"), where('author', '==', user.email));
              const data = await getDocs(q)
              const filterForm = data.docs.map(async (doc) => {
                const data = doc.data()
                let url
                try {
                    const imageRef = ref(storage, `images/profile/${data.author}/profile`)
                    url = await getDownloadURL(imageRef)
                } catch(err) {
                    url = profile_foto
                }
                

                return {
                    ...data,
                    id: doc.id,
                    imageUser: url
                }
              });

              const result = await Promise.all(filterForm)

              setPhotoInfo(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      const getFormList = async () => {
          try {
              const q = query(collection(database, "users"), where('email', '==', user.email));
              const data = await getDocs(q)
              const filterForm = data.docs.map((doc) => ({
                  ...doc.data(),
                  id: doc.id,
              }))
              //console.log(filterForm)
              setUserInfo(filterForm)
          } catch (error) {
              console.log(error)
          }
      }
      getFormList()
    }, [])




  return (
    <div className='user'>
     
      <div className="userPhoto">
        {photoInfo.map((item) => (
          <div className="photo" key={item.id}>
            <Avatar
              alt="Remy Sharp"    
              src={item.imageUser}
              sx={{ width: 200, height: 200 }}
            />
          </div>
        ))}
        <div className="autor">
          Автор  {props.id}
        </div>
      </div>
        

      {userInfo.map((elem) => (
        <div className="content" key={elem.id}>
          <div className="child">
            Email: {elem.email}
          </div>
          <div className="child">
            Имя: {elem.name}
          </div>
          <div className="child">
            Фамилия: {elem.surename}
          </div>
          <div className="child">
            Способности: {elem.skills}
          </div>

        </div>
      ))} 
      

    </div>
  );
};