import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceGrin,faMaskFace,faFaceSadTear,faFaceGrinTears } from "@fortawesome/free-solid-svg-icons"

import "./App.css";
import NavBar from "./components/NavBar";
import Clouds from "./components/Clouds";
import AirQuality from "./components/AirQuality";
import ForeCast from "./components/Forecast";
import SunMoon from "./components/SunMoon";
import Visibility from "./components/Visibility";
import Temperature from "./components/Temperature";
import Wind from "./components/Wind";
import Settings from "./components/Settings";
import AirQualityPage from "./components/AirQualityPage";
import PrecipitationPage from "./components/PrecipitationPage";

function App() {
  const [alerts, setAlerts] = useState()
  const [place, setPlace] = useState("Nairobi")
  const [data, setData] = useState({})
  const [showSideBar, setShowSideBar] = useState(false)
let airQuality
let defras
  if (data.current) {
    airQuality = data.current["air_quality"]
    defras = {
      no2: airQuality["no2"] / 67,
      so2: airQuality["so2"] / 88,
      pm2_5: airQuality["pm2_5"] / 11,
      pm10: airQuality["pm10"] / 16,
      o3: airQuality.o3 / 33
    }
  }


  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=b4bb0f58f9a64179ac1103527221807&q=${place}&aqi=yes`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.log)
    fetch("http://localhost:9003/userdata")
      .then((r) => r.json())
      .then(console.log)
  }, [place])
  console.log(data)
  //let time = data.forecast ? data.current.last_updated_epoch : "";

  function handleOnAutoClick(place) {
    setPlace(place)
  }
  function handleOnHamClick() {
    setShowSideBar(show => !show)
  }
  function formatAirQ(defra) {
    let aqi = {}
    if (defra < 2) {
        aqi = { defra: defra, summary: "Clean Air", message: "You got to enjoy this!!", image:faFaceGrinTears}
    }
    else if (defra > 1 && defra < 4) {
        aqi = { defra: defra, summary: "Low Pollution", message: "Enjoy the day, the air is good!",image:faFaceGrin }
    } else if (defra > 3 && defra < 7) {
        aqi = {image:faFaceSadTear, defra: defra, summary: "Moderate Pollution", message: "The air is not so cool. If you have lung problems or heart problems, please avoid strenous activities and stay indoors." }
    } else if (defra < 9 && defra > 6) {
        aqi = {image:faMaskFace, defra: defra, summary: "High Pollution", message: "Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors." }
    } else if (defra > 8) {
        aqi = { image:faMaskFace, defra: defra, summary: "Hazardous", message: "Reduce physical exertion, particularly outdoors, especially if you experience symptoms such as cough or sore throat" }
    }
    return aqi
}
  return (
    // <div>
    //  {data.current?<PrecipitationPage  data={data}/>:null} 
    // </div>

    // <div>
    //  {airQuality? <AirQualityPage city={data.location.name} date={data.current.last_updated_epoch} defras={defras} airQuality={airQuality} aqi={formatAirQ(airQuality['gb-defra-index'])}/>:null}
    // </div>
    <div style={{ display: "flex" }}>
     {showSideBar?<Settings alerts={alerts} setAlerts={setAlerts}/>:null} 
      <div>
        <div>
         {data.location?<NavBar onHamClick={handleOnHamClick} showSideBar={showSideBar}  location={data.location} onAutoClick={handleOnAutoClick}/>:null} 
          {data.forecast ? (
            <div className="App">
              <Clouds
                forecast={data.forecast.forecastday}
                current={data.current}
              />
              <AirQuality airQuality={data.current.air_quality} defras={defras} aqi={formatAirQ(airQuality['gb-defra-index'])} />
              <Temperature forecast={data.forecast.forecastday[0].hour} />
              <Wind />
              <Visibility />
              <SunMoon />
              <ForeCast forecastArr={data.forecast.forecastday[0].hour} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  
  )
}

export default App;
