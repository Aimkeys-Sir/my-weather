export default function Bars({defras,mainPollutant}){
    const multiplier=mainPollutant.value<4?80:mainPollutant.value<8?50:80
    const bars=Object.keys(defras).map(poll=>{
        console.log(mainPollutant);
        const value=defras[poll]*multiplier
        console.log(value)
        return (<div style={{textAlign:"center"}}>
            <div className="bars" 
            style={{width:"50px",height:`${value}px`,padding:"2px"}}></div>
            <p>{poll.toUpperCase()}</p>
        </div> )
    })
    return(
        <div className="bars-cont" >
            {bars}
        </div>
    )
}