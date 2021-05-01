import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StatPaper from "./StatPaper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin:20
    },
    paper: {
        padding: '0 ' + theme.spacing(2),
        margin: 'auto',
        width: 155,
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    //all statistical data are stored in context value "dashboard".
    const {dashboard} = useContext(AppContext)

    return (
        <div className={classes.root}>
            <Grid container justify='center' spacing={3}>
                {dashboard && Object.keys(dashboard).map(key =>
                    <Grid key={key} item>
                        <Paper className={classes.paper}>
                            <StatPaper figure={dashboard[key]} item={key}/>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}


