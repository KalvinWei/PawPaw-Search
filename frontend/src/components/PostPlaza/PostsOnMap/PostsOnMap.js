import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import IconButton from '@material-ui/core/IconButton';
import PetsIcon from '@material-ui/icons/Pets'


export default function PostsOnMap({posts}) {
    const [viewport, setViewport] = useState({
        latitude: -36.848461,
        longitude: 174.763336,
        width: "1000px",
        height: "500px",
        zoom: 10
    });
    // const [selectedPetPoint, setSelectedPetPoint] = useState(null);
    //
    // useEffect(() => {
    //     const listener = e => {
    //         if (e.key === "Escape") {
    //             setSelectedPetPoint(null);
    //         }
    //     };
    //     window.addEventListener("keydown", listener);
    //
    //     return () => {
    //         window.removeEventListener("keydown", listener);
    //     };
    // }, []);
    //

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

                <Marker
                    // key={post._id}
                    latitude={-36.912300}
                    longitude={174.739000}
                >
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <PetsIcon />
                    </IconButton>

                    {/*onClick={e => {*/}
                    {/*e.preventDefault();*/}
                    {/*setSelectedPetPoint(post);}}*/}
                </Marker>

                {/*{posts.map(post => (*/}

                {/* */}
                {/*))}*/}

                {/*{selectedPetPoint ? (*/}
                {/*    <Popup*/}
                {/*        latitude={selectedPetPoint.trace.latitude}*/}
                {/*        longitude={selectedPetPoint.trace.longitude}*/}
                {/*        onClose={() => {*/}
                {/*            setSelectedPetPoint(null);*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <div>*/}
                {/*            <h2>{selectedPetPoint.post.petName}</h2>*/}
                {/*            <h1>{selectedPetPoint.post.status}</h1>*/}
                {/*        </div>*/}
                {/*    </Popup>*/}
                {/*) : null}*/}
            </ReactMapGL>
        </div>
    );


}