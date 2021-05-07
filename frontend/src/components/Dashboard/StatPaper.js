import React from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function StatPaper({figure, item}) {
    return (
        <Grid item xs container alignItems='center' direction='row' spacing={1} wrap='nowrap'
            style={{backdropFilter:'blur(5px)', background:'#eees', borderRadius:10, margin:'2px 5px'}}>
            <Grid item>
                <Typography align='center' variant="h4" style={{color:'#666'}}>
                    {figure}
                </Typography>
            </Grid>
            <Grid item>
                <Typography align='center'  variant='overline' noWrap>
                    {item}
                </Typography>
            </Grid>
        </Grid>
    )
}