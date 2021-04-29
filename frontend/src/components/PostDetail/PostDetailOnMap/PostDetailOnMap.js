import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup, NavigationControl, ScaleControl, GeolocateControl} from "react-map-gl";
import Filter1RoundedIcon from '@material-ui/icons/Filter1Rounded';
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
    },
    iconButton:{
        backgroundColor: "transparent",
        border: "1px solid blue",
        color: "red",
        padding: "5px",
        margin: "2px 2px",
        fontSize: "14px",
        cursor: "pointer",
        borderRadius: "50%",
        '&:hover': {
            background: "#f00",
            color:"white"
         },
    }
}));
export default function PostDetailOnMap({post}) {
    const [viewport, setViewport] = useState({
        latitude: parseFloat(getLast(post).latitude),
        longitude: parseFloat(getLast(post).longitude),
        width: "80%",
        height: "500px",
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

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken='pk.eyJ1IjoiemxpNzg2IiwiYSI6ImNrbnF1NzcyYjBkcnAydm4wenhvN2J0YmEifQ.QU5fBqJ3Gy7vvu9xWEMIKg'
                mapStyle="mapbox://styles/zli786/cko28t2jb04m518n5iwbmgycb"
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
                                        <button className={classes.iconButton}
                                                    onClick={e => {
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
                        style={"width=50px"}
                    >
                        <div>
                            <h3>#{post.trace.indexOf(selectedPetPoint)+1}  {selectedPetPoint.timestamp}</h3>
                            <p>Address: {placeName.split(/[ ,]+/)}</p>
                            <p>Comment: {selectedPetPoint.comment}</p>
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