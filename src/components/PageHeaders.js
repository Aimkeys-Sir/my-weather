import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faLocationDot} from "@fortawesome/free-solid-svg-icons"

export default function PageHeaders({city,date,page}){
    const dates=Date(date)
    return (
        <div className="aqi-head">
                <h2>{page}</h2>
                <div style={{display:"flex"}}>
                    <FontAwesomeIcon style={{margin:"28px 5px 0"}} icon={faLocationDot}/>
                   <h2>{city}</h2>     
                </div>
  
                <div>
                    <h3>{dates.slice(0,15)}</h3>
                    <p>{dates.slice(15,21)}</p>
                </div>
                
            </div>
    )
}