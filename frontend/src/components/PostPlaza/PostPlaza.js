import React, {useContext, useEffect, useState} from "react";
import Posts from "./Posts/Posts";
import {AppContext} from "../../ContextProvider";
import SearchSetting from "./SearchSetting/SearchSetting";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import PostsOnMap from "./PostsOnMap/PostsOnMap"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding:20
    }
}));

export default function PostPlaza() {
    const classes = useStyles()
    //for searching posts according to criteria
    const {fetchPostsBy} = useContext(AppContext)
    const [posts, setPosts] = useState(null)
    const [pageOffset, setPageOffset] = useState(0)
    const [searchSetting, setSearch] = useState({})
    const [pageTotal, setPageTotal] = useState(0)

    useEffect(() => {
        async function fetchPosts(){
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
            <Grid container direction='row' spacing={2} className={classes.root}>
                <Grid item>
                    <SearchSetting onSubmitSearch={setSearch}/>
                </Grid>
                <Grid item>
                    <div>
                        <PostsOnMap />
                    </div>
                    <Posts posts={posts} page={pageOffset + 1} onPageChange={handlePageChange} pageTotal={pageTotal}/>
                </Grid>
            </Grid>
        </div>
    )
}