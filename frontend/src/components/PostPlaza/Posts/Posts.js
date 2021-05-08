import PostCard from "./PostCard/PostCard";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Pagination} from "@material-ui/lab";
import {Typography} from "@material-ui/core";
import React from "react";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Posts({posts, pageTotal, page, onPageChange}){
    //TODO: here should be a paginated div to show posts(which are <PostCard>s) meeting the search criteria.
    const classes = useStyles();

    return (
        (!posts || posts.length ===0) ?
            <Typography align={"center"} variant='h6'
                        style={{
                            boxShadow:'-5 -5 3 grey',
                            height:300,
                            marginTop:5,
                            marginBottom:20
                        }}
                        color='textSecondary'
            >
                <span style={{position: 'relative', top:'50%'}}>Sometimes, empty means nothing bad...</span>
            </Typography>
            :
            <div className={classes.root}>
                <Grid container spacing={2}>
                        {posts.map(post =>
                            <Grid item key={post._id}>
                            <PostCard post={post}/>
                            </Grid>
                        )}
                </Grid>
                {pageTotal <= 1 ||
                <Pagination
                    count={pageTotal}
                    page={page}
                    variant="outlined"
                    color="primary"
                    onChange={onPageChange} />}

            </div>
    )
}