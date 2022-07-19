import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSliders, faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons"


export default function NavBar({ handleSettings, city, handleUpdate }) {
    //it has a button for settings
    // a city name and an update button that updates the weather data
    // a search form that the user can search a city
    return (
        <div className="col-1">
            <div className="city-info">
                <div style={{ display: "flex" }}>
                    <FontAwesomeIcon className="loc-dot" icon={faLocationDot} />
                    <h2 style={{ marginBottom: "2px" }}>Nairobi,KE</h2>
                </div>
                <div id="update">
                    <h3>update</h3>
                </div>
            </div>
            <form>
                <FontAwesomeIcon id="search-icon" icon={faSearch} />
                <input type="text" placeholder=".     City" />
            </form>
            <div id="settingsButton">
                <FontAwesomeIcon className="font-awesome" icon={faSliders} />
            </div>
        </div>
    )
}