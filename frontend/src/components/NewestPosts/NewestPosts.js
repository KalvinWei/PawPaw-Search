import React, {useContext} from "react";
import Posts from "../PostPlaza/Posts/Posts";
import {AppContext} from "../../ContextProvider";

export default function NewestPosts() {
    const {newestPosts} = useContext(AppContext)

    return (
        <div>
            <h1>Here are all posts meeting search criteria</h1>
            <Posts posts={newestPosts}/>
        </div>
    )
}