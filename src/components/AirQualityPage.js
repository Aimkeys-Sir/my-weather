import AqiSlider from "./AqiSlider";
import Bars from "./Bars";
import PageHeaders from "./PageHeaders";
 

export default function AirQualityPage({ airQuality, defras, aqi,city,mainPollutant,date }) {

    return (
        <div className="aqi">
           <PageHeaders page={"AIR QUALITY"} city={city} date={date}/>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="p-index">
                    <h4>Pollution Index</h4>
                    <Bars defras={defras} mainPollutant={mainPollutant} />
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