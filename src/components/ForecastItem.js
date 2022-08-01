export default function ForecastItem({time,image,temp}){
    console.log(image);
    return (
        <div className="forecast-item">
            <h2>{time}</h2>
            <div className="fore-icon">
            <img src={`svg/${image}.svg`}/>
            </div>
            {temp?<h4>{temp}&deg;</h4>:null}
        </div>
    )
}