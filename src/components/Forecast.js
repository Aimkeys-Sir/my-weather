import ForecastItem from "./ForecastItem";

export default function ForeCast({ forecastArr }) {
  const updFore = forecastArr.slice(0, 7).map((item) => {
    let image = item.condition.code;
    image += item.is_day === 0 ? ".night" : ".day";
    let time = item.time;
    time = time.substr(time.length - 5, time.length);
    return { image: image, time: time, temp: item.temp_c };
  });
  //displays weekly or daily forecast. Switched by a button fuctionality
  //displays 7 days forecast or
  //displays 16 hours forecast(every two hours)
  return (
    <div className="col col-9">
      <div style={{display:"flex",position:"relative"}}>
        <h3>FORECAST</h3>
        <div className="temp-images-div">
          <div className="temp-switch">
            <img src="svg/wi-thermometer-exterior.svg" />
          </div>
          <div className="sele">
            <img
              style={{ transform: "rotate(36deg)" }}
              src="svg/wi-umbrella.svg"
            />
          </div>
          <div className="temp-switch">
            <img src="svg/wi-thermometer-exterior.svg" />
          </div>
        </div>
      </div>

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
