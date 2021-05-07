import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import PostDetailOnMap from "./PostDetailOnMap/PostDetailOnMap";
import Posts from "../PostPlaza/Posts/Posts";
import {AppContext} from "../../ContextProvider";
import {Checkbox, FormControlLabel, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import Carousel from "./Carousel/Carousel";
import TraceReporter from "./TraceReporter/TraceReporter";
import {Favorite, FavoriteBorder} from "@material-ui/icons";


const useStyle = makeStyles(theme => ({
    detailTable: {
        fontSize: 14,
        '& tr': {
            height: 30
        },
        '& tr > td:first-child': {
            textTransform: 'uppercase',
            textAlign: 'right',
            paddingRight: 10,
            color: '#999',
        },
        '& tr > td:nth-child(2)': {
            fontSize: 20,
            color: '#555',
        },
        margin: 30,
        fontFamily: 'helvetica'
    },
    mapWrapper: {
        border: '1px solid #ddd'
    },
    reporter:{
        position:'absolute',
        left:0,
        top:0,
        border:'5px  solid green'
    }
}))

export default function PostDetail() {
    const classes = useStyle()

    const location = useHistory().location
    const post = location.state

    const {fetchMatchedPosts, loginUser, checkWatching, updateWatchStatus} = useContext(AppContext)
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

    const [watched, setWatched] = useState(false)
    useEffect(() => {
            async function check() {
                const watchStatus = await checkWatching(post._id, loginUser._id)
                setWatched(watchStatus)
            }
            if(loginUser) check()
    },[])

    async function handleWatch(e) {
        const checked = e.target.checked
        // not watch -> watched
        if (checked) {
            const result = await updateWatchStatus(post._id, loginUser._id, "watching")
            if (result) {
                setWatched(true)
            }
        } else {
            // watched -> not watch
            const result = await updateWatchStatus(post._id, loginUser._id, "removeWatching")
            if (result) {
                setWatched(false)
            }
        }
    }

    const statusBgColor = post.status === 'Lost' ? 'coral' : (post.status === 'Found' ? 'darkgreen' : 'darkgrey')

    return (
        <Grid container direction='row' justify='center'>
            <Grid item md={9} direction='column' container>
                <Grid item container direction='row' alignItems='center' justify='space-between'>
                    <Grid item>
                        <table className={classes.detailTable}>
                            <tbody>
                            <tr>
                                <td>
                                    <span style={{
                                        padding: '8px 20px',
                                        borderRadius: 5,
                                        fontWeight: 'bolder',
                                        color: 'white',
                                        background: statusBgColor
                                    }}>
                                    {post.status}
                                    </span>
                                </td>
                                <td style={{
                                    fontWeight: 'bold',
                                    fontSize: 30,
                                    textTransform: 'capitalize'
                                }}>{post.petName}</td>
                            </tr>
                            <tr>
                                <td>Post ID</td>
                                <td>{post._id}</td>
                            </tr>
                            <tr>
                                <td>Post Time</td>
                                <td>{(new Date(post.createdAt)).toLocaleString().replace(',', '')}</td>
                            </tr>
                            <tr>
                                <td>Breed</td>
                                <td>{post.petType.species} / {post.petType.breed}</td>
                            </tr>
                            <tr>
                                <td>Color</td>
                                <td>{post.petColor}</td>
                            </tr>
                            <tr>
                                <td>Size</td>
                                <td>{post.petSize}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{post.petGender}</td>
                            </tr>
                            <tr>
                                <td>Microchip No.</td>
                                <td>
                                    {post.isMicrochipped === 'Yes' ? post.microchipNumber :
                                        (post.isMicrochipped === 'Unknown' ? 'Unknown' : 'No Microchip')
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Desex status</td>
                                <td>{post.desexed}</td>
                            </tr>
                            <tr>
                                <td>On Collar Tag</td>
                                <td>{post.collarTagDescription || 'No collar tag or nothing on it'}</td>
                            </tr>
                            <tr>
                                <td>Comment</td>
                                <td>{post.comment}</td>
                            </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item>
                        <Carousel urls={post.petImages}/>
                    </Grid>
                </Grid>
                <Grid>
                    {(loginUser !== null && loginUser._id === post.poster) || <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>}
                        label="Watch this post"
                        onChange={handleWatch}
                        checked={watched}
                    />
                    }
                    <TraceReporter post={post}/>
                </Grid>

                <Grid>
                    <PostDetailOnMap post={post} dimension={{width: '100%', height: 600}}/>
                </Grid>
                {matches && <Grid item>
                    <Typography variant='h5'>
                        Matched Posts
                    </Typography>
                    <Typography variant='subtitle2'>
                        Relevant posts are matched by our matching engine according to the features of posts.
                    </Typography>
                    <Typography variant='subtitle2'>
                        Posts are in descending order with respect to relevance with the current post.
                    </Typography>
                    <Posts posts={matches} pageTotal={pageTotal} page={offset + 1} onPageChange={handlePageChange}/>
                </Grid>}
            </Grid>
        </Grid>

    )
}
