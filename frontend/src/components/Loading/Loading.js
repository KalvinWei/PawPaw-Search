import React from 'react'
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

export default function Loading() {
    return (
        <Grid container justify='space-around' >
            <Typography variant='h6' color='textSecondary' style={{position:'relative', top:'200px'}}>
                LOADING...
            </Typography>
        </Grid>
    )
}