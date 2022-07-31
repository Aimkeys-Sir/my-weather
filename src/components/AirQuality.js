import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceGrin,faMaskFace,faFaceSadTear,faFaceGrinTears } from "@fortawesome/free-solid-svg-icons"
import AqiSlider from "./AqiSlider"

export default function AirQuality({ airQuality,defras,aqi}) {
    const mainPollutant = Object.keys(defras).reduce(((max, item) => {
        let value = defras[item]
        if (value > max.value) max = { ...max, pollutant: item, value: value }
        return max
    }), { pollutant: "", value: 0 })


    return (
        <div className="col col-6">
            <h3>AIR QUALITY</h3>
            <div className="img-text-air-div">
                <div className="air-img-div">
                    <FontAwesomeIcon style={{fontSize:"48px",color:"#FC66EA"}} icon={aqi.image}/>
                </div>
                <div style={{ marginLeft: "10px" }}>
                    <div style={{ display: "flex" }}>
                        <h1>{Math.round(airQuality[mainPollutant.pollutant])}</h1>
                        <h3 style={{ marginTop: "10px", marginLeft: "1px", marginBottom: "0" }}>μg/m3</h3>
                    </div>
                    <p>Main Pollutant:<strong style={{ color: "white" }}>{mainPollutant.pollutant.toUpperCase()}</strong></p>
                </div>
            </div>
            <h3>{aqi.summary}</h3>
            <p>{aqi.message}</p>
          <AqiSlider defra={airQuality['gb-defra-index']}/>
        </div>
    )
}