import React, {useEffect, useRef} from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import {MY_KEY} from './geoCoding'

export default function LocalSearch({post, setPost}){

    let container = useRef()

    useEffect(()=>{
        const geocoder = new MapboxGeocoder({
            accessToken: MY_KEY,
            types: 'address,neighborhood,locality,place,region,country,postcode'
        })

        geocoder.addTo(container.current)

        geocoder.on('result', e=>{
            const [lat, lng] = e.result.center
            setPost({...post, trace:[{latitude:lat, longitude:lng}]})
        })

        geocoder.on('clear', ()=>{
            setPost({...post, trace:[]})
        })
    },[container])

    return (
        <div id="localSearch" ref={container}></div>
    )
}