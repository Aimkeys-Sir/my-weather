export default function QualityItem({quality}){
    return (
        <div className=".col-4">
            {/* <img src={quality.image}/> */}
            <div>
                <h2>{quality.name}</h2>
                <h4>{quality.value}</h4>
            </div>
        </div>
    )
}