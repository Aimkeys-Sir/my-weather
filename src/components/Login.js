
import { useState } from "react"
import { GoogleLogin,GoogleLogout } from "react-google-login"
const clientId="399114662979-8akjgk6e9fmmp1041doa7a8j9kvim6pv.apps.googleusercontent.com"
export default function Login({onSignIn,onSignOut}) {

    const[showLogin,setShowLogin]=useState(true)
    const [showLogout,setShowLogout]=useState(false)

    function handleOnLoginSuccess(r) {
        console.log("login successful: ",r.profileObj)
        onSignIn(true,r.profileObj)
        setShowLogin(show=>!show)
        setShowLogout(show=>!show)
    }
    function handleOnLoginFailure(r) {
       onSignIn(false)
        console.log("Login failed:",r)
    }
    function logout(){ 
        onSignOut(true)
        alert("Signed out successifully")
        setShowLogin(show=>!show)
        setShowLogout(show=>!show)
    }
    return (
        <div className="g-signin">
            {showLogin?  <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={handleOnLoginSuccess}
                onFailure={handleOnLoginFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />:null}
          
            {/* {document.getElementById("googleButton")} */}
            {showLogout?<GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>:null}
            
        </div>

    )
}