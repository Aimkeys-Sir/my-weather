export default function Clouds({current,forecast}){
    //displays clouds data. raining,s
    const currrentItems=Object.keys(current).filter(item=>item==="Humidity"||item==="precip_mm"||item==="feelslike_c")
    .map(item=>[[item],current[item]])
    const forecastItems=Object.keys(forecast).filter(item=>item==="daily_chance_of_rain"||item==="daily_chance_of_snow" ||item==="maxtemp_c")
    .map(item=>[[item],current[item]])

    
    return(
        <div className="col-3">
            <h2>PRECIPITATION</h2>
            <div className="col-2">
                <img className="cloud-icon" src="svg/wi-rain.svg"/>
                <h1>{current["precip_mm"]}</h1>
                <h4>Monday, 18 July</h4>
            </div>
            <div className="col-2">
                <h1>20&deg;C</h1>
                <h4>Feels like 23&deg;C</h4>
                <img className="wind-icon" src="svg/wi-day-windy.svg"/>
            </div>
        </div>
    )
}