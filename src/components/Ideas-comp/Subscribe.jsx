import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { doc, collection, query, where, limit, updateDoc, arrayUnion, arrayRemove  } from '@firebase/firestore';
import { database, auth } from '../../app/firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import Button from '@mui/material/Button';
import "../CSS/Subs.css"
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Susbscribe = (props) => {

    const [user] = useAuthState(auth)

    const [subscribeUsers, setSubscribeUsers] = useState([])
    const [showSubs, setShowSubs] = useState(false)
    const [subsUsersCount, setSubsUsersCount] = useState(0)


    useEffect(() => {
        if(user){
            setSubsUsersCount(props.current.subscribe.length)
            setSubscribeUsers(props.current.subscribe)
            if(props.current.subscribe.includes(user.email)){
                setShowSubs(true)
            }else{
                setShowSubs(false)
            }
            const getFormList = async () => {
                try {
                    query(collection(database, "ideas"), where("subscribe", "==", props.current.subscribe), limit(1));
                } catch (error) {
                    console.log(error)
                }
            }
            getFormList()
        }
        
    }, [])

    
    const submitSubs = async () => {        
        if(user){
            if(subscribeUsers.includes(user.email)){
                //console.log(doc(database, "ideas", props.current.id))
                
                await updateDoc(doc(database, "ideas", props.current.id), {
                    ...props.current,
                    subscribe: arrayRemove(user.email)
                }) 
                setShowSubs(false)
                setSubsUsersCount(subsUsersCount - 1)
                setSubscribeUsers(subscribeUsers.splice(subscribeUsers.indexOf(user.email) - 1, 1))
                console.log(setSubscribeUsers(subscribeUsers.splice(subscribeUsers.indexOf(user.email) - 1, 1)))

            }else{
                await updateDoc(doc(database, "ideas", props.current.id), {
                    ...props.current,
                    subscribe: arrayUnion(user.email)
                })
                setShowSubs(true)
                setSubsUsersCount(subsUsersCount + 1)
                setSubscribeUsers([...subscribeUsers, user.email])
                console.log([...subscribeUsers, user.email])

            }
        
        }
    }   




    return(
        <div>
            <Button
                onClick={submitSubs}>
                <Checkbox
                    {...label}
                    icon={<GroupAddOutlinedIcon />}
                    checkedIcon={<GroupAddIcon />}
                    checked={showSubs}
                    onChange={(e) => {
                        setShowSubs(e.target.checked)
                    }}
                />
                <div>
                    {subsUsersCount}
                </div>
            </Button>


            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <Button variant="contained" className='showUsersButton' {...bindTrigger(popupState)}>
                            <div className='users'>
                                {subscribeUsers}
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
                            {subscribeUsers.map((subscribers) => (
                                <Typography sx={{ p: 2, color: 'black' }}>{subscribers}</Typography>
                            ))}
                            
                        </Popover>
                    </div>
                )}
            </PopupState>
        </div>
    )

        
}

export default Susbscribe