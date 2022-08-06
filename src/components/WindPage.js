import { faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageHeaders from "./PageHeaders";

export default function WindPage({ data,wind,units }) {
    const hour = new Date().getHours()
    const h = hour < 18 ? hour : 18
    const daily=data.forecast.forecastday[0].day
    return (
        <div className="wind-page">
            <PageHeaders date={data.current.last_updated_epoch} page={"WIND"} city={data.location.name} />
            <div style={{ display: "flex" }}>
                <div>
                    <div className="wind-content">
                        <div style={{ display: "flex" }}>
                            <FontAwesomeIcon style={{ fontSize: "36px", color: "#fd8efd", margin: "0 0 0 20px" }} icon={faWind} />
                            <h3>{data.current[`wind_${units.wind}`]}{units.wind}</h3>
                        </div>
                        <table>
                            <tr>
                                <td>Speed</td>
                                <td>{data.current[`wind_${units.wind}`]}{units.wind}</td>
                            </tr>
                            <tr>
                                <td>Gusts</td>
                                <td>{data.current[`gust_${units.wind}`]}{units.wind}</td>
                            </tr>
                            <tr>
                                <td>Direction</td>
                                <td>{data.current.wind_degree}&deg;, {data.current.wind_dir}</td>
                            </tr>
                            <tr>
                                <td>Chill</td>
                                <td>{data.forecast.forecastday[0].hour[hour][`windchill_${units.temp}`]}&deg; {units.temp.toUpperCase()}</td>
                            </tr>
                        </table>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="wind-content">
                    <h2>Forecasts</h2>
                    <div style={{ display: "flex", alignItems: "baseline", textAlign:"left" }}>
                        {data.forecast.forecastday[0].hour.slice(h, h + 6).map(fore => {
                            const height = fore.wind_kph * 8
                            return (
                                <div>
                                    <div className="wind-bar" style={{ width: "35px", height: `${height}px`, margin: "2px" }}>
                                    </div>
                                    <p style={{margin:"auto"}}>{fore[`wind_${units.wind}`]}{units.wind}</p>
                                    <div style={{width:"70px"}} className="bar-line-h"></div>
                                    <p style={{margin:"auto 0"}}>{fore.time.slice(fore.time.length-5)}</p>
                                </div>

                            )
                        })}
                    </div>
                </div>
                <div className="wind-content">
                    <h3>{wind.summary}</h3>
                    <p>{wind.message}</p>
                    <table>
                        <tr style={{textAlign:"left"}}>
                            <td style={{border:"none",fontSize:"20px"}}>Max</td>
                            <td style={{border:"none"}}>{daily[`maxwind_${units.wind}`]}{units.wind}</td>
                        </tr>
                    </table>
                    </div>
            </div>
        </div>
    )
}