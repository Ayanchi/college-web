import "../components/Modal.css"
import Timer from "./timer/timer"
import Location from "./stages/stage"
import {Link} from 'react-router-dom'
import GoogleButtom from "./google-register/Google-buttom"
import {ModalContext} from '../App'
import {useContext, useState, useEffect} from 'react'
import { SocialIcon } from 'react-social-icons';
import {getDocs, collection} from 'firebase/firestore'
import { database } from "../app/firebase"
import profile from '../assets/profile.png'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../app/firebase"
import logo_site from "../assets/logo_site.png"

function Modal() {
    const [modal, setModal] = useContext(ModalContext)
    const [users, setUsers] = useState(0)

    const [user] = useAuthState(auth);

    useEffect(() => {
        try {
            getDocs(collection(database, "users"))
                .then(responce => {
                    setUsers(responce?.docs?.length ? responce?.docs?.length : 0)
                })
        } catch(err) {
            console.log(err)
        }
    }, [])

  return(
    <div className="modal">
        <div className="applyBlock">
            <div className="backgraund-galaxy"
                style={{backgroundPosition: 'center center',
                backgroundSize: 'cover',
                transform: `translate3d(${0}px, ${0}px, ${0}px)`,
                innerHeight: '100%'
                }}>
            </div>
            
            <div className="timer">
                <div className="stattup-text">
                    
                    <img src={logo_site} style={{maxWidth: '100%'}} alt="STARTUPОМАНИЯ" />
                    
                </div>
                <div className="obshug">
                    <Timer />
                    
                    <div className="whichDateStart">
                        <span className="time-spending">ВРЕМЯ ПРОВЕДЕНИЯ:<br/></span> 
                        <span className="time-spending">C 17.03 ПО 28.04</span>
                    </div>
                    <div className="wonnaStartUp">
                        <GoogleButtom/>
                    </div>
                </div>
                
            </div>

            <div className="footer">
                <div className="hub">
                    <SocialIcon url="https://instagram.com/startupomania" bgColor="#b2ff00"/>
                    <SocialIcon url="https://www.tiktok.com/@alatoostartupomania" bgColor="#b2ff00"/>
                    <SocialIcon url="https://t.me/+qwojtIWrwjQ3YmIy" bgColor="#b2ff00"/>
                </div>
            </div>

            <div className="count-users">
                Количество зарегистрированных пользователей: {users}
            </div>

            {/* <div className="Apply">
                <div className="addApply">
                    <p className="shark-text">
                        Найди команду и стань акулой бизнеса c нами!
                    </p>
                    <div className="stages">
                        <Location />
                    </div>
                </div>
            </div> */}
        </div>
        {/* <div className="map">
            <h3>Место проведения</h3>
            <div className="college-text">
                <p className="street">Кыргызстан, г. Бишкек, ул. Анкара 1/8а</p>
                <p className="college">StartUp Hub Международного университета Ала-Тоо</p>
            </div>
            <div className="realMap">
                <iframe 
                    width="100%" 
                    height="400" 
                    id="gmap_canvas" 
                    src="https://maps.google.com/maps?q=alatoo university&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                    >
                </iframe>
            </div>
        </div>
        <div className="preFooter">
            <div className="noTeamNotBad">
                <p className="noTeam">
                    Нет команды не беда. Мы поможем.
                </p>
                <div className="wonnaTeam-button">
                    <a onClick={() => setModal(true)} href="#" aria-label="Хочу найти команду">
                        Хочу найти команду
                    </a>
                </div>
            </div>
        </div>
        <div className="footer">
            <div className="hub">
                AIU STARTUP HUB 
            </div>
        </div> */}

        {user && (
            <div className="profile">
                <Link to="/college-web/profile">
                    <img src={profile} alt="" />
                </Link>
            </div>
        )} 
        

    </div>
    )
}

export default Modal