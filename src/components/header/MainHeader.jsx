import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import "../CSS/MainHeader.css"
import Circle from "../../assets/circle.png"


function MainHeader (){
  /*const [position, setPosition] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true) 
  useEffect(()=> {
      const handleScroll = () => {
         let moving = window.pageYOffset
         
         setVisible(position > moving);
         setPosition(moving)
      };
      window.addEventListener("scroll", handleScroll);
      return(() => {
         window.removeEventListener("scroll", handleScroll);
      })
  })

  const cls = visible ? "hidden" : "visible";*/
  
  return (
    <div>
      <header>
        <img className='circle-img' src={Circle} />
      </header>
    </div>
  )

}   


export default MainHeader