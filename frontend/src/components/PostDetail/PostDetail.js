import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import PetImages from "../PostPlaza/Posts/PostCard/PetImages/PetImages";
import PostDetailOnMap from "./PostDetailOnMap/PostDetailOnMap";

export default function PostDetail() {
    const location = useHistory().location
    const post = location.state
    return (
        <div>
            <div>
                <li>{post._id}</li>
                <PetImages urls={post.petImages}/>
                <li>{post.petName}</li>
                <li>{post.petType.species}</li>
                <li>{post.petType.breed}</li>
                <li>{post.petColor}</li>
                <li>{post.petSize}</li>
                <li>{post.petGender}</li>
                <li>{post.isMicroshipped}</li>
                <li>{post.microchipNumber}</li>
                <li>{post.desexed}</li>
                <li>{post.collarTagDescription}</li>
                <li>{post.comment}</li>
                <li>{post.status}</li>
                <li>{post.trace.map(spot => {
                    <span>(${spot.latitude},${spot.longitude})</span>
                })}</li>
                <li>{post.createdAt}</li>
            </div>
            <div>
                <PostDetailOnMap post={post}/>
            </div>
        </div>
    )
}