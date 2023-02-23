import MainHeader from "./header/MainHeader"
import "../components/Modal.css"
import Galaxy from "../assets/galaxy.jpg"
import Timer from "./timer/timer"
import Location from "./stages/stage"
import GoogleButtom from "./google-register/Google-buttom"
import { ReactDOM } from "react"

function Modal() {

  return(
    <div className="modal">
        <div className="applyBlock">
            <div className="backgraund-galaxy"
                style={{backgroundPosition: 'center center',
                backgroundImage: `url(${Galaxy})`,
                backgroundSize: 'cover',
                transform: `translate3d(${0}px, ${0}px, ${0}px)`,
                innerHeight: '100%'
            }}>
            </div>
            <div className="MainHeader">
                <MainHeader />
            </div>  
            <div className="timer">
                <div className="stattup-text">
                    <h1>STARTUPОМАНИЯ</h1>
                    <h2>МЕЖДУНАРОДНЫЙ УНИВЕРСИТЕТ АЛА-ТОО</h2>
                </div>
                <Timer />
                <div className="whichDateStart">
                    <span className="time-spending">Время проведения:</span> <br />
                    <span className="time-spending">с 10.03 по 28.04</span>
                </div>
            </div>

            <div className="Apply">
                <div className="addApply">
                    <p className="shark-text">
                        Найди команду и стань акулой бизнеса с нами!
                    </p>
                    <button>ХОЧУ СТАРТАП!</button>
                        <div className="stages">
                            <Location />
                        </div>
                </div>
            </div>
        </div>
        <div className="map">
            <h3>Место проведения</h3>
            <div className="college-text">
                <p className="street">Кыргызстан, г. Бишкек, ул. Анкара 1/8а</p>
                <p className="college">StartUp Hub Международного университета Ала-Тоо</p>
            </div>
            <div className="realMap">
                <iframe 
                    width="770" 
                    height="510" 
                    id="gmap_canvas" 
                    src="https://maps.google.com/maps?q=alatoo university&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                    >
                </iframe>
            </div>
        </div>
    </div>
    )
}

export default Modal