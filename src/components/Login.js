
import {GoogleLogin} from "react-google-login"

export default function Login(){
    function googleResponse(r){
        console.log(r)
    }
    return (
        <GoogleLogin 
        clientId=""
        buttonText="Login"
        onSuccess={googleResponse}
        onFailure={googleResponse}
        />
    )
}