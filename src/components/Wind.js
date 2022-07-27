export default function Wind(){
    return (
        <div className="col col-8">
            <h3>WIND</h3>
            <div style={{display:"flex"}}>
                <div className="wind-img">
                    <img alt="wind-turbine" src="wind-turbines.png" />
                </div>
                <div className="wind-text">
                    <div style={{display:"flex"}}>
                        <h1>5</h1>
                        <h4>m/s</h4>
                    </div>
                    <p>Gusts 10km/h</p>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div className="wind-dir">
                    <img src="svg/wi-direction-right.svg" alt="wind direction"/>
                </div>
                <div className="wind-dir-text">
                    <h4>East</h4>
                    <p>90&deg;</p>
                </div>
                <div className="wind-dir">
                    <img src="svg/wi-direction-right.svg" alt="wind direction"/>
                </div>
                <div className="wind-dir-text">
                    <h4>East</h4>
                    <p>90&deg;</p>
                </div>
            </div>
        </div>
    )
}