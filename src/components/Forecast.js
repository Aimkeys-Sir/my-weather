import { useHistory } from "react-router-dom";
import ForecastItem from "./ForecastItem";

export default function ForeCast({ forecastArr ,current}) {
let hour=parseInt(current.last_updated.slice(current.last_updated.length-5).slice(0,2))
hour=hour<18?hour:18
  const updFore = forecastArr.slice(hour, hour+7).map((item) => {
    let image = item.condition.code;
    image += item.is_day === 0 ? ".night" : ".day";
    let time = item.time;
    time = time.substr(time.length - 5, time.length);
    return { image: image, time: time, temp: item.temp_c };
  });
  const history=useHistory()
  function handleClick(){
    history.push("/forecasts")
  }
  //displays weekly or daily forecast. Switched by a button fuctionality
  //displays 7 days forecast or
  //displays 16 hours forecast(every two hours)
  return (
    <div onClick={handleClick} className="col col-9">
      <div style={{display:"flex",position:"relative"}}>
        <h3>FORECAST</h3>
        <div className="temp-images-div">
          <div className="sele">
            <img src="svg/wi-thermometer-exterior.svg" />
          </div>
          <div className="sele">
            <img
              style={{ transform: "rotate(36deg)" }}
              src="svg/wi-umbrella.svg"
            />
          </div>
          <div className="sele">
            <img src="svg/wi-time-1.svg"/>
          </div>
        </div>
      </div>
      <tr id="my name is..." onClick={e=>console.log("me",e.target.name)} >click me</tr>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {updFore.map((item) => {
          return (
            <ForecastItem
              time={item.time}
              key={item.time}
              image={item.image}
              temp={item.temp}
            />
          );
        })}
      </div>
    </div>
  );
}
