export default function AutoCompleteItem({place,region,index,onAutoClick}) {
    function handleAutoClick(){
        onAutoClick(place)
    }
    return (
        <div onClick={handleAutoClick} className="auto-div">
            <div style={{display:"flex",padding:"4px"}}>
                <h3>{place}</h3>
            <p><em>{region}</em></p> 
            </div>
            {index<9?(<div className="auto-complete-line"></div>):null}
        </div>
    )
}