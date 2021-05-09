import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StatPaper from "./StatPaper";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    //all statistical data are stored in context value "dashboard".
    const {dashboard} = useContext(AppContext)

    return (
        <div className={classes.root}>
            <Grid container justify='space-evenly' spacing={3} alignContent='center' wrap='nowrap'>
                <StatPaper figure={dashboard.userTotal} item='TOTAL USER'/>
                <StatPaper figure={dashboard.foundTotal} item='TOTAL FOUND'/>
                <StatPaper figure={dashboard.lostTotal} item='TOTAL LOST'/>
                <StatPaper figure={dashboard.reunionTotal} item='TOTAL REUNITED'/>
                <StatPaper figure={dashboard.foundToday} item='FOUND TODAY'/>
                <StatPaper figure={dashboard.lostToday} item='LOST TODAY'/>
                <StatPaper figure={dashboard.reunionToday} item='REUNITED TODAY'/>
            </Grid>
        </div>
    );
}


