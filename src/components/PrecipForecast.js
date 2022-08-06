import ForecastItem from "./ForecastItem";
import PrecipForecastItem from "./PrecipForecastItem";

export default function PrecipForecast({ forecast, hour,units }) {
    hour = hour > 18 ? 18 : hour
    return (<div className="precbar" style={{ display: "flex" }}>
        {forecast.slice(hour, hour + 6).map((fore, index) => 
        {
            return(
                <div key={index} style={{textAlign:"center"}}>
                    <PrecipForecastItem fore={fore} x={100} hour={index} item={"precip_mm"} />
                    <p>{fore[`precip_${units.precip}`]}{units.precip}</p>
                    <div className="bar-line-h"></div>
                    <p>{fore.time.slice(fore.time.length-5)}</p>
                    <div className="bar-line-h"></div>
                    <ForecastItem  image={`${fore.condition.code}-${fore.is_day}`}/>
                </div>
            )
        })}
    </div>)
}