import * as React from 'react';
import justFriends from "../../assets/stageImg/justFriends.jpg";
import startUpImg from "../../assets/stageImg/sturtUpImg.png";

const StageSecond = (props) => {
  return (
    <div className='stage-content'>
      <img src={justFriends} alt="first" className="stage-img" />
      <img src={startUpImg} alt="first" className="stage-img" />
    </div>
  );
};
export default StageSecond