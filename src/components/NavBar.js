import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSliders, faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons"


export default function NavBar({ handleSettings, city, handleUpdate }) {
    //it has a button for settings
    // a city name and an update button that updates the weather data
    // a search form that the user can search a city
    return (
        <div className="nav-bar">
            <div id="settingsButton">
                <FontAwesomeIcon className="settings-icon-clicked" icon={faSliders} />
            </div>
            <div className="city-info">
                <div className="city-text">
                    <FontAwesomeIcon className="loc-dot" icon={faLocationDot} />
                    <h2>Nairobi,KE</h2>
                </div>
                <div id="update">
                    <p>update</p>
                </div>
            </div>
            <form id="navbar-form"> 
                <input type="text" placeholder="City" />
                <button>
                    <FontAwesomeIcon id="search-icon" icon={faSearch} />
                </button>
            </form>
        </div>
    )
}