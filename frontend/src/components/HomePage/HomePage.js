import React from "react"
import Dashboard from "../Dashboard/Dashboard";
import NewestPosts from "../NewestPosts/NewestPosts";

export default function HomePage() {

    return (
        <div style={{margin:20}}>
            <Dashboard/>
            <NewestPosts/>
        </div>
    )
}