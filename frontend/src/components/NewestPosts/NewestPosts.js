import React, {useContext, useEffect, useState} from "react";
import Posts from "../PostPlaza/Posts/Posts";
import {AppContext} from "../../ContextProvider";
import {Typography} from "@material-ui/core";

export default function NewestPosts() {
    const {fetchNewestPosts} = useContext(AppContext)
    const [posts, setPosts] = useState(null)
    const [pageOffset, setPageOffset] = useState(0)
    const [pageTotal, setPageTotal] = useState(0)

    useEffect(()=>{
        async function fetch(){
            const {posts, pageTotal:pageCount} = await fetchNewestPosts(2, 20, pageOffset)
            setPosts(posts)
            setPageTotal(pageCount)
        }
        fetch()
    },[pageOffset])

    function handlePageChange(e, pageIndex){
        setPageOffset(pageIndex-1)
    }

    return (
        <div>
            <Typography variant='h6' color='primary'>
                Newly Posted
            </Typography>
            <Posts posts={posts} page={pageOffset+1} onPageChange={handlePageChange} pageTotal={pageTotal}/>
        </div>
    )
}