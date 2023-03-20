import * as React from 'react';

export default function ProfileUsers(props) {
    console.log(props.id)

  return (
    <div className='user'>
      {props.id}
    </div>
  );
};