import React, {useContext, useEffect, useRef, useState} from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import {MY_KEY} from '../../../utils/geoCoding'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button, FormHelperText} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {AppContext} from "../../../ContextProvider";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200
    },
}));

export default function TraceReporter({post}) {
    const classes = useStyles();
    const {reportTrace} = useContext(AppContext)
    const history = useHistory()
    const [spot, setSpot] = useState({
        latitude: undefined,
        longitude: undefined,
        timestamp: (new Date()).toISOString(),
        comment: ''
    })

    const [coord, setCoord] = useState({lat:undefined, lng:undefined})
    let container = useRef()
    useEffect(() => {
        const geocoder = new MapboxGeocoder({
            accessToken: MY_KEY,
            types: 'address,neighborhood,locality,place,region,country,postcode'
        })
        geocoder.addTo(container.current)
        geocoder.on('result', e => {
            const [lng, lat] = e.result.center
            setCoord({...coord, lat: lat, lng: lng})
        })
        geocoder.on('clear', () => {
            setCoord({...coord, lat: undefined, lng: undefined})
        })
    }, [container])
    useEffect(()=>{
        setSpot({...spot, latitude: coord.lat, longitude: coord.lng})
    },[coord])

    function formatDate(date){
        return JSON.stringify(date).substring(1,17)
    }

    async function report() {
        console.log(spot)
        if(spot.latitude){
            console.log("here")
            const updatedPost = await reportTrace(spot, post._id)
            console.log(history)
            history.push({path:history.location.pathname,state:updatedPost})
        }
    }

    return (
        <Grid container justify='flex-start'>
            <Grid item>
                <FormHelperText style={{textAlign: 'left'}}>
                    Last Seen Spot{spot.latitude && `: ${spot.latitude.toFixed(4)},${spot.longitude.toFixed(4)}`}
                </FormHelperText>
                <div id="localSearch" ref={container}></div>
            </Grid>
            <Grid item style={{transform: 'translateY(5px)'}}>
                <form className={classes.container} noValidate>
                    <TextField
                        value={spot.timestamp}
                        onChange={e =>
                            setSpot({...spot, timestamp: e.target.value})
                        }
                        label="Last Seen Date"
                        type="datetime-local"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </Grid>
            <Grid item >
                <TextField
                    autoFocus
                    margin="dense"
                    label="Comment"
                    type="text"
                    value={spot.comment}
                    onChange={e => {
                        setSpot({...spot, comment: e.target.value})
                    }}
                />
            </Grid>
            <Grid item>
                <Button onClick={report} color='primary'>
                    Report New Trace
                </Button>
            </Grid>
        </Grid>


    )
}