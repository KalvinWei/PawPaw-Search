import React from "react";
import Posts from "./Posts/Posts";

export default function PostPlaza() {
    return (
        <div>
            <SearchSetting/>
            <Posts searchIn="allPosts"/>
        </div>
    )
}