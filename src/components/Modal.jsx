import MainHeader from "./header/MainHeader"
import Blue from "../assets/blue.png"
import "../components/Modal.css"


function Modal() {

    return(
        <div>
            <img src={Blue} />
            <div className="MainHeader">
                <MainHeader />
            </div>
        </div>
    )
}

export default Modal