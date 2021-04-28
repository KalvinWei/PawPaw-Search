import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup, NavigationControl, ScaleControl, GeolocateControl} from "react-map-gl";
import IconButton from "@material-ui/core/IconButton";
import PetsIcon from "@material-ui/icons/Pets";
import {makeStyles} from "@material-ui/core/styles";

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
        width: "100%",
        height: "500px",
        zoom: 10
    });
    const [selectedPetPoint, setSelectedPetPoint] = useState(null);

    const classes = useStyles()

    function SortTrace(post){
        for (let i = 0; i < post.trace.length; i++) {
            return post[i]
        }
    }

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken='pk.eyJ1IjoiemxpNzg2IiwiYSI6ImNrbnF1NzcyYjBkcnAydm4wenhvN2J0YmEifQ.QU5fBqJ3Gy7vvu9xWEMIKg'
                mapStyle="mapbox://styles/zli786/cknqui4de047a18qrip6y1kib"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}>

                {/*{*/}
                {/*    post.map(post => {*/}

                {/*            return (*/}
                {/*                <Marker*/}
                {/*                    key={post._id}*/}
                {/*                    latitude={parseFloat(getLast(post).latitude)}*/}
                {/*                    longitude={parseFloat(getLast(post).longitude)}*/}
                {/*                >*/}
                {/*                    <div>*/}
                {/*                        <IconButton edge="start" color="inherit" aria-label="menu"*/}
                {/*                                    onClick={e => {*/}
                {/*                                        e.preventDefault();*/}
                {/*                                        setSelectedPetPoint(post);*/}
                {/*                                    }}*/}
                {/*                        >*/}
                {/*                            <PetsIcon/>*/}
                {/*                        </IconButton>*/}
                {/*                    </div>*/}
                {/*                </Marker>*/}
                {/*            )*/}
                {/*        }*/}
                {/*    )*/}
                {/*}*/}
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