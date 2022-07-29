import { useState, useEffect } from "react";
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

function App() {
  const [alerts,setAlerts]=useState()
  const [place,setPlace]=useState("Nairobi")
  const [data, setData] = useState({})
  const [showSideBar,setShowSideBar]=useState(false)
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
  let time = data.forecast ? data.current.last_updated_epoch : "";

  function handleOnAutoClick(place){
    setPlace(place)
  }
  function handleOnHamClick(){
    setShowSideBar(show=>!show)
  }
  return (
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
              <AirQuality airQuality={data.current["air_quality"]} />
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
  );
}

export default App;
