import * as React from 'react';
import Delete from '../../assets/delete.png';
import { doc, deleteDoc } from "firebase/firestore";
import { database } from '../../app/firebase';
import {AllUserIdeas} from './MyIdeas'

export function DeleteIcon(props) {
  const [ideas, setIdeas] = React.useContext(AllUserIdeas);

  async function deleteIdea() {
      await deleteDoc(doc(database, "ideas", props.idea.id))
      for(let i = 0; i < ideas.length; i++) {
        if (ideas[i].id === props.idea.id) {
          const new_ideas = ideas
          new_ideas.splice(i, 1)
          setIdeas([...new_ideas])
        }
      }
  }

  return (
    <span>
      <img style={{width: '30px'}} src={Delete} alt="" onClick={deleteIdea}/>
    </span>
  );
};