import React, { useState } from "react";
import once from "../../assets/stageImg/once.png";
import "../CSS/stage.css"
import StageFirst from "./stage-first";
import StageSecond from "./stage-second";
import StageThird from "./stage-third";

const Location = () => {
  const [imageClicked, setImageClicked] = useState({
    first: false,
    second: false,
    ground: false
  });

  const onClickHandler = (order) => {
    setImageClicked((prevState) => ({
      ...prevState,
      [order]: !prevState[order]
    }));
  };

  return (
    <div>
      <div className="stageContainer">
        <div className="buttonClick">
            <button onClick={() => onClickHandler("ground")} className="ground">
                Этап 1
                <img className={imageClicked.ground ? `arrow active` : `arrow` } src={once} alt="once" />
            </button>

            {imageClicked.ground && <StageFirst />}
        </div>
        <div className="buttonClick">
            <button onClick={() => onClickHandler("first")} className="ground">
                Этап 2
                <img className={imageClicked.first ? `arrow active` : `arrow`} src={once} alt="once" />
            </button>
            {imageClicked.first && <StageSecond />}
        </div>
        <div className="buttonClick">
            <button onClick={() => onClickHandler("second")} className="ground">
                Этап 3
                <img className={imageClicked.second ? `arrow active` : `arrow`} src={once} alt="once" />
            </button>
            {imageClicked.second && <StageThird />}
        </div>
      </div>
      <div className="image"></div>
    </div>
  );
};

export default Location;