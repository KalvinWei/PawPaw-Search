import React, {useContext, useEffect, useState} from "react";
import Posts from "./Posts/Posts";
import {AppContext} from "../../ContextProvider";
import SearchSetting from "./SearchSetting/SearchSetting";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import PostsOnMap from "./PostsOnMap/PostsOnMap"
import {Typography} from "@material-ui/core";

export default function PostPlaza() {
    //for searching posts according to criteria
    const {fetchPostsBy} = useContext(AppContext)
    const [posts, setPosts] = useState(null)
    const [pageOffset, setPageOffset] = useState(0)
    const [searchSetting, setSearch] = useState({})
    const [pageTotal, setPageTotal] = useState(0)

    useEffect(() => {
        async function fetchPosts() {
            const {posts, pageTotal: pageCount} = await fetchPostsBy(searchSetting, 20, pageOffset)
            setPosts(posts)
            setPageTotal(pageCount)
        }

        fetchPosts()
    }, [searchSetting, pageOffset])


    function handlePageChange(e, pageIndex) {
        setPageOffset(pageIndex - 1)
    }

    return (
        <div>
            <Grid container xs={12} direction='row' style={{boxSizing:'border-box',padding:20}}>
                <Grid item>
                    <SearchSetting onSubmitSearch={setSearch}/>
                </Grid>
                <Grid item xs={12} sm  container direction='column' style={{flexGrow:1}}>
                    <Grid item >
                        <PostsOnMap posts={posts} dimension={{width: '96%', height: '300px'}}/>
                    </Grid>
                    <Grid item style={{marginTop:20}}>
                        {posts &&
                            <Typography variant='h6' gutterBottom color='textSecondary'>{posts.length} MATCH {posts.length === 1 ? 'POST' : 'POSTS'}</Typography>
                        }
                        <Posts posts={posts} page={pageOffset + 1} onPageChange={handlePageChange}
                               pageTotal={pageTotal}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}