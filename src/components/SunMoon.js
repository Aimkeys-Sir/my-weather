export default function SunMoon() {
  return (
    <div className="col col-5">
      <h3>SUN & MOON</h3>
      <div>
        <div className="sunmoon">
          <div className="outer sun">
            <img alt="sun" className="inner rotsun" src="1000.day-svg.png" />
          </div>
          <div className="outer moon">
            <img alt="moon" className="inner rotmoon" src="moon.png" />
          </div>
        </div>
        <div className="rise-text">
          <div style={{ display: "flex" }}>
            <div>
              <h4 style={{ marginRight: "35px" }}>6:45am</h4>
              <p>4 hours ago</p>
            </div>
            <div>
              <h4>7:01pm</h4>
              <p>in 8 hours</p>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <h4 style={{ marginRight: "35px", marginLeft: "10px" }}>
                6:45am
              </h4>
              <p style={{ marginLeft: "10px" }}>Today</p>
            </div>
            <div>
              <h4>7:01pm</h4>
              <p>Tommorow</p>
            </div>
          </div>
        </div>
        <div className="sun-line"></div>
        <div style={{display:"flex"}}>
           <div style={{ display: "flex" }}>
          <div className="moon-img">
            <img src="svg/wi-moon-alt-waning-crescent-2.svg" />
          </div>
          <div className="moon-text">
            <h4>Waxing <br/>Crescent</h4>
            <p>Today</p>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="moon-img">
            <img src="svg/wi-moon-new.svg" />
          </div>
          <div className="moon-text">
            <h4>Moon Illumination</h4>
            <p>14</p>
          </div>
        </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
