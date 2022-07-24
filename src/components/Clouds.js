export default function Clouds({ current, forecast }) {
    //displays clouds data. raining,s
    const currrentItems = Object.keys(current).filter(item => item === "Humidity" || item === "precip_mm" || item === "feelslike_c")
        .map(item => [[item], current[item]])
    const forecastItems = Object.keys(forecast).filter(item => item === "daily_chance_of_rain" || item === "daily_chance_of_snow" || item === "maxtemp_c")
        .map(item => [[item], current[item]])


    return (
        <div className="col col-3">
            <h3>PRECIPITATION</h3>
            <div className="precip-div">
                <div>
                    <img className="cloud-icon" src="svg/wi-raindrop.svg" />
                </div>
                <h1>{current["precip_mm"]}</h1>
                <h3 style={{ marginTop: "45px", marginLeft: "-2px" }}>mm</h3>
            </div>
            <div style={{display:"flex"}}>
                <div  className="precipitation-div">
                    <div style={{ display: "flex" }}>
                        <div className="p-icons-div">
                            <img src="svg/wi-raindrops.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3>68%</h3>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="p-icons-div">
                            <img src="svg/wi-raindrop.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3>14&deg;</h3>
                            <p>Dew Point</p>
                        </div>
                    </div>
                </div>
                <div className="precipitation-div">
                    <div style={{ display: "flex" }}>
                        <div className="p-icons-div">
                            <img style={{transform:"rotate(45deg)"}} src="svg/wi-umbrella.svg" className="precip-images" />
                        </div>
                        <div>
                            <h3>10%</h3>
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