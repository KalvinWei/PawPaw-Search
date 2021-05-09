import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup, NavigationControl, ScaleControl, GeolocateControl} from "react-map-gl";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import 'mapbox-gl/dist/mapbox-gl.css'
import {MY_KEY} from '../../../utils/geoCoding';

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
    dt: {
        fontFamily: 'Helvetica',
        fontSize: '12px',
        color: "darkgrey"
    },
    dd: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        color: 'black'
    },
    iconButton:{
        borderColor:"transparent",
        padding: "5px",
        margin: "2px 2px",
        cursor: "pointer",
        borderRadius: "50%",
        width: "15px",
        height: "15px"
    }
}));

export default function PostsOnMap({posts, dimension}) {
    const [viewport, setViewport] = useState({
        latitude: -36.848461,
        longitude: 174.763336,
        width: dimension.width,
        height: dimension.height,
        zoom: 10
    });
    const [selectedPetPoint, setSelectedPetPoint] = useState(null);
    const [hasPosts, setHasPosts] = useState(false)
    const history = useHistory()
    const classes = useStyles()

    function showDetail() {
        // TODO: cannot jump to the post details
        history.push({pathname: `./posts/${selectedPetPoint._id}`, state: selectedPetPoint})
    }


    useEffect(() => {
        if (posts) setHasPosts(true)
    }, [posts])


    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedPetPoint(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    function getLast(post) {
        return post.trace[post.trace.length - 1]
    }

    function statusColor(post) {
        return post.status === 'Reunited' ? 'grey' : (post.status === 'Lost' ? 'coral' : 'darkgreen')
    }

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={MY_KEY}
            mapStyle="mapbox://styles/zli786/cko28t2jb04m518n5iwbmgycb"
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
            onResize={()=>{
                console.log("map resized")
            }}
        >
            {hasPosts ? posts.map(post => {

                    return (
                        <Marker
                            key={post._id}
                            latitude={parseFloat(getLast(post).latitude)}
                            longitude={parseFloat(getLast(post).longitude)}
                        >
                            <div>
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        setSelectedPetPoint(post);
                                    }}
                                    className={classes.iconButton}
                                    style={{backgroundColor: statusColor(post),"&:hover":{background: "lightGreen"}}}
                                />

                            </div>
                        </Marker>
                    )
                }
            ) : null}
            {selectedPetPoint ? (
                <Popup
                    latitude={parseFloat(getLast(selectedPetPoint).latitude)}
                    longitude={parseFloat(getLast(selectedPetPoint).longitude)}
                    onClose={() => {
                        setSelectedPetPoint(null);
                    }}
                >
                    <div>
                        <table>
                            <tbody>
                            <tr className={classes.dt}>
                                <td>pet name</td>
                            </tr>
                            <tr className={classes.dd}>
                                <td>{selectedPetPoint.petName}</td>
                            </tr>
                            <tr className={classes.dt}>
                                <td>color</td>
                            </tr>
                            <tr className={classes.dd}>
                                <td>{selectedPetPoint.petColor && 'Unknown'}</td>
                            </tr>
                            <tr className={classes.dt}>
                                <td>breed</td>
                            </tr>
                            <tr className={classes.dd}>
                                <td>{selectedPetPoint.petType.species} / {selectedPetPoint.petType.breed}</td>
                            </tr>
                            <tr className={classes.dt}>
                                <td>last seen time</td>
                            </tr>
                            <tr className={classes.dd}>
                                <td>{(new Date(getLast(selectedPetPoint).timestamp)).toLocaleString()}</td>
                            </tr>

                            </tbody>
                        </table>
                        <Button size="small" variant='text' color="primary" onClick={showDetail}>
                            see details
                        </Button>
                    </div>
                </Popup>
            ) : null}
            <NavigationControl className={classes.navControlStyle}/>
            <ScaleControl maxWidth={100} unit="metric" className={classes.scaleControlStyle}/>
            <GeolocateControl
                className={classes.geolocateControlStyle}
                positionOptions={{enableHighAccuracy: true}}
                trackUserLocation={true}
            />
        </ReactMapGL>
    );
}