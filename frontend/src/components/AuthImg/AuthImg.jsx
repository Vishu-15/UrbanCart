import './AuthImg.css'
import authImage from '../../assets/images/signup-logo.png'

export default function AuthImg(){
    return(
        <div className="auth-img">
            <img src={authImage} alt="" />
        </div>
    )
}