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

export async function fetchVet(){
    const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/vet.json?bbox=174.58937629047745,-37.08833057682634,175.08650761829546,-36.67365885719289&access_token=${MY_KEY}&limit=10`)
// place_name,text,center
    return result.features.map(f=>({
        vet:f.text,address:f.place_name,latitude:f.center[1], longitude:f.center[0]
    }))

}