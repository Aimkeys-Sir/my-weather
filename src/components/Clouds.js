export default function Clouds({ current, forecast }) {
    let image = current.condition.code;
    image += current.is_day === 0 ? ".night" : ".day";
    const hour = new Date().getHours()
    return (
        <div className="col col-3">
            <h3>PRECIPITATION</h3>
            <div style={{ display: "flex" }}>
                <div className="precip-div">
                    <div>
                        <img className="precip-icon" src="svg/wi-raindrop.svg" />
                    </div>
                    <h1>{current["precip_mm"]}</h1>
                    <h3 style={{ marginTop: "45px", marginLeft: "-2px" }}>mm</h3>
                </div>
                <div className="precip-cloud-div">
                    <div>
                        <img className="cloud-icon" src={`svg/${image}.svg`} />
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
                            <img src="svg/wi-raindrops.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3>{current["humidity"]}%</h3>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="p-icons-div">
                            <img src="svg/wi-raindrop.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3>{forecast[0].hour[hour]["dewpoint_c"]}&deg;</h3>
                            <p>Dew Point</p>
                        </div>
                    </div>
                </div>
                <div className="precipitation-div">
                    <div style={{ display: "flex" }}>
                        <div className="p-icons-div">
                            <img style={{ transform: "rotate(45deg)" }} src="svg/wi-umbrella.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3>{forecast[0].day["daily_chance_of_rain"]}%</h3>
                            <p>Chances</p>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="p-icons-div">
                            <img src="svg/wi-hot.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3>Sauna</h3>
                            <p>Feels like</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}