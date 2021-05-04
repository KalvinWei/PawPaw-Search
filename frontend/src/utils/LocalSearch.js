import React, {useEffect, useRef, useState} from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import {MY_KEY} from './geoCoding'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {FormHelperText} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200
    },
}));

export default function LocalSearch({post, setPost}) {
    const classes = useStyles();

    let container = useRef()
    const [spot, setSpot] = useState({
        latitude:undefined,
        longitude:undefined,
        timestamp:(new Date()).toISOString(),
        comment:''
    })

    //if it has coords AND timestamp is not empty, then set post.trace
    useEffect(()=>{
        if(spot.longitude){
            setPost({...post, trace:[spot]})
        }
    },[spot])

    useEffect(() => {
        const geocoder = new MapboxGeocoder({
            accessToken: MY_KEY,
            types: 'address,neighborhood,locality,place,region,country,postcode'
        })

        geocoder.addTo(container.current)

        geocoder.on('result', e => {
            const [lng, lat] = e.result.center
            setSpot({...spot,latitude:lat,longitude:lng})
        })

        geocoder.on('clear', () => {
            setSpot({...spot,latitude: undefined, longitude: undefined})
        })
    }, [container])

    return (
        <Grid container justify='space-evenly'>
            <Grid item>
                <FormHelperText style={{textAlign: 'left'}}>
                    Last Seen Spot{spot.latitude && `: ${spot.latitude.toFixed(4)},${spot.longitude.toFixed(4)}`}
                </FormHelperText>
                <div id="localSearch" ref={container}></div>
            </Grid>
            <Grid item style={{transform:'translateY(5px)'}}>
                <form className={classes.container} noValidate>
                    <TextField
                        value={spot.timestamp}
                        onChange={e=>{
                            setSpot({...spot,timestamp: e.target.value})
                        }}
                        label="Last Seen Date"
                        type="datetime-local"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </Grid>
        </Grid>


    )
}