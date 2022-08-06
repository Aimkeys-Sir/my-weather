import ForecastItem from "./ForecastItem";
import PageHeaders from "./PageHeaders";

export default function ForecastPage({data,units}){
    return (
        <div className="fore-page">
            <PageHeaders page={"FORECAST"} city={data.location.name}/>
            <div>
                <div style={{ margin:"auto 0 0 20px",display: "flex", flexWrap: "wrap" }}>
                    {data.forecast.forecastday[0].hour.map(fore=>(
                        <ForecastItem time={fore.time} temp={fore[`temp_${units.temp}`]} image={`${fore.condition.code}-${fore.is_day}`}/>
                    ))}
                </div>
            </div>
        </div>
    )
}