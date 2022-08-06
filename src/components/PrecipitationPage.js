import { faDroplet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageHeaders from "./PageHeaders";
import PrecipForecast from "./PrecipForecast";

export default function PrecipitationPage({ data }) {
    const current = data.current
    const hour = new Date().getHours()
    const forecast = data.forecast.forecastday[0].hour[hour]
    const city = data.location.name
    const date = data.current.last_updated_epoch
    let image ="wi-"+ current.condition.code +"-"+current.is_day;

    return (
        <div className="precip-page">
            <PageHeaders page={"PRECIPITATION & CLOUDS"} city={city} date={date} />
            <div>
                <div className="page-content">
                    <div className="precip-content">
                        <div style={{ display: "flex" }}>
                            <FontAwesomeIcon className="precip-icon fonta" icon={faDroplet} />
                            <h3 style={{marginLeft:"-15px"}}>Precipitation</h3>
                        </div>
                        <table>
                            <tbody>
                                 <tr>
                                <td>Amount</td>
                                <td>{current["precip_mm"]} mm</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{current["humidity"]}%</td>
                            </tr>
                            <tr>
                                <td>Dew Point</td>
                                <td>{forecast["dewpoint_c"]}&deg;</td>
                            </tr>
                            <tr>
                                <td>Chances of Rain</td>
                                <td>{forecast.chance_of_rain}%</td>
                            </tr>
                            <tr>
                                <td>Chances of Snow</td>
                                <td>{forecast.chance_of_snow}%</td>
                            </tr> 
                            </tbody>
                          
                        </table>
                    </div>
                    <div className="precip-content">

                        <div style={{display:"flex"}}>
                            <img className="cloud-icon" src={`svg/${image}.svg`} />
                            <h3>Clouds</h3>
                        </div>
                        <table id="clouds-table">
                            <tbody>
                               <tr>
                                <td><strong>sky</strong></td>
                                <td><em>{current.condition.text}</em></td>
                            </tr>
                            <tr>
                                <td>coverage</td>
                                <td><em>{current.cloud}%</em></td>
                            </tr>  
                            </tbody>
                           
                        </table>
                    </div>
                    <div className="precip-content">
                        <h3>Precipitation forecast</h3>
                    <PrecipForecast hour={hour} forecast={data.forecast.forecastday[0].hour}/>
                    </div>
                </div>
            </div>
        </div>
    )
}