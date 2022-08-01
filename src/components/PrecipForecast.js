import ForecastItem from "./ForecastItem";
import PrecipForecastItem from "./PrecipForecastItem";

export default function PrecipForecast({ forecast, hour }) {
    hour = hour > 18 ? 18 : hour
    console.log(forecast);
    return (<div className="precbar" style={{ display: "flex" }}>
        {forecast.slice(hour, hour + 6).map((fore, index) => 
        {
            console.log(fore.condition.code);
            return(
                <div style={{textAlign:"center"}}>
                    <PrecipForecastItem fore={fore} x={100} hour={index} item={"precip_mm"} key={fore.hour} />
                    <p>{fore.precip_mm}mm</p>
                    <div className="bar-line-h"></div>
                    <p>{fore.time.slice(fore.time.length-5)}</p>
                    <div className="bar-line-h"></div>
                    <ForecastItem image={`${fore.condition.code}${fore.is_day===1?".day":".night"}`}/>
                </div>
            )
        })}
    </div>)
}