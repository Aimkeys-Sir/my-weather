import ForecastItem from "./ForecastItem";

export default function ForeCast({forecastArr}){
    const updFore=forecastArr.slice(0,8).map(item=>{
        let image=item.condition.code
        image+=item.is_day===0?".night":".day"
        let time=item.time
        time=time.substr(time.length-5,time.length)
        return {image:image,time:time,temp:item.temp_c}
    })
    //displays weekly or daily forecast. Switched by a button fuctionality
    //displays 7 days forecast or
    //displays 16 hours forecast(every two hours)
    return (
        <div className="forecast">
            <h1>ForeCast</h1>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {updFore.map(item=>{
               return  <ForecastItem time={item.time} key={item.time} image={item.image} temp={item.temp}/> 
            })}
            </div>
            
          
        </div>
    )

}