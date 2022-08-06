import { useHistory } from "react-router-dom";


export default function Clouds({ current, forecast,units }) {
    let image = "wi-"+current.condition.code +"-"+current.is_day;


    const hour = new Date().getHours()
    const history=useHistory()
    function handleClick(){
        history.push("/precipitation")
    }

    return (
        <div onClick={handleClick} className="col col-3">
           <h3>PRECIPITATION</h3>
            <div style={{ display: "flex" }}>
                <div className="precip-div">
                    <div>
                        <img alt="precipitation" className="precip-icon" src="svg/wi-raindrop.svg" />
                    </div>
                    <h1>{current[`precip_${units.precip}`]}</h1>
                    <h3 style={{ marginTop: "45px", marginLeft: "-2px" }}>{units.precip}</h3>
                </div>
                <div className="precip-cloud-div">
                    <div>
                        <img alt="cloud" className="cloud-icon" src={`svg/${image}.svg`} />
                    </div>
                    <div>
                        <h3>{current.condition.text}</h3>
                        <p style={{ margin: "0 0 0 14px" }}>{current.cloud}%</p>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex" }}>
                <div className="precipitation-div">
                    <div style={{ display: "flex" }}>
                        <div className="p-icons-div">
                            <img alt="humid" src="svg/wi-raindrops.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3> {current["humidity"]}%</h3>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="p-icons-div">
                            <img alt="dew" src="svg/wi-raindrop.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3>{forecast[0].hour[hour][`dewpoint_${units.temp}`]}&deg; {units.temp.toUpperCase()}</h3>
                            <p>Dew Point</p>
                        </div>
                    </div>
                </div>
                <div className="precipitation-div">
                    <div style={{ display: "flex" }}>
                        <div className="p-icons-div">
                            <img alt="umbrella" style={{ transform: "rotate(45deg)" }} src="svg/wi-umbrella.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3>{forecast[0].day["daily_chance_of_rain"]}%</h3>
                            <p>Chances</p>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="p-icons-div">
                            <img alt="precip" src="svg/wi-hot.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3>{current[`feelslike_${units.temp}`]}&deg; {units.temp.toUpperCase()}</h3>
                            <p>Feels like</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}