import { useState } from "react"

export default function Settings({alerts,setAlerts }) {
    const [toggles,setToggles]=useState({temp:true,precip:true,wind:true})
    function handleToggleChange(e){
        console.log(`${e.target.name}:${e.target.value}`)
        setToggles(toggles=>({...toggles,[e.target.name]:e.target.value}))
    }
    
    return (
        <div className="settings">
            <div className="avatars">
                <img src="svg/wi-alien.svg" />
            </div>
            <p>Username</p>

            <h3>Temperature</h3>
            <div style={{display:"flex"}}>
                  <p>{toggles.temp?"Fahrenheit":"Celcius"}</p>
                <div>
                    <label className="toggle-switch">
                        <input name="temp" onChange={handleToggleChange} value={toggles.temp} id="temp-toggle" type="checkbox"/>
                            <span className="slider-round"></span>
                    </label>
                </div>
                
            </div>
            <div className="settings-line"></div>
            <h3>Precipitation</h3>
            <div style={{display:"flex"}}>
                 <p>{toggles.precip?"inches":"mm"}</p>
                <div>
                <label className="toggle-switch">
                        <input name="precip" value={toggles.precip} onChange={handleToggleChange} id="temp-toggle" type="checkbox"/>
                            <span className="slider-round"></span>
                    </label>
                </div>
               
            </div>
            <div className="settings-line"></div>
            <h3>Wind</h3>
            <div style={{display:"flex"}}>
               <p>{toggles.wind?"mph" :"km/h"}</p>
                <div>
                <label className="toggle-switch">
                        <input name="wind" value={toggles.wind} onChange={handleToggleChange} id="temp-toggle" type="checkbox"/>
                            <span className="slider-round"></span>
                    </label>
                </div>
            </div>
            <div style={{display:"flex"}}>
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