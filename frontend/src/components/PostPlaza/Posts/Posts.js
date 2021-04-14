import React, {useContext} from "react";
import PostCard from "./PostCard/PostCard";

export default function Posts({posts}){
    //TODO: here should be a paginated div to show posts(which are <PostCard>s) meeting the search criteria.

    return (
        !(posts && posts.length !=0) ? <div><p>OOPS! NO AVAILABLE POSTS.</p></div> : //the case: no posts to show
            <div>
                {posts.map(post => <PostCard key={post._id} post={post}/>)}

            </div>


    )
}