export default function Temperature({forecast}){
const dailyTemp=forecast.map(hour=>hour.temp_c)
let path=`M0 ${dailyTemp[0]}`
for(let i=1;i<24;i+=1){
    path +=` L${i} ${dailyTemp[i]}`
}
console.log(path)
return(<div>

</div>)

}