import React, { useState, useEffect } from "react";

function WeatherData() {
    const [data, setData] = useState(0)
    const  [weatherCodes,setWeatherCodes]=useState({})
    useEffect(()=>{
        fetch("https://www.weatherapi.com/docs/weather_conditions.json")
        .then(res=>res.json())
        .then(res=>console.log(res))
    },[])
    useEffect(() => {
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=b4bb0f58f9a64179ac1103527221807&q=Nairobi&aqi=yes`)
            .then(res => res.json())
            .then(res => console.log(res))
    },[])
    return <div></div>
}