import axios from "axios";

export const MY_KEY  = "pk.eyJ1IjoiemxpNzg2IiwiYSI6ImNrbnF1NzcyYjBkcnAydm4wenhvN2J0YmEifQ.QU5fBqJ3Gy7vvu9xWEMIKg"
export default async function fromLatLng(lat,lng){
    return await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MY_KEY}`)
        .then(res=> {
            if(res.data) return res.data
            else return `unknown address (${toFixedFloat(lat)},${toFixedFloat(lng)}`
        })
        .catch((e)=>{e.message()})
}

function toFixedFloat(num) {
    return Number.parseFloat(num).toFixed(2)
}
