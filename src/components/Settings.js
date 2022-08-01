import { to } from "mathjs"
import { useState } from "react"
// import Login from "./Login"

export default function Settings({ alerts, setAlerts }) {
    const [toggles, setToggles] = useState(true)
    const [userInfo,setUserInfo]=useState({imageUrl:"svg/wi-alien.svg"})

    function handleToggleChange(e) {
        // console.log(`${e.target.name}:${e.target.value}`)
        setToggles(toggles=>!toggles)
    }

    function handleOnSignIn(isSuccess,profile){
      setUserInfo(userInfo=>({userInfo,...profile}))
    }
    function handleOnSignOut(isSuccess){

    }
    return (
        <div className="settings">
            <div style={{ display: "flex" }}>
                <div>
                    <div className="avatars">
                        <img src={userInfo.imageUrl} />
                    </div>
                   {userInfo.googleId? <p>{userInfo.name}</p>:null}
                </div>
                {/* <Login onSignIn={handleOnSignIn} onSignOut={handleOnSignOut}/> */}
            </div>
            <h2>Preferences</h2>
            <h3>Temperature</h3>
            <div style={{ display: "flex" }}>
                <p>{toggles ?"Celcius"  :"Fahrenheit" }</p>
                <div onClick={handleToggleChange}>
                    <label className="toggle-switch">
                        <input  onChange={handleToggleChange} value={toggles} id="temp-toggle" type="checkbox" />
                        <span name="temp" onClick={handleToggleChange} className="slider-round"></span>
                    </label>
                </div>

            </div>
            <div className="settings-line"></div>
            <h3>Precipitation</h3>
            <div style={{ display: "flex" }}>
                <p>{toggles ? "inches" : "mm"}</p>
                <div>
                    <label className="toggle-switch">
                        <input name="precip" value={toggles} onChange={handleToggleChange} id="temp-toggle" type="checkbox" />
                        <span className="slider-round"></span>
                    </label>
                </div>

            </div>
            <div className="settings-line"></div>
            <h3>Wind</h3>
            <div style={{ display: "flex" }}>
                <p>{toggles ? "mph" : "km/h"}</p>
                <div>
                    <label className="toggle-switch">
                        <input name="wind" value={toggles} onChange={handleToggleChange} id="temp-toggle" type="checkbox" />
                        <span className="slider-round"></span>
                    </label>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <h3>Alerts</h3>
                <select>
                    <option>Pollution</option>
                    <option>Floods</option>
                    <option>Rain</option>
                    <option>Snow</option>
                    <option>Tsunami</option>
                    <option>High Uv</option>
                </select>
            </div>

        </div>
    )
}