export default function SunUv(){
    return (
        <div className="col col-2">
            <h4>UV INDEX</h4>
            <div style={{display:"flex"}}>
                <div className="sunUv-div">
                    <img alt="sun" src="1000.day-svg.png"/>
                </div>
                <div className="uv-text">
                    <h1>7</h1>
                    <h3>uvi</h3>
                </div>
            </div>
            <h4 style={{margin:"0px"}}>Moderate UV</h4>
            <p style={{margin:"0px"}}>Moderate risk of harm from sun utra-violet rays.</p>
        </div>
    )
}