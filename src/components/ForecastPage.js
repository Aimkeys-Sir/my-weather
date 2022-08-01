import ForecastItem from "./ForecastItem";
import PageHeaders from "./PageHeaders";

export default function ForecastPage({data}){
    return (
        <div className="fore-page">
            <PageHeaders page={"FORECAST"} city={data.location.name}/>
            <div>
                <div>
                    {data.forecast.forecastday[0].hour.map(fore=>(
                        <ForecastItem />
                    ))}
                </div>
            </div>
        </div>
    )
}