import { useState, useEffect } from "react";
import { faFaceGrin, faMaskFace, faFaceSadTear, faFaceGrinTears } from "@fortawesome/free-solid-svg-icons"

import "./App.css";
import {useLocalStorage,UseDocumentTitle} from './components/customHooks/hooks'
import NavBar from "./components/NavBar";
import Clouds from "./components/Clouds";
import AirQuality from "./components/AirQuality";
import ForeCast from "./components/Forecast";
import SunMoon from "./components/SunMoon";
import Temperature from "./components/Temperature";
import Wind from "./components/Wind";
import Settings from "./components/Settings";
import AirQualityPage from "./components/AirQualityPage";
import PrecipitationPage from "./components/PrecipitationPage";
import TemperaturePage from "./components/TemperaturePage";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import WindPage from "./components/WindPage";
import SunMoonPage from "./components/SunMoonPage";
import ForecastPage from "./components/ForecastPage";
import GoogleOneTapLogin from "react-google-one-tap-login"


function App() {
  const [place, setPlace] = useState("Nairobi")
  const [data, setData] = useState({})
  const [showSideBar, setShowSideBar] = useState(false)
  const [isLogged, setIslogged] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [favs, setFavs] = useState([])
  const [alerts, setAlerts] = useState("")
  const [units,setUnits]=useState({temp:"c",wind:"kph",precip:"mm"})


  UseDocumentTitle('Weather Awesome')


  let airQuality
  let defras
  let mainPollutant
  if (data.current) {
    airQuality = data.current["air_quality"]
    defras = {
      no2: airQuality["no2"] / 67,
      so2: airQuality["so2"] / 88,
      pm2_5: airQuality["pm2_5"] / 11,
      pm10: airQuality["pm10"] / 16,
      o3: airQuality.o3 / 33
    }
    mainPollutant = Object.keys(defras).reduce(((max, item) => {
      let value = defras[item]
      if (value > max.value) max = { ...max, pollutant: item, value: value }
      return max
    }), { pollutant: "", value: 0 })
  }

  function onLoggedSuccess(user) {
    setIslogged(true)
    setUserInfo(user)
    fetch("https://weather-users-api.herokuapp.com/userdata")
      .then(r => r.json())
      .then(entries => {
        let favscities = entries.find(entry => entry.user === user.email)
        if (favscities) setFavs(favscities.favourites)
      })
  }

  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=b4bb0f58f9a64179ac1103527221807&q=${place}&aqi=yes`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.log)
  }, [place])
  function handleUnitsChange(changedUnits){
    setUnits(changedUnits)
  }

  function handleOnAutoClick(place) {
    setPlace(place)
  }
  function handleOnHamClick() {
    setShowSideBar(show => !show)
  }

  useEffect(() => {
    setTimeout(() => {
      setAlerts("")
    }, 2500)
  }, [alerts])

  function handleSave(newData, isCity = false, add = true) {
    console.log(newData, isCity, add)
    fetch("https://weather-users-api.herokuapp.com/userdata")
      .then(r => r.json())
      .then(data => {
        let existing = data.find(entry => entry.user === userInfo.email)
        let cities = existing ? existing.favourites : []
        if (cities.find(city => city === newData) && add) return
        if (!add && Boolean(existing)) {
          cities = cities.filter(city => city !== newData)
          const serverOptions = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              favourites: [...cities]
            })
          }
          fetch(`https://weather-users-api.herokuapp.com/userdata/${existing.id}`, serverOptions)
            .then(r => r.json())
            .then(pat => { setFavs(cities); console.log("Cities patched:", pat) })
            .catch(console.log())
        }
        else if (!add && !existing) {

        }
        if (existing && add) {
          const serverOptions = !isCity ? {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              temp: newData.temp, wind: newData.wind, precip: newData.precip
            })
          } :
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                favourites: [...cities, newData]
              })
            }
          fetch(`https://weather-users-api.herokuapp.com/userdata/${existing.id}`, serverOptions)
            .then(r => r.json())
            .then(r => { isCity ? setFavs(favs => [...favs, newData]) : setAlerts("saved successfully!"); console.log("patched", r) })
        }
        else if (!existing && add) {
          const serverOptions = !isCity ? {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: userInfo.email, ...newData, favourites: [] })
          } :
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ user: userInfo.email, favourites: [newData] })
            }
          fetch("https://weather-users-api.herokuapp.com/userdata", serverOptions)
            .then(r => r.json())
            .then(r => { isCity ? setFavs(favs => [...favs, newData]) : setAlerts("Saved succesifully!"); console.log("Posted", r) })
        }
      })
  }

  function formatAirQ(defra) {
    let aqi = {}
    if (defra < 2) {
      aqi = { defra: defra, summary: "Clean Air", message: "You got to enjoy this!!", image: faFaceGrinTears }
    }
    else if (defra > 1 && defra < 4) {
      aqi = { defra: defra, summary: "Low Pollution", message: "Enjoy the day, the air is good!", image: faFaceGrin }
    } else if (defra > 3 && defra < 7) {
      aqi = { image: faFaceSadTear, defra: defra, summary: "Moderate Pollution", message: "The air is not so cool. If you have lung problems or heart problems, please avoid strenous activities and stay indoors." }
    } else if (defra < 9 && defra > 6) {
      aqi = { image: faMaskFace, defra: defra, summary: "High Pollution", message: "Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors." }
    } else if (defra > 8) {
      aqi = { image: faMaskFace, defra: defra, summary: "Hazardous", message: "Reduce physical exertion, particularly outdoors, especially if you experience symptoms such as cough or sore throat" }
    }
    return aqi
  }
  let wind
  let windM = { summary: "", message: "" }
  if (data.current) {
    wind = data.current.wind_mph
    windM = wind < 1 ? { ...windM, summary: "calm", message: "smoke rises vertically" }
      : wind < 3 ? { ...windM, summary: "Light air", message: "Smoke drifts with air, weather vanes inactive" }
        : wind < 7 ? { ...windM, summary: "Light breeze", message: "Weather vanes active, wind felt on face, leaves rustle" }
          : wind < 12 ? { ...windM, summary: "Gentle breeze", message: "Leaves & small twigs move, light flags extend" }
            : wind < 18 ? { ...windM, summary: "Moderate breeze", message: "Small branches sway, dust & loose paper blows about" }
              : wind < 24 ? { ...windM, summary: "Fresh breeze", message: "Small trees sway, waves break on inland waters" }
                : wind < 31 ? { ...windM, summary: "Strong breeze", message: "Large branches sway, umbrellas difficult to use" }
                  : wind < 38 ? { ...windM, summary: "Moderate gale", message: "Whole trees sway, difficult to walk against wind" }
                    : wind < 46 ? { ...windM, summary: "Fresh gale", message: "Twigs broken off trees, walking against wind very difficult" }
                      : wind < 54 ? { ...windM, summary: "Strong gale", message: "Slight damage to buildings, shingles blown off roof" }
                        : wind < 63 ? { ...windM, summary: "Whole gale", message: "Trees uprooted, considerable damage to buildings" }
                          : wind < 73 ? { ...windM, summary: "Storm", message: "Widespread damage, very rare occurrence" }
                            : { ...windM, summary: "Hurricane", message: "Violent destruction" }
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/temperature">
          {data.forecast ? <TemperaturePage units={units} data={data} forecast={data.forecast.forecastday[0].hour} /> : null}
        </Route>
        <Route exact path="/aqi">
          {airQuality ? <AirQualityPage mainPollutant={mainPollutant} city={data.location.name} date={data.current.last_updated_epoch} defras={defras} airQuality={airQuality} aqi={formatAirQ(airQuality['gb-defra-index'])} /> : null}
        </Route>
        <Route path="/precipitation">
          {data.current ? <PrecipitationPage units={units} data={data} /> : null}
        </Route>
        <Route path={"/wind"}>
          {data.current ? <WindPage units={units} wind={windM} data={data} /> : null}
        </Route>
        <Route path={"/astro"}>
          {data.current ? <SunMoonPage data={data} /> : null}
        </Route>
        <Route path={"/forecasts"}>
          {data.forecast ? <ForecastPage units={units} data={data} /> : null}
        </Route>
        <Route exact path="/">
          <div style={{ display: "flex" }}>
            {!isLogged ? <GoogleOneTapLogin onSuccess={onLoggedSuccess}
              onError={() => alert(" Login Failed! /n Please refresh the page. ")}
              googleAccountConfigs={{ client_id: "399114662979-8akjgk6e9fmmp1041doa7a8j9kvim6pv.apps.googleusercontent.com" }} /> : null}
            {showSideBar ? <Settings onToggleChange={handleUnitsChange} onFavListClick={handleOnAutoClick} onFavClick={handleSave} alerts={alerts} favourites={favs} handleSave={handleSave} userInfo={userInfo} /> : null}
            <div>
              <div>
                {data.location ? <NavBar favourites={favs} onFavClick={handleSave} data={data} onHamClick={handleOnHamClick} showSideBar={showSideBar} location={data.location} onAutoClick={handleOnAutoClick} /> : null}
                {data.forecast ? (
                  <div className="App">
                    <Clouds
                    units={units}
                      forecast={data.forecast.forecastday}
                      current={data.current}
                    />
                    <AirQuality airQuality={data.current.air_quality} mainPollutant={mainPollutant} aqi={formatAirQ(airQuality['gb-defra-index'])} />
                    <Temperature units={units} forecast={data.forecast.forecastday[0].hour} />
                    <Wind units={units} wind={windM} current={data.current} forecast={data.forecast.forecastday[0].hour} />
                    <SunMoon data={data} />
                    <ForeCast units={units} current={data.current} forecastArr={data.forecast.forecastday[0].hour} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
