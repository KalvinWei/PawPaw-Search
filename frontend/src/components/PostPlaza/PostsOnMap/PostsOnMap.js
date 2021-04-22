import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import IconButton from '@material-ui/core/IconButton';
import PetsIcon from '@material-ui/icons/Pets'
import {useHistory} from "react-router-dom";


export default function PostsOnMap({posts}) {
    const [viewport, setViewport] = useState({
        latitude: -36.848461,
        longitude: 174.763336,
        width: "100%",
        height: "500px",
        zoom: 10
    });
    const [selectedPetPoint, setSelectedPetPoint] = useState(null);
    const [hasPosts, setHasPosts] = useState(false)

    const history = useHistory()

    function showDetail() {
        history.push({pathname: `/posts/${selectedPetPoint._id}`, state: selectedPetPoint})
    }


    useEffect(()=>{
        if(posts) setHasPosts(true)
    },[posts])


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

    console.log("-------------------inside map")
    console.log(posts)
    function getLast(post){
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
                                <IconButton edge="start"  color="inherit" aria-label="menu"
                                            onClick={e => {
                                                e.preventDefault();
                                                setSelectedPetPoint(post);}}
                                >
                                    <PetsIcon />
                                </IconButton>

                            </div>

                        </Marker>
                    )}
                ): null}


                {selectedPetPoint ? (
                    <Popup
                        latitude={parseFloat(getLast(selectedPetPoint).latitude)}
                        longitude={parseFloat(getLast(selectedPetPoint).longitude)}
                        onClose={() => {
                            setSelectedPetPoint(null);
                        }}
                    >
                        <div>
                            <h2>{selectedPetPoint.petName}</h2>
                            <h1>{selectedPetPoint.status}</h1>
                           // TODO: change <a/> to ... change UI.

                            <a onClick={showDetail}>see detail</a>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    );
}