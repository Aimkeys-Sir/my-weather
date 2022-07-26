export default function SunUv(){
    return (
        <div className="col col-2">
            <h4>UV INDEX</h4>
            <div style={{display:"flex"}}>
                <div className="sunUv-div">
                    <img alt="sun" src="svg/1000.day.svg"/>
                </div>
                <div style={{display:"flex"}}>
                    <h1>6</h1>
                    <p>uvi</p>
                </div>
            </div>
            <h4>Moderate UV</h4>
            <p>Moderate risk of harm from sun utra-violet rays.</p>
        </div>
    )
}