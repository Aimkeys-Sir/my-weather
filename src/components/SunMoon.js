import { useHistory } from "react-router-dom"

export default function SunMoon({ data }) {
const hour=parseInt(data.current.last_updated.slice(data.current.last_updated.length-5).slice(0,2))
 const astro=data.forecast.forecastday[0].astro
const srise=parseInt(astro.sunrise.slice(0,2),10)
const sSet=parseInt(astro.sunset.slice(0,2),10)+12
const mrise=parseInt(astro.moonrise.slice(0,2),10)
const mSet=parseInt(astro.moonset.slice(0,2),10)+12

const history=useHistory()
function handleClick(){
  history.push("/astro")
}
  return (
    <div onClick={handleClick} className="col col-5">
      <h3>SUN & MOON</h3>
      <div>
        <div className="sunmoon">
          <div className="outer sun">
            <img style={{transform: `rotate(${180+((hour-srise)/(sSet-srise))*180}deg) translateX(52px)`}} alt="sun" className="inner rotsun" src="1000.day-svg.png"/>
            <div style={{position:"absolute"}}></div>
          </div>
          <div className="outer moon">
            <img style={{transform: `rotate(${180+((hour-mrise)/(mSet-mrise))*180}deg) translateX(52px)`}} alt="moon" className="inner rotmoon" src="moon.png" />
          </div>
        </div>
        <div className="rise-text">
          <div style={{ display: "flex" }}>
            <div>
              <h4 style={{ marginRight: "35px" }}>{astro.sunrise}</h4>
              <p>{hour>srise?`${hour-srise} hours ago`:hour<srise?` in ${srise-hour} hours`:"rising"}</p>
            </div>
            <div>
              <h4>{astro.sunset}</h4>
              <p>{hour>sSet?`${hour-sSet} hours ago`:hour<sSet?` in ${sSet-hour} hours`:"setting"}</p>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <h4 style={{ marginRight: "35px", marginLeft: "10px" }}>
                {astro.moonrise}
              </h4>
              <p style={{ marginLeft: "10px" }}>Today</p>
            </div>
            <div>
              <h4>{astro.moonset}</h4>
              <p>Tommorow</p>
            </div>
          </div>
        </div>
        <div className="sun-line"></div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex" }}>
            <div style={{position:"relative"}}>
              <div className="sunUv-div">
                <img alt="sun" src="sun.png" />
              </div>
              <div style={{position:"absolute",
            content:".",width:"60px",height:"60px",
            background: `conic-gradient(#4f3e448e ${((15-data.current.uv)/15)*100}%, #0000 0)`
            ,transform: `rotate(${30 / 100 * -1 * 360}deg))`
            ,borderRadius:"50%",left:"0",top:"5px"}}></div>
            </div>

            <div className="uv-text">
              <h1>{data.current.uv}</h1>
              <h3>uvi</h3>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="moon-img">
              <img src="svg/wi-moon-alt-waning-crescent-2.svg" />
            </div>
            <div className="moon-text">
              <h4>{astro.moon_phase.split(" ")[0]} <br />{astro.moon_phase.split(" ")[1]}</h4>
              <p>Today</p>
            </div>
          </div>
          {/* <div style={{ display: "flex" }}>
          <div className="moon-img">
            <img src="svg/wi-moon-new.svg" />
          </div>
          <div className="moon-text">
            <h4>Moon Illumination</h4>
            <p>14</p>
          </div>
        </div> */}
        </div>
      </div>
      <div></div>
    </div>
  );
}
