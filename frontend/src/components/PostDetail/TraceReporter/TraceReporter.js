import React, {useContext, useEffect, useRef, useState} from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import {MY_KEY} from '../../../utils/geoCoding'
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
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
    reporterBox:{
        position:"relative",
        gap:10,
        zIndex:1000
    }
}));

export default function TraceReporter({post, onReport}) {
    const classes = useStyles();
    const {reportTrace, loginUser} = useContext(AppContext)
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

    async function report(){
        if(!loginUser){
            alert('Please log in to report witness.')
            history.push('/login')
            return
        }
        if(spot.latitude){
            const updatedPost = await reportTrace(spot, post._id)
            if(updatedPost){
                alert('Trace extended! Thank you for your help!')
                onReport(updatedPost)
            } else {
                alert('It seems something wrong happened to fail the report, try again?')
            }
        }
    }

    return (
        <Grid container justify='center' alignItems='flex-end' className={classes.reporterBox}>
            <Grid item style={{transform: 'translateY(-5px)'}}>
                <div id="localSearch" ref={container} ></div>
            </Grid>
            <Grid item style={{transform: 'translateY(-2px)'}}>
                <form className={classes.container} noValidate>
                    <TextField
                        value={spot.timestamp}
                        onChange={e =>
                            setSpot({...spot, timestamp: e.target.value})
                        }
                        label="Last Seen"
                        type="datetime-local"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant='outlined'
                        size='small'
                    />
                </form>
            </Grid>
            <Grid item style={{transform: 'translateY(2px)'}}>
                <TextField
                    variant='outlined'
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
            <Grid item style={{transform: 'translateY(-5px)'}}>
                <Button onClick={report}
                        variant='contained'
                        size='medium'
                        color='secondary'
                        disabled={!spot.latitude}
                        style={{color:'ivory'}}
                >
                    Report witness
                </Button>
            </Grid>
        </Grid>


    )
}