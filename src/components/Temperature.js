import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faDotCircle} from "@fortawesome/free-solid-svg-icons"

export default function Temperature({ forecast }) {
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
  };
  return (
    <div className="col col-4">
      <div>
        <h4 style={{margin:"6px"}}>FORECASTS</h4>
        <div className="day-text">
                 <h4>Dawn</h4>
                 <h4>Morning</h4>
                 <h4>Day</h4>
                 <h4>Evening</h4>
                 <h4>Night</h4>
        </div>
   
        <svg
          class="temp-svg"
          viewBox="0 0 200 200"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="20%" y2="100%">
              <stop offset="0%" stop-color="#6C473F" />
              <stop offset="100%" stop-color="#4C294E" />
            </linearGradient>
            <linearGradient id="s-gradient">
            <stop offset="0%" stop-color="#5D3945"/>
                <stop offset="2%" stop-color="#4187CC"/>
                <stop offset="25%" stop-color="#4187CC"/>
                <stop offset="50%" stop-color="#ED800F"/>
                <stop offset="75%" stop-color="#ED800F"/>
                <stop offset="100%" stop-color="#4187CC"/>
            </linearGradient>
          </defs>
          <path stroke-width={"2px"} fill="url(#gradient)" d={svgPath(pointsArray, bezierCommand)} stroke="url(#s-gradient)"/>
        </svg>
        <div style={{position:"relative"}}>
            <FontAwesomeIcon className="temp-dot dot1" style={{top:`${102+(temp_base-dailyTemp[3])*5}px`, left:`${11.5*3}px`}} icon={faDotCircle}/>
            <FontAwesomeIcon className="temp-dot dot2" style={{top:`${105+(temp_base-dailyTemp[8])*5}px`, left:`${11.5*8}px`}} icon={faDotCircle}/>
            <FontAwesomeIcon className="temp-dot dot3" style={{top:`${102+(temp_base-dailyTemp[13])*5}px`, left:`${11*13}px`}} icon={faDotCircle}/>
            <FontAwesomeIcon className="temp-dot dot4" style={{top:`${65+(temp_base-dailyTemp[19])*5}px`, left:`${11.2*19}px`}} icon={faDotCircle}/>
            <FontAwesomeIcon className="temp-dot dot5" style={{top:`${65+(temp_base-dailyTemp[22])*5}px`, left:`${11.5*23}px`}} icon={faDotCircle}/>
        </div>
        <div className="temp-forecasts">
            <p style={{top:`${112+(temp_base-dailyTemp[3])*5}px`, left:`${10*3}px`}}>{dailyTemp[3]}&deg;</p>
            <p style={{top:`${115+(temp_base-dailyTemp[8])*5}px`, left:`${10*8}px`}}>{dailyTemp[8]}&deg;</p>
            <p style={{top:`${112+(temp_base-dailyTemp[13])*5}px`, left:`${10*13}px`}}>{dailyTemp[13]}&deg;</p>
            <p style={{top:`${112+(temp_base-dailyTemp[19])*5}px`, left:`${10*19}px`}}>{dailyTemp[19]}&deg;</p>
            <p style={{top:`${112+(temp_base-dailyTemp[22])*5}px`, left:`${11.5*22}px`}}>{dailyTemp[22]}&deg;</p>
        </div>
        <div className="temp-images-div"> 
                 <div className="temp-switch">
                    <img src="svg/wi-thermometer-exterior.svg"/>
               </div>
               <div className="temp-switch">
                    <img style={{transform:"rotate(36deg)"}} src="svg/wi-umbrella.svg"/>
               </div>
               <div className="sele">
                    <img src="svg/wi-thermometer-exterior.svg"/>
               </div>
        </div>
      </div>
    </div>
  );
}
