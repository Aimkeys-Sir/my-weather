import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"



export default function Settings({ onToggleChange, userInfo, handleSave, favourites, alerts, onFavClick, onFavListClick }) {
    const [togglesT, setTogglesT] = useState(true)
    const [togglesW, setTogglesW] = useState(true)
    const [togglesP, setTogglesP] = useState(true)
    const [saved, setSaved] = useState(false)


    useEffect(() => {
        if (userInfo.email) {
            fetch("https://weather-users-api.herokuapp.com/userdata")
                .then(r => r.json())
                .then(entries => {
                    console.log("entries", entries)
                    console.log(userInfo.email);
                    const myEntry = entries.find(entry => entry.user === userInfo.email)
                    if (myEntry) {
                        setTogglesP(myEntry.precip)
                        setTogglesT(myEntry.temp)
                        setTogglesW(myEntry.wind)
                    }

                })
        }
    }, [userInfo])
    useEffect(() => {
        onToggleChange({
            temp: togglesT ? "c" : "f",
            wind: togglesW ? "kph" : "mph",
            precip: togglesP ? "mm" : "in"
        })
    },[togglesP,togglesT,togglesW])
    function handleTempChange(e) {
        setTogglesT(toggles => !toggles)
        onToggleChange({ temp: togglesT ? "f" : "c" })
        setSaved(true)
    }
    function handleWindChange(e) {
        setTogglesW(toggles => !toggles)
        onToggleChange({ wind: togglesW ? "mph" : "kph" })
        setSaved(true)
    }
    function handlePrecipChange(e) {
        setTogglesP(toggles => !toggles)
        onToggleChange({ precip: togglesP ? "in" : "mm" })
        setSaved(true)
    }
    function handleSaveClick() {
        handleSave({ temp: togglesT, precip: togglesP, wind: togglesW })
        setSaved(false)
    }

    return (
        <div className="settings">
            <div style={{ display: "flex" }}>
                <div>
                    <div className="avatars">
                        <img src={userInfo.picture ? userInfo.picture : "svg/wi-alien.svg"} />
                    </div>
                    {userInfo.name ? <p>{userInfo.name}</p> : null}
                </div>
            </div>
            {favourites.length > 0 ? <div>
                <h2>Favourites</h2>
                <ul style={{ margin: "5px 5px 20px" }}>
                    {favourites.map(fav => {
                        return <li key={fav}>
                            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                                <p onClick={() => onFavListClick(fav)}>{fav}</p>
                                <FontAwesomeIcon onClick={() => onFavClick(fav, true, false)} className="clicked list" icon={faStar} />
                            </div>
                        </li>
                    })}
                </ul>
                <div className="settings-line"></div>
            </div> : null}
            <h2 style={{ margin: "20px 5px 5px" }}>Preferences</h2>
            <h3>Temperature</h3>
            <div style={{ display: "flex" }}>
                <p>{togglesT ? "Celcius" : "Fahrenheit"}</p>
                <div >
                    <label className="toggle-switch">
                        <input onChange={handleTempChange} value={togglesT} id="temp-toggle" type="checkbox" />
                        <span className="slider-round"></span>
                    </label>
                </div>

            </div>
            <div className="settings-line"></div>
            <h3>Precipitation</h3>
            <div style={{ display: "flex" }}>
                <p>{togglesP ? "mm" : "inches"}</p>
                <div>
                    <label className="toggle-switch">
                        <input name="precip" value={togglesP} onChange={handlePrecipChange} id="temp-toggle" type="checkbox" />
                        <span className="slider-round"></span>
                    </label>
                </div>

            </div>
            <div className="settings-line"></div>
            <h3>Wind</h3>
            <div style={{ display: "flex" }}>
                <p>{togglesW ? "km/h" : "mph"}</p>
                <div>
                    <label className="toggle-switch">
                        <input name="wind" value={togglesW} onChange={handleWindChange} id="temp-toggle" type="checkbox" />
                        <span className="slider-round"></span>
                    </label>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                {userInfo.email && saved ? <div onClick={handleSaveClick}
                    className="save" style={{ padding: "1px 0 12px", width: "160px", height: "30px", alignItems: "center", textAlign: "center" }}>
                    <h3>Save</h3>
                </div> : null}
                {alerts ? <div style={{ display: "flex" }}>
                    <h3 style={{ color: "#dedede" }}>saved!</h3>
                    <img alt="alert" src="checkmark.png" style={{ filter: "invert(10)", width: "35px", height: "35px" }} />
                </div> : null}
            </div>

        </div>
    )
}