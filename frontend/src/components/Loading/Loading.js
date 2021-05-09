import React from 'react'
import Grid from "@material-ui/core/Grid";

export default function Loading() {
    return (
        <Grid container justify='space-around' >
            <div style={{position:'relative', top:'200px'}}>
                <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} style={{width:200, margin:'0 auto'}}/>
                <h2 style={{fontFamily:'Helvetica', color:'skyblue', textAlign:'center'}}>NOW LOADING</h2>
            </div>
        </Grid>
    )
}