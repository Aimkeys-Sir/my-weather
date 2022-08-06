import { useHistory } from "react-router-dom"

export default function Wind({current,forecast,wind,units}){
   const hour=new Date().getHours()
   const history=useHistory()
   function handleClick(){
    history.push("./wind")
   }
    return (
        <div onClick={handleClick} className="col col-8">
            <h3>WIND</h3>
            <div style={{display:"flex"}}>
                <div className="wind-img">
                    <img alt="wind-turbine" src="wind-turbines.png" />
                </div>
                <div className="wind-text">
                    <div style={{display:"flex"}}>
                        <h1>{current[`wind_${units.wind}`]}</h1>
                        <h4>{units.wind}</h4>
                    </div>
                    <p>Gusts {current[`gust_${units.wind}`]}{units.wind}</p>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div className="wind-dir">
                    <img style={{transform:`rotate(${current.wind_degree}deg)`}} src="svg/wi-direction-up.svg" alt="wind direction"/>
                </div>
                <div className="wind-dir-text">
                    <h4>{current.wind_dir}</h4>
                    <p>{current.wind_degree}&deg;</p>
                </div>
                <div className="wind-dir">
                    <img src="svg/wi-thermometer.svg" alt="therm"/>
                </div>
                <div className="wind-dir-text">
                    <h4>Wind chill</h4>
                    <p>{forecast[hour][`windchill_${units.temp}`]}&deg; {units.temp.toUpperCase()}</p>
                </div>
                
            </div>
            <h4 style={{margin:"2px"}}>{wind.summary}</h4>
            <p>{wind.message}</p>
        </div>
    )
}