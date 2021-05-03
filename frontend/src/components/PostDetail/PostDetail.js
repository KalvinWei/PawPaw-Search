import React, {useContext, useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import PetImages from "../PostPlaza/Posts/PostCard/PetImages/PetImages";
import PostDetailOnMap from "./PostDetailOnMap/PostDetailOnMap";
import Posts from "../PostPlaza/Posts/Posts";
import {AppContext} from "../../ContextProvider";
import {Grid, Typography} from "@material-ui/core";


export default function PostDetail() {

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
        <Grid container direction='row' justify='center'>
            <Grid item md={9} direction='column'>
                <Grid item container direction='row'>
                    <Grid item>
                        <table>
                            <tbody>
                            <tr>
                                <td>Post ID</td>
                                <td>{post._id}</td>
                            </tr>
                            </tbody>
                        </table>
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
                        <li>{post.createdAt}</li>
                    </Grid>
                    <Grid item>
                        <PetImages urls={post.petImages}/>
                    </Grid>
                </Grid>
                <Grid>
                    <PostDetailOnMap post={post}/>
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
