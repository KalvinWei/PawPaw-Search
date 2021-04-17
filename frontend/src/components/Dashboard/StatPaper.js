import React from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function StatPaper({figure, item}) {
    return (
        <Grid item xs container direction="column">
                <Typography align='center' color='secondary' variant="h4">
                    {figure}
                </Typography>
                <Typography align='center' color='textSecondary' variant="button">
                    {item}
                </Typography>
        </Grid>
    )
}