export default function AqiSlider({ defra }) {
    return (
        <div>
             <div className="defra-text">
                <p>Good</p>
                <p>Hazardous</p>
            </div>
            <div className="color-range">
                <input onChange={()=>""} type="range" min="0" max="10" value={defra} className="slider" id="myRange" />
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
                <div className="five"></div>
            </div>
            <div className="defra-text">
                <p>0</p>
                <p>10</p>
            </div>
        </div>

    )
}