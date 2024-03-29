import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSliders, faLocationDot, faSearch ,faStar} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import AutoCompleteItem from "./AutoCompleteItem"


export default function NavBar({showSideBar, onAutoClick, location,onHamClick,onFavClick,favourites}) {
    const [searchCity, setSearchCity] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [isfav,setIsfav]=useState(false)

    useEffect(()=>{
        setIsfav(Boolean(favourites.find(fav=>fav===location.name)))
    },[location,favourites])
    function handleFavOnClick(){
        setIsfav(fav=>!fav)
    }
    useEffect(()=>{
        onFavClick(location.name,true,isfav)
    },[isfav])
    function handleHamClick() {
        onHamClick()
    }
    function handleInputChange(e) {
        setSearchCity(e.target.value)
    }
    useEffect(() => {
        if (searchCity.length > 2) {
            fetch(`http://api.weatherapi.com/v1/search.json?key=b4bb0f58f9a64179ac1103527221807&q=${searchCity}`)
                .then(r => r.json())
                .then(setSuggestions)
        }
        else{
            setSuggestions([])
        }

    }, [searchCity])
    console.log(suggestions)
    function handleOnAutoClick(place){
        onAutoClick(place)
        setSearchCity("")
    }
    function handlesubmit(e){
        e.preventDefault()
        onAutoClick(suggestions[0].name)
        setSearchCity("")
    }
    //it has a button for settings
    // a city name and an update button that updates the weather data
    // a search form that the user can search a city
    return (
        <div className="nav-bar">
            <div id="settingsButton">
                <FontAwesomeIcon onClick={handleHamClick} className={showSideBar? "settings-icon-clicked" : "settings-icon"} icon={faSliders} />
            </div>
            <div className="city-info">
                <div className="city-text">
                    <FontAwesomeIcon className="loc-dot" icon={faLocationDot} />
                    <h2>{location.name},</h2>
                    <em>{location.country}</em>
                  
                    <FontAwesomeIcon onClick={handleFavOnClick}  className={isfav?"fav-star clicked":"fav-star"}  icon={faStar}/>
                   
                    
                </div>
                <div id="update">
                    <em>{location.localtime}</em>
                </div>
            </div>
            <form onSubmit={handlesubmit} id="navbar-form">
                <input onChange={handleInputChange} value={searchCity} type="text" placeholder="City" />
                <button>
                    <FontAwesomeIcon id="search-icon" icon={faSearch} />
                </button>
               <div className="auto-complete">
               { suggestions.map((suggest,index) => (
                 <AutoCompleteItem place={suggest.name}
                  region={suggest.region}
                  key={index} index={index} onAutoClick={handleOnAutoClick}/>   
                ))}
                
               </div>
            </form>
        </div>
    )
}