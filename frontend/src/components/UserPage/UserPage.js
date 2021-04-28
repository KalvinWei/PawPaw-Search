import React, {useContext, useState} from 'react'
import Posts from "../PostPlaza/Posts/Posts";
import {AppContext} from "../../ContextProvider";

export default function UserPage(){
    const {userAuth, myPosts, myWatchings} = useContext(AppContext)
    const user = userAuth.user

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
                            <Button size='small' color='primary' >Edit Profile</Button>
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