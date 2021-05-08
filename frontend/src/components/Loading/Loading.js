import React from 'react'
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

export default function Loading() {
    return (
        <Grid container justify='space-around' >
            <div style={{position:'relative', top:'200px'}}>
                <img src={`${process.env.PUBLIC_URL}/assets/loading.gif`} width={100}/>
            </div>
        </Grid>
    )
}