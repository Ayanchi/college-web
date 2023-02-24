import * as React from 'react';
import audanse from "../../assets/stageImg/audanse.jpg";

const StageFirst = (props) => {
  return (
    <div className='stage-content'>
      <img src={audanse} alt="ground" className="stage-img" />
    </div>
  );
};
export default StageFirst