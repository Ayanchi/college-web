import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { pink } from '@mui/material/colors';
import { setDoc, doc } from '@firebase/firestore';
import { database, auth } from '../../app/firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const SubsLiks = () => {

    const [user] = useAuthState(auth)

    const generateLikes = () => {
        useEffect(() => {
            setDoc(doc(database, 'ideas', user.uid),
                {
                    ...tec,
                    like: [...tec.like, user.email]
                })
        })
    }


    return (
        <div>
            <Checkbox {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                sx={{
                    '&.Mui-checked': {
                        color: pink[600],
                    }
                }}
                onClick={generateLikes}
            />
            <Checkbox
                {...label}
                icon={<BookmarkBorderIcon />}
                checkedIcon={<BookmarkIcon />}
            />
        </div>
    )
}

export default SubsLiks