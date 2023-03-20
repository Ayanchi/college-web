import * as React from 'react';
import Delete from '../../assets/deleteIcon.png';
import { doc, deleteDoc } from "firebase/firestore";
import { database } from '../../app/firebase';

export function DeleteIcon(props) {

  async function deleteIdea() {
    await deleteDoc(doc(database, "ideas", props.idea.id))
  }

  return (
    <span className='deleteButton'>
      <img  src={Delete} alt="" onClick={deleteIdea} />
    </span>
  );
};