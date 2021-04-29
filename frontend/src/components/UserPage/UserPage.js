import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../ContextProvider";
import Posts from "../PostPlaza/Posts/Posts";
import Grid from "@material-ui/core/Grid";
import {Card, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Email, Person, PhoneAndroid, Room} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {Switch} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding:20
    }
}));

export default function UserPage(){
    const classes  = useStyles()
    const {loginUser, fetchPostsOf} = useContext(AppContext)
    const user = loginUser
    //TODO for testing
    delete user.myPosts
    delete user.myWatchings

    //states for myPosts
    const [myPosts, setMyPosts] = useState(null)
    const [offSetMy, setOffsetMy] = useState(0)
    const [pageTotalMy, setPageTotalMy] = useState(0)
    useEffect(()=>{
        async function fetchData(){
            const {posts, pageTotal:pageCount} = await fetchPostsOf(20, offSetMy, 'mine')
            setMyPosts(posts)
            setPageTotalMy(pageCount)
        }
        fetchData()
    },[offSetMy])
    function handlePageChangeMy(pageIndex){
        setOffsetMy(pageIndex-1)
    }


    //states for myWatchings
    const [watchings, setWatchings] = useState(null)
    const [offSetWatching, setOffsetWatching] = useState(0)
    const [pageTotalWatching, setPageTotalWatching] = useState(0)
    useEffect(()=>{
        async function fetchData(){
            const {posts, pageTotal:pageCount}  = await fetchPostsOf(20, offSetWatching,'watching')
            setWatchings(posts)
            setPageTotalWatching(pageCount)
        }
        fetchData()
    }, [offSetWatching])
    function handlePageChangeWatchings(pageIndex){
        setOffsetWatching(pageIndex-1)
    }

    //profile edit
    const [openEdit, setOpenEdit] = useState(false)
    function openEdit(){
        setOpenEdit(true)
    }


    return (
        <Grid container direction='row' spacing={2} className={classes.root}>
            <Grid item>
                {/*TODO show details the current logged-in user. Also, contains button to allow user modify their info. */}
                <Paper style={{width:300,padding:20}} variant='outlined'>
                    <Grid container direction='column' spacing={1}>
                        <Grid item>
                            <table>
                                <tbody>
                                <tr>
                                    <td><Typography variant='body2' color='textSecondary'><Person/></Typography></td>
                                    <td><Typography variant='body1' color='textPrimary'>{user.firstName} {user.lastName} ({user.username})</Typography></td>
                                </tr>
                                <tr>
                                    <td><Typography variant='body2' color='textSecondary'><Room/></Typography></td>
                                    <td><Typography variant='body1' color='textPrimary'>{user.address.number} {user.address.street} {user.address.city} {user.address.postcode}</Typography></td>
                                </tr>
                                <tr>
                                    <td><Typography variant='body2' color='textSecondary'><Email/></Typography></td>
                                    <td><Typography variant='body1' color='textPrimary'>{user.email}</Typography></td>
                                </tr>
                                <tr>
                                    <td><Typography variant='body2' color='textSecondary'><PhoneAndroid/></Typography></td>
                                    <td><Typography variant='body1' color='textPrimary'>{user.phone}</Typography></td>
                                </tr>
                                </tbody>
                            </table>
                        </Grid>
                        <Grid item style={{alignSelf:'flex-end'}}>
                            <Button size='small' color='primary' onClick={openEdit}>Edit Profile</Button>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item sm={7} direction='column' container spacing={2}>
                <Grid item>
                    <Typography variant='h4' color='textSecondary' component='h4' gutterBottom>
                        My Posts
                    </Typography>
                    <Posts posts={myPosts} page={offSetMy+1} onPageChange={handlePageChangeMy} pageTotal={pageTotalMy}/>
                </Grid>
                <Grid item>
                    <Typography variant='h4' color='textSecondary' component='h4'  gutterBottom>
                        Watching
                    </Typography>
                    <Posts posts={watchings} page={offSetWatching+1} onPageChange={handlePageChangeWatchings} pageTotal={pageTotalWatching} />
                </Grid>
            </Grid>
        </Grid>
    )
}