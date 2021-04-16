import React, {useContext, useEffect, useState} from "react";
import Posts from "../PostPlaza/Posts/Posts";
import {AppContext} from "../../ContextProvider";

export default function NewestPosts() {
    const {fetchNewestPosts} = useContext(AppContext)
    const [posts, setPosts] = useState(null)
    const [pageOffset, setPageOffset] = useState(0)
    const [pageTotal, setPageTotal] = useState(0)

    useEffect(()=>{
        const {posts, pageTotal:pageCount} = fetchNewestPosts(2, 20, pageOffset)
        setPosts(posts)
        setPageTotal(pageCount)
    },[pageOffset])

    function handlePageChange(e, pageIndex){
        setPageOffset(pageIndex-1)
    }

    return (
        <div>
            <h1>Posts in 2 days</h1>
            <Posts posts={posts} page={pageOffset+1} onPageChange={handlePageChange} pageTotal={pageTotal}/>
        </div>
    )
}