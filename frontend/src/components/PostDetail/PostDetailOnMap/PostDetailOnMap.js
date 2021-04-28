import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup, NavigationControl, ScaleControl, GeolocateControl} from "react-map-gl";
import IconButton from "@material-ui/core/IconButton";
import PetsIcon from "@material-ui/icons/Pets";
import {makeStyles} from "@material-ui/core/styles";
import fromLatLng from "../../../utils/geoCoding";

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
    }
}));
export default function PostDetailOnMap({post}) {
    const [viewport, setViewport] = useState({
        latitude: -36.848461,
        longitude: 174.763336,
        width: "70%",
        height: "500px",
        zoom: 10
    });
    const [selectedPetPoint, setSelectedPetPoint] = useState(null);
    const classes = useStyles()

    const [placeName, setPlaceName] = useState("")
    useEffect(()=>{
        async function fetchPlace(){
            const res = await fromLatLng(selectedPetPoint.latitude,selectedPetPoint.longitude)
            setPlaceName(res.features.place_name)
        }
        fetchPlace()
    },[])

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken='pk.eyJ1IjoiemxpNzg2IiwiYSI6ImNrbnF1NzcyYjBkcnAydm4wenhvN2J0YmEifQ.QU5fBqJ3Gy7vvu9xWEMIKg'
                mapStyle="mapbox://styles/zli786/cknqui4de047a18qrip6y1kib"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}>

                {
                    post.trace.map(spot =>
                                <Marker

                                    key={spot.longitude + " " + spot.latitude}
                                    latitude={parseFloat(spot.latitude)}
                                    longitude={parseFloat(spot.longitude)}
                                >
                                    <div>
                                        <IconButton edge="start" color="inherit" aria-label="menu"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setSelectedPetPoint(spot);
                                                    }}
                                        >
                                            {post.trace.indexOf(spot)+1}
                                            <PetsIcon/>
                                        </IconButton>
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