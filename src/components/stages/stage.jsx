import React, { useState } from "react";
import audanse from "../../assets/stageImg/audanse.jpg";
import justFriends from "../../assets/stageImg/justFriends.jpg";
import moneyStrasture from "../../assets/stageImg/moneyStrasture.jpg";
import startUpImg from "../../assets/stageImg/sturtUpImg.png";
import once from "../../assets/stageImg/once.png";
import double from "../../assets/stageImg/double.png"
import "../CSS/stage.css"

const Location = () => {
  const [imageClicked, setImageClicked] = useState({
    first: false,
    second: false,
    ground: false,
    once: true,
    double: false
  });

  const onClickHandler = (order) => {
    setImageClicked((prevState) => ({
      ...prevState,
      [order]: !prevState[order]
    }));
    if(imageClicked.order == false){
      imageClicked.once
    }else{
      imageClicked.double
    }
    
  };

  return (
    <div>
      <div className="Ccontainer">
        <div className="buttonClick">
            <button onClick={() => onClickHandler("ground")} className="ground">
                Ground Floor
            </button>
            
            {imageClicked.once && <img src={once} alt="once" />}
            {imageClicked.double && <img src={double} alt="double" />}
            <div className="border"></div>


            {imageClicked.ground && <img src={audanse} alt="ground" className="stage-img" />}
        </div>
        <div className="buttonClick">
            <button onClick={() => onClickHandler("first")} className="ground">
                First Floor
            </button>
            <div className="border"></div>
            {imageClicked.first && <img src={justFriends} alt="first" className="stage-img" />}
            {imageClicked.first && <img src={startUpImg} alt="first" className="stage-img" />}
        </div>
        <div className="buttonClick">
            <button onClick={() => onClickHandler("second")} className="ground">
                Second Floor
            </button>
            <div className="border"></div>
            {imageClicked.second && <img src={moneyStrasture} alt="second" className="stage-img" />}
        </div>
      </div>
      <div className="image"
       >
        
        
        
      </div>
    </div>
  );
};

export default Location;