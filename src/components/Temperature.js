import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDotCircle} from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router-dom";

export default function Temperature({ forecast,units }) {
  const dailyTemp = forecast.map((hour) => hour.temp_c);
  const temp_base = dailyTemp[0];
  const pointsArray = dailyTemp.map((temp, index) => [
    index * 9,
    100 + (temp_base - temp) * 5,
  ]);

  const smoothing = 0.2;

  // Properties of a line
  // I:  - pointA (array) [x,y]: coordinates
  //     - pointB (array) [x,y]: coordinates
  // O:  - (object) { length: l, angle: a }: properties of the line
  const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX),
    };
  };

  // Position of a control point
  // I:  - current (array) [x, y]: current point coordinates
  //     - previous (array) [x, y]: previous point coordinates
  //     - next (array) [x, y]: next point coordinates
  //     - reverse (boolean, optional): sets the direction
  // O:  - (array) [x,y]: a tuple of coordinates
  const controlPoint = (current, previous, next, reverse) => {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous || current;
    const n = next || current;

    // Properties of the opposed-line
    const o = line(p, n);

    // If is end-control-point, add PI to the angle to go backward
    const angle = o.angle + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;

    // The control point position is relative to the current point
    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
  };

  // Create the bezier curve command
  // I:  - point (array) [x,y]: current point coordinates
  //     - i (integer): index of 'point' in the array 'a'
  //     - a (array): complete array of points coordinates
  // O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
  const bezierCommand = (point, i, a) => {
    // start control point
    const cps = controlPoint(a[i - 1], a[i - 2], point);

    // end control point
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
  };
  const svgPath = (points, command) => {
    // build the d attributes by looping over the points
    const d = points.reduce(
      (acc, point, i, a) =>
        i === 0
          ? `M ${point[0]},${point[1]}`
          : i === points.length - 1
          ? `${acc} ${command(point, i, a)} L${point[0]},200 L0,200 Z`
          : `${acc} ${command(point, i, a)}`,
      ""
    );
    return d
  }
  const history=useHistory()
  function handleOnClick(){
    history.push("/temperature")
  }
  return (
    <div onClick={handleOnClick} className="col col-4">
      <div>
        <h4 style={{margin:"7px"}}>TEMPERATURE</h4>
        <div className="day-text">
                 <h4>Dawn</h4>
                 <h4>Morning</h4>
                 <h4>Day</h4>
                 <h4>Evening</h4>
                 <h4>Night</h4>
        </div>
   
        <svg
          className="temp-svg"
          viewBox="0 0 200 200"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="20%" y2="100%">
              <stop offset="0%" stopColor="#6C473F" />
              <stop offset="100%" stopColor="#4C294E" />
            </linearGradient>
            <linearGradient id="s-gradient">
            <stop offset="0%" stopColor="#5D3945"/>
                <stop offset="2%"stopColor="#4187CC"/>
                <stop offset="25%" stopColor="#4187CC"/>
                <stop offset="50%" stopColor="#ED800F"/>
                <stop offset="75%" stopColor="#ED800F"/>
                <stop offset="100%" stopColor="#4187CC"/>
            </linearGradient>
          </defs>
          <path strokeWidth={"2px"} fill="url(#gradient)" d={svgPath(pointsArray, bezierCommand)} stroke="url(#s-gradient)"/>
        </svg>
        <div style={{position:"relative"}}>
            <FontAwesomeIcon className="temp-dot dot1" style={{top:`${130+(temp_base-dailyTemp[3])*5}px`, left:`${14.4*3}px`}} icon={faDotCircle}/>
            <FontAwesomeIcon className="temp-dot dot2" style={{top:`${130+(temp_base-dailyTemp[8])*5}px`, left:`${14.4*8}px`}} icon={faDotCircle}/>
            <FontAwesomeIcon className="temp-dot dot3" style={{top:`${110+(temp_base-dailyTemp[13])*5}px`, left:`${14.4*13}px`}} icon={faDotCircle}/>
            <FontAwesomeIcon className="temp-dot dot4" style={{top:`${95+(temp_base-dailyTemp[19])*5}px`, left:`${14.4*19}px`}} icon={faDotCircle}/>
            <FontAwesomeIcon className="temp-dot dot5" style={{top:`${105+(temp_base-dailyTemp[22])*5}px`, left:`${14.4*22}px`}} icon={faDotCircle}/>
        </div>
        <div className="temp-forecasts">
            <p style={{top:`${140+(temp_base-dailyTemp[3])*7}px`, left:`${14*3}px`}}>{forecast[3][`temp_${units.temp}`]}&deg; {units.temp.toUpperCase()}</p>
            <p style={{top:`${140+(temp_base-dailyTemp[8])*7}px`, left:`${14*8}px`}}>{forecast[8][`temp_${units.temp}`]}&deg; {units.temp.toUpperCase()}</p>
            <p style={{top:`${130+(temp_base-dailyTemp[13])*7}px`, left:`${14*13}px`}}>{forecast[13][`temp_${units.temp}`]}&deg; {units.temp.toUpperCase()}</p>
            <p style={{top:`${120+(temp_base-dailyTemp[19])*7}px`, left:`${14*19}px`}}>{forecast[19][`temp_${units.temp}`]}&deg; {units.temp.toUpperCase()}</p>
            <p style={{top:`${120+(temp_base-dailyTemp[22])*7}px`, left:`${14*22}px`}}>{forecast[22][`temp_${units.temp}`]}&deg;{units.temp.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}
