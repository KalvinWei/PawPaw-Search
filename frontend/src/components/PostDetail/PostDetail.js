import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import PostDetailOnMap from "./PostDetailOnMap/PostDetailOnMap";
import Posts from "../PostPlaza/Posts/Posts";
import {AppContext} from "../../ContextProvider";
import {Button, Checkbox, FormControlLabel, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import Carousel from "./Carousel/Carousel";
import TraceReporter from "./TraceReporter/TraceReporter";
import {Favorite, FavoriteBorder} from "@material-ui/icons";
import Loading from "../Loading/Loading";

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
            width:150
        },
        '& tr > td:nth-child(2)': {
            fontSize: 18,
            color: '#666',
        },
        margin: 30,
        fontFamily: 'helvetica',
        maxWidth: 500,
        verticalAlign:'top'
    },
    reporter: {
        position: 'absolute',
        left: 0,
        top: 0,
        border: '5px  solid green'
    },
    actionBox: {
        borderRadius: 10,
        background: 'rgba(230,230,230,.4)',
        padding: 20,
        marginBottom: 15

    },
    watchButtonBox: {
        borderRight: '2px solid #ddd',
        marginRight: 15,
        color:'#444',
        paddingRight:15,
        position:'relative',
        top:3
    }
}))

export default function PostDetail() {
    const classes = useStyle()
    const {fetchMatchedPosts, loginUser, checkWatching, updateWatchStatus, fetchPostById, setReunited} = useContext(AppContext)

    const {id} = useParams()

    const [post, setPost] = useState(null)
    useEffect(()=>{
        async function fetchPost(id){
            const result = await fetchPostById(id)
            if(result) {
                setPost(result)
            }
        }
        fetchPost(id)
    },[])

    const [matches, setMatches] = useState(null)
    const [pageTotal, setTotal] = useState(0)
    const [offset, setOffset] = useState(0)
    useEffect(() => {
        async function fetchMatches() {
            if(!post) return
            const res = await fetchMatchedPosts(post._id, 5, offset)
            if(res){
                setMatches(res.posts)
                setTotal(res.pageTotal)
            }
        }
        fetchMatches()
    }, [offset, post])

    function handlePageChange(e, pageIndex) {
        setOffset(pageIndex - 1)
    }

    const [watched, setWatched] = useState(false)
    useEffect(() => {
        async function check() {
            if(!post) return
            const watchStatus = await checkWatching(post._id, loginUser._id)
            setWatched(watchStatus)
        }

        if (loginUser) check()
    })

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

    async function reportReunited(){
        const yes_no = window.confirm('WARNING! This action can NOT be reverted.\nAre you sure this animal has been back home?')
        if(yes_no){
            const result = await setReunited(post._id)
            if(result){
                setPost({...post, status:"Reunited"})
            }else{
                alert("Action failed due to some reason!")
            }
        }
    }

    const statusBgColor = post && (post.status === 'Lost' ? 'coral' : (post.status === 'Found' ? 'darkgreen' : 'darkgrey'))

    return (
        post ?
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
                                <td>Poster Contact</td>
                                <td>
                                    {post.poster.phone}<br/>
                                    {post.poster.email}
                                </td>
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
                <Grid item container className={classes.actionBox} justify='center' alignItems='center'>
                    <Grid item className={classes.watchButtonBox}>
                        {(loginUser && loginUser._id === post.poster._id && post.status !== "Reunited") &&
                        <Button onClick={reportReunited}
                                variant='contained'
                                size='medium'
                                color='primary'
                                style={{color:'ivory'}}
                        >
                            Mark Reunited
                        </Button>
                        }
                        {(loginUser && loginUser._id !== post.poster._id) &&
                        <FormControlLabel
                            control={<Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} name="checkedH"/>}
                            label="WATCH"
                            onChange={handleWatch}
                            checked={watched}
                        />
                        }
                    </Grid>
                    <Grid item>
                        <TraceReporter post={post} onReport={setPost}/>
                    </Grid>
                </Grid>
                <Grid item>
                    <PostDetailOnMap post={post}
                                     dimension={{width: '100%', height: 400}}
                    />
                </Grid>
                <Grid item style={{marginTop: 20}}>
                    <Typography variant='h5' color={"textSecondary"}>
                        Matched Posts
                    </Typography>
                    <Typography variant='subtitle2' color={"textSecondary"} style={{marginBottom:10}}>
                        We operate a cross-site analysis to couple relevant posts every hour<br/>
                        Posts are listed by relevance in descending order
                    </Typography>
                    <Posts posts={matches} pageTotal={pageTotal} page={offset + 1} onPageChange={handlePageChange} />
                </Grid>
            </Grid>
        </Grid>
            :
            <Loading />

    )
}
