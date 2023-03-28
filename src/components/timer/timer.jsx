import React from 'react';
import { useState, useEffect } from 'react';
import "../CSS/timer.css"

const Timer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = "March 31, 2023, 14:00:00 UTC";

  const getTime = () => {
    
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
     const interval = setInterval(() => getTime(deadline), 1000);

     return () => clearInterval(interval);
  }, []);

  return (
    <div className="timerCclock">
        <div className="time" role="timer">
            <div className="col-4">
                <div className="box">
                  <div className="getTime">
                    <p id="day">{days < 10 ? "0" + days : days}</p>
                  </div>                  
                  <span className="text">ДНЕЙ</span>
                </div>
            </div>
            <div className="col-4">
                <div className="box">
                  <div className="getTime">
                    <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
                  </div>
                  <span className="text">ЧАСОВ</span>
                  
                </div>
            </div>
            <div className="col-4">
                <div className="box">
                  <div className="getTime">
                    <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
                  </div>
                  <span className="text">МИНУТ</span>
                </div>
            </div>
            <div className="col-4">
                <div className="box">
                  <div className="getTime">
                    <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
                  </div>
                  <span className="text">СЕКУНД</span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Timer;