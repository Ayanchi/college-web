import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { doc, collection, query, where, limit, updateDoc, arrayUnion, arrayRemove } from '@firebase/firestore';
import { database, auth } from '../../app/firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Likes = (props) => {

    const [user] = useAuthState(auth)

    const [like, setLike] = useState(false)
    const [likeUsersCount, setLikeUsersCount] = useState(0)
    const [likeUsers, setLikeUsers] = useState([])


    useEffect(() => {
        if(user){
            setLikeUsersCount(props.current.like.length)
            setLikeUsers(props.current.like)
            if(props.current.like.includes(user.email)){
                setLike(true)
            }else{
                setLike(false)
            }
            const getFormList = async () => {
                try {
                    query(collection(database, "ideas"), where("like", "==", props.current.like), limit(1));
                } catch (error) {
                    console.log(error)
                }
            }
            getFormList()
        }
    }, [])

    const submitLiks = async () => {
        if(user){
            if(likeUsers.includes(user.email)){
                await updateDoc(doc(database, "ideas", props.current.id), {
                    ...props.current,
                    like: arrayRemove(user.email)
                })
                console.log(props.current.id)
                setLike(false)
                setLikeUsersCount(likeUsersCount - 1)
                setLikeUsers(likeUsers.splice(likeUsers.indexOf(user.email) - 1, 1))
                console.log(likeUsers)
            }else{
                await updateDoc(doc(database, "ideas", props.current.id), {
                    ...props.current,
                    like: arrayUnion(user.email)
                })
                setLike(true)
                setLikeUsersCount(likeUsersCount + 1)
                // console.log(likeUsers.splice(likeUsers.indexOf(user.email), 1))
                setLikeUsers([...likeUsers, user.email])
            }
            
        }
        
    }

    


    return(
        <div>
            <Button
                onClick={submitLiks}
                className="like"
                >
                <Checkbox {...label} 
                    icon={<FavoriteBorder />} 
                    checkedIcon={<Favorite />} 
                    sx={{'&.Mui-checked': {
                        color: pink[600],
                    }
                    }}
                    checked={like}
                    onClick={(e) => {
                        setLike(e.target.checked)
                    }}
                    
                />
                <div>
                    {likeUsersCount}
                </div>
            </Button>
            
            
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                    <div className='users'>
                        {likeUsers}
                    </div>
                    </Button>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                    >
                        <Typography sx={{ p: 2, color: 'black' }}>{likeUsers}</Typography>
                    </Popover>
                    </div>
                )}
            </PopupState>
            
            
        </div>
    )

        
}

export default Likes