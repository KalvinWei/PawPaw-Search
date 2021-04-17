import axios from "axios";

// const MY_KEY = 'AIzaSyBrYWP893Nq8UXHwpvX7LFlYKtEf2N2TQs'
const MY_KEY  = ""
export default async function fromLatLng(lat,lng){
//     return await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}
// &location_type=ROOFTOP&result_type=street_address&key=${MY_KEY}`)
//         .then(res=> {
//             if(res.data.results) return res.data.results[0].formatted_address
//             else return `unknown address (${toFixedFloat(lat)},${toFixedFloat(lng)}`
//         })
//         .catch(()=>{e.message()})
    return "Psydo address for tesing"
}

function toFixedFloat(num) {
    return Number.parseFloat(num).toFixed(2)
}
