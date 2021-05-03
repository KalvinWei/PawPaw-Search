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
            <Typography variant='h5' color='textPrimary'>
               Newest Posts&nbsp;
            </Typography>
            <Typography variant='subtitle2' color='textSecondary' gutterBottom>
                These posts are new in less than 48 hours
            </Typography>
            <Posts posts={posts} page={pageOffset+1} onPageChange={handlePageChange} pageTotal={pageTotal}/>
        </div>
    )
}