export default function PrecipForecastItem({fore,item,x,hour}){
    const height=fore[item]*x
    return(
        <div className="precip-bar" style={{width:"30px",height:`${4+height}px`}}>
        </div>
    )
}