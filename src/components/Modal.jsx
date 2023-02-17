import MainHeader from "./header/MainHeader"
import Registration from "./apply/GetApply"
import Blue from "../assets/blue.png"
import "../components/Modal.css"


function Modal() {

    return(
        <div>
            <img src={Blue} />
            <div className="MainHeader">
                <MainHeader />
                <Registration />
            </div>
        </div>
    )
}

export default Modal