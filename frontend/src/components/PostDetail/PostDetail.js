import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import PostDetailOnMap from "./PostDetailOnMap/PostDetailOnMap";
import Posts from "../PostPlaza/Posts/Posts";
import {AppContext} from "../../ContextProvider";
import {FormControlLabel, FormHelperText, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import Carousel from "./Carousel/Carousel";
import TraceReporter from "./TraceReporter/TraceReporter";
import Checkbox from "@material-ui/core/Checkbox";
import {Favorite, FavoriteBorder} from "@material-ui/icons";

const useStyle = makeStyles(theme=>({
    detailTable:{
        fontSize:16,
        '& tr':{
          height:30
        },
        '& tr > td:first-child':{
          textTransform:'uppercase',
            textAlign:'right',
            paddingRight:10,
            color:'#999',
        },
        '& tr > td:nth-child(2)':{
            fontSize:20,
            color:'#444',
        },
        margin:30,
        fontFamily:'helvetica'
    }
}))

export default function PostDetail() {
    const classes = useStyle()

    const location = useHistory().location
    const post = location.state

    const {fetchMatchedPosts, loginUser, checkWatching} = useContext(AppContext)
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
    const [watched,setWatched] = useState(async ()=>{
        return await checkWatching(post._id, loginUser._id)
    })
    function handleWatch(){
        if(watched){
            setWatched(true)
        }
    }

    const statusBgColor = post.status === 'Lost' ? 'carol': (post.status === 'Found' ? 'darkgreen': 'darkgrey')

    return (
        <Grid container direction='row' justify='center'>
            <Grid item md={9} direction='column'>
                <Grid item container direction='row' alignItems='center' justify='space-between'>
                    <Grid item>
                        <table className={classes.detailTable}>
                            <tbody>
                            <tr>
                                <td><span style={{padding:'0 10px', borderRadius:10, color:'white', background:statusBgColor }}>{post.status}</span></td>
                                <td style={{fontWeight:'bold', fontSize:30}}>{post.petName}</td>
                            </tr>
                            <tr>
                                <td>Post ID</td>
                                <td>{post._id}</td>
                            </tr>
                            <tr>
                                <td>Post Time</td>
                                <td>{post.createdAt}</td>
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
                                <td>MicrochipNumber</td>
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
                    <FormControlLabel
                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                        label="Watch this post"
                        onChange={handleWatch}
                        checked={watched}
                    />
                    <TraceReporter post={post}/>
                </Grid>
                <Grid>
                    <PostDetailOnMap post={post} dimension={{width:'100%', height:400}}/>
                </Grid>

                {matches && <Grid>
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
