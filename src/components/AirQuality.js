import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"

export default function AirQuality({ airQuality }) {
    const defra = airQuality['gb-defra-index']
    const pollutants = Object.keys(airQuality).filter(key => key !== "gb-defra-index" && key !== "us-epa-index")

    const mainPollutant = pollutants.reduce(((max, item) => {
        let value = airQuality[item]
        console.log(`${item}:${value},max.value:${max.value}`)
        if (value > max.value) max = { ...max, pollutant: item, value: value }
        return max
    }), { pollutant: "", value: 0 })

    function formatAirQ(defra) {
        let aqi = {}
        if (defra < 2) {
            aqi = { defra: defra, summary: "Clean Air", message: "You got to enjoy this!!" }
        }
        else if (defra>1&&defra < 4) {
            aqi = { defra: defra, summary: "Low Pollution", message: "Enjoy the day, the air is good!" }
        } else if (defra > 3 && defra < 7) {
            aqi = { defra: defra, summary: "Moderate Pollution", message: "The air is not so cool. If you have lung problems or heart problems, please avoid strenous activities and stay indoors." }
        } else if (defra < 9 && defra > 6) {
            aqi = { defra: defra, summary: "High Pollution", message: "Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors." }
        } else if (defra > 8) {
            aqi = { defra: defra, summary: "Hazardous", message: "Reduce physical exertion, particularly outdoors, especially if you experience symptoms such as cough or sore throat" }
        }
        return aqi
    }
    // 0-1- clean 1
    //1-3- low 2
    //3-6- moderate 3
    //6-8 - high 2
    //8-10 - hazardous 2
    //displays air quality
    return (
        <div className="col col-6">
            <h3>AIR QUALITY</h3>
            <div className="img-text-air-div">
                <div className="air-img-div">
                    <img src="svg/wi-rain.svg" alt="image" className="air-img" />
                </div>
                <div style={{ marginLeft: "10px" }}>
                    <div style={{ display: "flex" }}>
                        <h1>{Math.round(mainPollutant.value)}</h1>
                        <h3 style={{ marginTop: "10px", marginLeft: "1px", marginBottom: "0" }}>μg/m3</h3>
                    </div>
                    <p>Main Pollutant:<strong style={{ color: "white" }}>{mainPollutant.pollutant.toUpperCase()}</strong></p>
                </div>
            </div>
            <h3>{formatAirQ(defra).summary}</h3>
            <p>{formatAirQ(defra).message}</p>
            <div>

            </div>
            <div className="defra-text">
                <p>Good</p>
                <p>Hazardous</p>
            </div>
            <div className="color-range">
            <input type="range" min="0" max="10" value={defra} class="slider" id="myRange"/>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
                <div className="five"></div>
            </div> 
            <div className="expand">
                <FontAwesomeIcon id="angle-down" icon={faAngleDown}/>
            </div>
        </div>
    )
}