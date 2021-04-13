import React, {useContext} from "react";
import PostCard from "./PostCard/PostCard";

export default function Posts({posts}){
    //TODO: here should be a paginated div to show posts(which are <PostCard>s) meeting the search criteria.

    return (
        (posts && posts.length !=0) ? <div>{posts.map(post => <PostCard key={post.id} post={post}/>)}</div> :
            <div><p>NO AVAILABLE POSTS</p></div>
    )
}