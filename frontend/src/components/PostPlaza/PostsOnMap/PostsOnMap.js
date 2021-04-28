import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup, NavigationControl, ScaleControl} from "react-map-gl";
import IconButton from '@material-ui/core/IconButton';
import PetsIcon from '@material-ui/icons/Pets'
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";

const navControlStyle= {
    right: 10,
    top: 10
};
const scaleControlStyle= {
    right: 50,
    top: 10
};

export default function PostsOnMap({posts}) {
    const [viewport, setViewport] = useState({
        latitude: -36.848461,
        longitude: 174.763336,
        width: "60%",
        height: "450px",
        zoom: 10
    });
    const [selectedPetPoint, setSelectedPetPoint] = useState(null);
    const [hasPosts, setHasPosts] = useState(false)
    const history = useHistory()

    function showDetail() {
        // TODO: cannot jump to the post details
        history.push({pathname: `../posts/${selectedPetPoint._id}`, state: selectedPetPoint})
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

    return (
        <div>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken='pk.eyJ1IjoiemxpNzg2IiwiYSI6ImNrbnF1NzcyYjBkcnAydm4wenhvN2J0YmEifQ.QU5fBqJ3Gy7vvu9xWEMIKg'
                mapStyle="mapbox://styles/zli786/cknqui4de047a18qrip6y1kib"
                onViewportChange={viewport => {
                    setViewport(viewport);
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
                                    <IconButton edge="start" color="inherit" aria-label="menu"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    setSelectedPetPoint(post);
                                                }}
                                    >
                                        <PetsIcon/>
                                    </IconButton>
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
                            <h2>Pet Name: {selectedPetPoint.petName}</h2>
                            <h1 style={{color:"red"}}>{selectedPetPoint.status}</h1>
                            <Button size="small" color="primary" onClick={showDetail}>
                                see details
                            </Button>
                        </div>
                    </Popup>
                ) : null}
                <NavigationControl style={navControlStyle} />
                <ScaleControl maxWidth={100} unit="metric" style={scaleControlStyle} />
            </ReactMapGL>
        </div>
    );
}