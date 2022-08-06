import PageHeaders from "./PageHeaders";
import Temperature from "./Temperature";

export default function TemperaturePage({ forecast, data }) {
    const hour = new Date().getHours()
    const foreday = data.forecast.forecastday[0].day
    return (
        <div className="temp-page">
            <PageHeaders page={"TEMPERATURE"} city={data.location.name} />
            <div style={{ display: "flex" }}>
                <div className="temp-graph">
                    <h1 style={{ fontSize: "48px", margin: "20px" }}>{data.current.temp_c}&deg;</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Today's Average</td>
                                <td>{foreday.avgtemp_c}&deg;</td>
                            </tr>
                            <tr>
                                <td>Maximum</td>
                                <td>{foreday.maxtemp_c}&deg;</td>
                            </tr>
                            <tr>
                                <td>Minimum</td>
                                <td>{foreday.mintemp_c}&deg;</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <div className="temp-graph">
                    <h3>Daily Graph</h3>
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                        {forecast.map((fore, index) => {
                            let value = (fore.temp_c - data.forecast.forecastday[0].day.mintemp_c + 1) * 20
                            return (
                                <div key={index}>
                                    <div className="temps-bar" style={{
                                        width: "20px",
                                        height: `${value}px`,
                                        margin: "2px"
                                    }}>
                                    </div>
                                    {<p style={{ margin: "2px 0 4px", fontSize: "10px" }}>{fore.temp_c}</p>}
                                    <div className="bar-line-h2"></div>
                                    {<p style={{ margin: "2px 0 4px", fontSize: "10px" }}>{index}</p>}
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}