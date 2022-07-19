export default function Clouds(){
    //displays clouds data. raining,snow,cloudy etc
    //displays temperature and wind
    return(
        <div className="col-3">
            <div className="col-2">
                <img className="cloud-icon" src="svg/wi-rain.svg"/>
                <h2>Rain Showers</h2>
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