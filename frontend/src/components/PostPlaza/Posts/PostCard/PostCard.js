import React from "react";
import {Link} from "react-router-dom";

function PostCard({post}) {
    const lastSpot = post.trace[post.trace.length-1]
    console.log(post)
    return (
        <div>
            <p>{post.status}</p>
            <div className="carousel">
            {post.petImages.map(url=>
                <img key={url} src={url}/>
            )}
            </div>
            <h3>{post.petName}</h3>
            <p>Last seen: {lastSpot.longitude} {lastSpot.latitude}</p>
            <p>{post.comment}</p>
            <Link to={`/posts/${post._id}`}></Link>
        </div>
    )
}

export default PostCard;