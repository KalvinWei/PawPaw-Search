import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import PetImages from "../PostPlaza/Posts/PostCard/PetImages/PetImages";
import PostDetailOnMap from "./PostDetailOnMap/PostDetailOnMap";
import Posts from "../PostPlaza/Posts/Posts";
import TraceReporter from "./PostDetailOnMap/TraceRepoter/TraceReporter"
import {AppContext} from "../../ContextProvider";
import {Grid, Typography} from "@material-ui/core";
// import moment from 'moment'

export default function PostDetail() {
    // const moment = require('moment');
    const location = useHistory().location
    const post = location.state

    const {fetchMatchedPosts} = useContext(AppContext)
    const [matches, setMatches] = useState(null)
    const [pageTotal, setTotal] = useState(0)
    const [offset, setOffset] = useState(0)
    useEffect(() => {
        async function fetchMatches() {
            const res = await fetchMatchedPosts(post._id, 3, offset)
            setMatches(res.posts)
            setTotal(res.pageTotal)
        }

        fetchMatches()
    }, [offset])

    function handlePageChange(e, pageIndex) {
        setOffset(pageIndex - 1)
    }

    return (
        <Grid container direction='column'>
            <Grid item>
                <li>{post._id}</li>
                <PetImages urls={post.petImages}/>
                <li>{post.petName}</li>
                <li>{post.petType.species}</li>
                <li>{post.petType.breed}</li>
                <li>{post.petColor}</li>
                <li>{post.petSize}</li>
                <li>{post.petGender}</li>
                <li>{post.isMicroshipped}</li>
                <li>{post.microchipNumber}</li>
                <li>{post.desexed}</li>
                <li>{post.collarTagDescription}</li>
                <li>{post.comment}</li>
                <li>{post.status}</li>
                <li>{post.trace.map(spot => {
                    <span>(${spot.latitude},${spot.longitude})</span>
                })}
                </li>
                <li>
                    {(new Date(post.createdAt)).toLocaleString()}
                    {/*<Moment format="DD MM YYYY hh:mm:ss" />*/}
                </li>
                <div>
                    <TraceReporter/>
                </div>
                <div>
                    <PostDetailOnMap post={post}/>
                </div>
            </Grid>

            {matches && <Grid>
                <Typography variant='h6'>
                    Matched Posts
                </Typography>
                <Typography variant='subtitle1'>
                    Relevant posts are matched by our matching engine according to the features of posts.
                </Typography>
                <Typography variant='subtitle1'>
                    Posts are in descending order with respect to relevance to the current post.
                </Typography>
                <Posts posts={matches} pageTotal={pageTotal} page={offset + 1} onPageChange={handlePageChange}/>
            </Grid>}
        </Grid>

    )
}
