export default function Settings({ handleSettingsChange }) {
    //is a child of navbar
    //switches on whenever you click or hover on the settings button
    return (
        <div className="settings">
            <div className="avatars">
                <img src="svg/wi-alien.svg" />
            </div>
            <p>Username</p>

            <h3>Temperature</h3>
            <div style={{display:"flex"}}>
                  <p>Celcius</p>
                <div>
                    <label class="toggle-switch">
                        <input id="temp-toggle" type="checkbox"/>
                            <span class="slider-round"></span>
                    </label>
                </div>
                
            </div>
            <div className="settings-line"></div>
            <h3>Precipitation</h3>
            <div style={{display:"flex"}}>
                 <p>mm</p>
                <div>
                <label class="toggle-switch">
                        <input id="temp-toggle" type="checkbox"/>
                            <span class="slider-round"></span>
                    </label>
                </div>
               
            </div>
            <div className="settings-line"></div>
            <h3>Wind</h3>
            <div style={{display:"flex"}}>
               <p>km/h</p>
                <div>
                <label class="toggle-switch">
                        <input id="temp-toggle" type="checkbox"/>
                            <span class="slider-round"></span>
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