export default function ForecastItem({time,image,temp}){
    return (
        <div className="forecast-item">
            <h2>{time}</h2>
            <div className="fore-icon">
            <img alt={image} src={`svg/wi-${image}.svg`}/>
            </div>
            {temp?<h4>{temp}&deg;</h4>:null}
        </div>
    )
}