import React from 'react'
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

export default function Loading() {
    return (
        <Grid container justify='space-around' style={{flexGrow:1}}>
            <Typography variant='subtitle2' color='textSecondary'>
                LOADING...
            </Typography>
        </Grid>
    )
}