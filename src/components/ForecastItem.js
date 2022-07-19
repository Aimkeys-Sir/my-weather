export default function ForecastItem({time,image,temp}){
    return (
        <div className="forecast-item">
            <h2>{time}</h2>
            <div className="fore-icon">
            <img src={`svg/${image}.svg`} className="fore-image"/>
            </div>
            <h4>{temp}&deg;</h4>
        </div>
    )
}