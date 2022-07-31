import AqiSlider from "./AqiSlider";
import Bars from "./Bars";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLocationDot} from "@fortawesome/free-solid-svg-icons"
 

export default function AirQualityPage({ airQuality, defras, aqi,city,time,date }) {
    console.log(airQuality)
    const dates=Date(date)
    return (
        <div className="aqi">
            <div className="aqi-head">
                <h2>AIR QUALITY </h2>
                <div style={{display:"flex"}}>
                    <FontAwesomeIcon style={{margin:"28px 5px 0"}} icon={faLocationDot}/>
                   <h2>{city}</h2>     
                </div>
  
                <div>
                    <h3>{dates.slice(0,15)}</h3>
                    <p>{dates.slice(15,21)}</p>
                </div>
                
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="p-index">
                    <h4>Pollution Index</h4>
                    <Bars defras={defras} />
                </div>
                <div>
                    <table className="polls">
                        <thead>
                            <tr>
                                <th>Pollutant</th>
                                <th>Amount(μg/m3)</th>
                                <th>Pollution Index</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(airQuality).filter(key => !key.includes("index")).map(key => {
                                return (
                                    <tr>
                                        <td>{key.toUpperCase()}</td>
                                        <td>{Math.round(airQuality[key])}</td>
                                        <td>{key === "co" ? "0" : defras[key]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="defra-info">
                    <h3>summary: {aqi.summary}</h3>
                    <p>{aqi.message}</p>
                    <AqiSlider defra={airQuality["gb-defra-index"]} />
                    <p>Index(GB):{airQuality['gb-defra-index']}</p>
                    <p>Index(USA):{airQuality["us-epa-index"]}</p>
                </div>

            </div>

        </div>
    )
}