import { useState, useEffect } from 'react';
import './App.css';
import WeatherData from './components/WeatherData';
import NavBar from './components/NavBar';
import Clouds from './components/Clouds'
import AirQuality from './components/AirQuality';
import ForeCast from './components/Forecast';
import SunMoon from './components/SunMoon';
import Visibility from './components/Visibility';
import Temperature from './components/Temperature';
import SunUv from './components/SunUv';
import Wind from './components/Wind';

function App() {
  const [data, setData] = useState({})
  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=b4bb0f58f9a64179ac1103527221807&q=Nairobi&aqi=yes`)
      .then(res => res.json())
      .then(res => {
        setData(res)
      })
      fetch("http://localhost:9003/userdata")
      .then(r=>r.json())
      .then(data=>console.log(data.aimkeys))
  }, [])
  console.log(data)
  let time = data.forecast ? data.current.last_updated_epoch : ""

  return (
    <div>
      <div>
        <NavBar />
        {data.forecast?<div className='App'>
          <Clouds forecast={data.forecast.forecastday} current={data.current} />
          <AirQuality airQuality={data.current["air_quality"]} /> 
         <Temperature forecast={data.forecast.forecastday[0].hour}/>
          <Wind/> 
          <Visibility/>
          <SunMoon/>
          <SunUv/>
        </div>:null}
      </div>
     </div> )
}

      export default App;
