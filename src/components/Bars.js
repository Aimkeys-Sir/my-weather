export default function Bars({defras}){
    const bars=Object.keys(defras).map(poll=>{
        const value=defras[poll]*80
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