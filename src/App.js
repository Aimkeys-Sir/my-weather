import { useState, useEffect } from 'react';
import './App.css';
import WeatherData from './components/WeatherData';
import NavBar from './components/NavBar';
import Clouds from './components/Clouds'
import AirQuality from './components/AirQuality';
import ForeCast from './components/Forecast';

function App() {
  const [data, setData] = useState({})
  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=b4bb0f58f9a64179ac1103527221807&q=Nairobi&aqi=yes`)
      .then(res => res.json())
      .then(res => setData(res))
  }, [])
  let time = data.forecast ? data.current.last_updated_epoch : ""
  // time=time.substr(time.length-5,time.length)
  console.log(data)
  return (
    <div className="App">
      <div style={{ width: "66.7%" }}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <Clouds />
         {data.current? <AirQuality airQuality={data.current["air_quality"]}/>:null}
        </div>
      </div>
      {data.forecast ? <ForeCast forecastArr={data.forecast.forecastday[0].hour.filter(item => item.time_epoch > time)} /> : null}
    </div>
  );
}

export default App;
