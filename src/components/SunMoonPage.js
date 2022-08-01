import PageHeaders from "./PageHeaders";

export default function SunMoonPage({data}){
    const astro=data.forecast.forecastday[0].astro
    return (
        <div className="sm-page">
            <PageHeaders page={"ASTRONOMY"} city={data.location.name} date={data.location.name}/>
            <div style={{display:"flex"}}>
                <div className="sm-content">
                    <h3>Sun</h3>
                    <table>
                        <tr>
                            <td>Sunrise</td>
                            <td>{astro.sunrise}</td>
                        </tr>
                        <tr>
                            <td>Sunset</td>
                            <td>{astro.sunset}</td>
                        </tr>  
                        <tr>
                            <td>UV index</td>
                            <td>{data.current.uv} uvi</td>
                        </tr>
                    </table>
                </div>
                <div className="sm-content">
                    <h3>Moon</h3>
                    <table>
                        <tr>
                            <td>Moonrise</td>
                            <td>{astro.moonrise}</td>
                        </tr>
                        <tr>
                            <td>Moonset</td>
                            <td>{astro.moonset}</td>
                        </tr>  
                        <tr>
                            <td>Phase</td>
                            <td>{astro.moon_phase}</td>
                        </tr>
                        <tr>
                            <td>Illumination</td>
                            <td>{astro.moon_illumination}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}