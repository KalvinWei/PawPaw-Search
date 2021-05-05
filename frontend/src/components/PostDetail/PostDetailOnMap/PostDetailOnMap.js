import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup, NavigationControl, ScaleControl, GeolocateControl} from "react-map-gl";
import {makeStyles} from "@material-ui/core/styles";
import fromLatLng, {fetchVet, MY_KEY} from "../../../utils/geoCoding";
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    navControlStyle: {
        right: 10,
        top: 10
    },
    scaleControlStyle: {
        right: 50,
        top: 10
    },
    geolocateControlStyle: {
        right: 10,
        bottom: 20
    },
    iconButton:{
        backgroundColor: "darkgreen",
        borderColor:"transparent",
        color: "white",
        margin: "2px 2px",
        fontSize: "18px",
        verticalAlign: "top",
        cursor: "pointer",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        '&:hover': {
            background: "lightGreen",
            color:"black"
        }
    },
    vetButton:{
        backgroundColor: "#444",
        borderColor:"transparent",
        color: "white",
        margin: "2px 2px",
        fontSize: "18px",
        verticalAlign: "top",
        cursor: "pointer",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        '&:hover': {
            background: "lightgrey",
            color:"black"
        }
    }
}));


export default function PostDetailOnMap({post, dimension}) {
    const [viewport, setViewport] = useState({
        latitude: parseFloat(getLast(post).latitude),
        longitude: parseFloat(getLast(post).longitude),
        width: dimension.width,
        height: dimension.height,
        zoom: 13
    });
    const [selectedPetPoint, setSelectedPetPoint] = useState(null);
    const classes = useStyles()

    const [placeName, setPlaceName] = useState("")
    useEffect(()=>{
        async function fetchPlace(){
            if(selectedPetPoint) {
                const res = await fromLatLng(selectedPetPoint.latitude,selectedPetPoint.longitude)
                setPlaceName(res.features[0].place_name)
            }

        }
        fetchPlace()
    },[selectedPetPoint])

    function getLast(post) {
        return post.trace[post.trace.length - 1]
    }

    const [vets, setVets] = useState(null)
    const [checked, setChecked] = React.useState(false);
    const handleChange = async (e) => {
        if(e.target.checked){
            const fetchedVets = await fetchVet()
            if(fetchedVets){
                setChecked(true)
                setVets(fetchedVets)
            }
        } else{
            setChecked(false)
            setVets(null)
        }
    };

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={MY_KEY}
                mapStyle="mapbox://styles/zli786/cko28t2jb04m518n5iwbmgycb"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            name="showVets"
                        />
                    }
                    label="Show Nearby Vets"
                />
                {vets && vets.map(vet=>
                    <Marker
                        key={vet.longitude + " " + vet.latitude}
                        latitude={parseFloat(vet.latitude)}
                        longitude={parseFloat(vet.longitude)}
                    >
                        <div>
                            <button className={classes.vetButton}
                                    // onClick={e => {
                                    //     // e.preventDefault();
                                    //     setSelectedPetPoint(spot);
                                    // }}
                            >
                                V
                            </button>
                        </div>
                    </Marker>
                )}
                {
                    post.trace.map(spot =>
                                <Marker
                                    key={spot.longitude + " " + spot.latitude}
                                    latitude={parseFloat(spot.latitude)}
                                    longitude={parseFloat(spot.longitude)}
                                >
                                    <div>
                                        <button className={classes.iconButton}
                                                onClick={() => {
                                                    // e.preventDefault();
                                                    setSelectedPetPoint(spot);
                                                }}
                                        >
                                            {post.trace.indexOf(spot)+1}
                                        </button>
                                    </div>
                                </Marker>
                            )
                }
                {selectedPetPoint ? (
                    <Popup
                        latitude={parseFloat(selectedPetPoint.latitude)}
                        longitude={parseFloat(selectedPetPoint.longitude)}
                        onClose={() => {
                            setSelectedPetPoint(null);
                        }}
                    >
                        <div>
                            <h1>Trace No:{post.trace.indexOf(selectedPetPoint)+1}</h1>
                            <h3 style={{fontSize: "10"}}>Comment: {selectedPetPoint.comment}</h3>
                            <p>Address:{placeName}</p>
                        </div>
                    </Popup>
                ) : null}
                <NavigationControl className={classes.navControlStyle} />
                <ScaleControl maxWidth={100} unit="metric" className={classes.scaleControlStyle}/>
                <GeolocateControl
                    className={classes.geolocateControlStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                />
            </ReactMapGL>

        </div>
    )
}