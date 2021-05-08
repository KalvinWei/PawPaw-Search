import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup, NavigationControl, ScaleControl, GeolocateControl} from "react-map-gl";
import {makeStyles} from "@material-ui/core/styles";
import fromLatLng, {fetchVet} from "../../../utils/geoCoding";
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel} from "@material-ui/core";
import {v4 as uuidv4} from 'uuid'

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
        color: "darkgrey",
        textTransform: 'uppercase'
    },
    dd: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        color: '#666'
    },
    iconButton: {
        backgroundColor: "darkgreen",
        borderColor: "transparent",
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
            color: "black"
        }
    },
    vetButton: {
        backgroundColor: "#444",
        borderColor: "transparent",
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
            color: "black"
        }
    },
    showVetBox:{
        background: 'rgba(200,200,200,0.4)',
        backdropFilter:'blur(5px)',
        margin:8,
        padding:5,
        paddingRight:15,
        borderRadius:10,
        fontFamily:'Helvetica',
        color:'#333'
    }
}))


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
    useEffect(() => {
        async function fetchPlace() {
            if (selectedPetPoint) {
                const res = await fromLatLng(selectedPetPoint.latitude, selectedPetPoint.longitude)
                setPlaceName(res.features[0].place_name)
            }
        }
        fetchPlace()
    }, [selectedPetPoint])

    function getLast(post) {
        return post.trace[post.trace.length - 1]
    }

    const [vets, setVets] = useState(null)
    const [checked, setChecked] = React.useState(false);
    const handleChange = async (e) => {
        if (e.target.checked) {
            const fetchedVets = await fetchVet()
            if (fetchedVets) {
                setChecked(true)
                setVets(fetchedVets)
            }
        } else {
            setChecked(false)
            setVets(null)
        }
    };

    const [selectVetPoint, setSelectVetPoint] = useState(null)

    useEffect(() => {
        async function getVetInfo() {
            const res = await fetchVet()
            if (selectVetPoint) {
                for (let i = 0; i < res.length; i++) {
                    setSelectVetPoint(res)
                }
            }
        }

        getVetInfo()
    }, [setSelectVetPoint])

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken='pk.eyJ1IjoiemxpNzg2IiwiYSI6ImNrbnF1NzcyYjBkcnAydm4wenhvN2J0YmEifQ.QU5fBqJ3Gy7vvu9xWEMIKg'
                mapStyle="mapbox://styles/zli786/cko28t2jb04m518n5iwbmgycb"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}>
                <div>
                    <FormControlLabel
                        className={classes.showVetBox}
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                name="showVets"
                            />
                        }
                        label="show nearby vets"
                    />
                </div>

                {vets && vets.map(vet =>
                    <Marker
                        key={uuidv4()}
                        latitude={parseFloat(vet.latitude)}
                        longitude={parseFloat(vet.longitude)}
                    >
                        <div>
                            <button className={classes.vetButton}
                                    onClick={() => {
                                        setSelectVetPoint(vet);
                                    }}
                            >
                                V
                            </button>
                        </div>
                    </Marker>)}
                {selectVetPoint && <Popup latitude={parseFloat(selectVetPoint.latitude)}
                                          longitude={parseFloat(selectVetPoint.longitude)}
                                          onClose={() => {
                                              setSelectVetPoint(null);
                                          }}
                >
                    <div>
                        <table>
                            <tbody>
                            <tr className={classes.dt}>
                                <td>Name</td>
                            </tr>
                            <tr className={classes.dd}>
                                <td>{selectVetPoint.vet}</td>
                            </tr>
                            <tr className={classes.dt}>
                                <td>Address</td>
                            </tr>
                            <tr className={classes.dd}>
                                <td>{selectVetPoint.address}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Popup>
                }

                {post.trace.map(spot =>
                    <Marker
                        key={uuidv4()}
                        latitude={parseFloat(spot.latitude)}
                        longitude={parseFloat(spot.longitude)}
                    >
                        <div>
                            <button className={classes.iconButton}
                                    onClick={() => {
                                        setSelectedPetPoint(spot)
                                    }}
                            >
                                {post.trace.indexOf(spot) + 1}
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
                            <table>
                                <tbody>
                                <tr className={classes.dd} style={{fontWeight: 'bold', fontSize: '1.4em'}}>
                                    <td>#{post.trace.indexOf(selectedPetPoint) + 1}</td>
                                </tr>
                                <tr className={classes.dt}>
                                    <td>report time</td>
                                </tr>
                                <tr className={classes.dd}>
                                    <td>{(new Date(selectedPetPoint.timestamp)).toLocaleString()}</td>
                                </tr>
                                <tr className={classes.dt}>
                                    <td>address</td>
                                </tr>
                                <tr className={classes.dd}>
                                    <td>{placeName}</td>
                                </tr>
                                <tr className={classes.dt}>
                                    <td>comment</td>
                                </tr>
                                <tr className={classes.dd}>
                                    <td>{selectedPetPoint.comment}</td>
                                </tr>
                                </tbody>
                            </table>
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

        </div>
    )
}