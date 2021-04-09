import React, {useContext} from "react";
import {AppContext} from "../../../ContextProvider";
import PostCard from "./PostCard/PostCard";

export default function Posts({posts}){
    //TODO: here should be a paginated div to show posts(which are <PostCard>s) meeting the search criteria.
    return <div>{posts.map(post=><PostCard key={post.id} post={post}/>)}</div>
}