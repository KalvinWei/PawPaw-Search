import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import PetImages from "./PetImages/PetImages";
import fromLatLng from "../../../../utils/geoCoding";
import {CardHeader} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 255,
        height: 355
    },
    media: {
        height: 140,
    },
    content: {
        height: 120
    },
    cardHeader: {
        ...theme.typography.caption,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    briefTable: {
        marginTop: 5,
        borderSpacing: 5,
        '& tr:first-child':{
            fontWeight:'bold'
        },
        '& tr:first-child > td:nth-child(2)':{
            fontSize:16
        }

    },
    dt: {
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: "darkgrey",
        textAlign: 'right',
        width: '30%',
        paddingRight: 8,
        verticalAlign: "baseline"
    },
    dd: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        color: '#444',
        width: '70%',
        verticalAlign: "baseline"
    },
    action:{
        alignItems:'right'
    }
}));

function getLast(post) {
    return post.trace[post.trace.length - 1]
}

function PostCard({post}) {
    const classes = useStyles();
    const lastSpot = post.trace[post.trace.length - 1]
    const history = useHistory()

    const [address, setAddress] = useState("")
    useEffect(() => {
        async function getAddress() {
            const addr = await fromLatLng(lastSpot.latitude, lastSpot.longitude)
            const place_name = addr.features[0].place_name
            const index = place_name.indexOf(',', place_name.indexOf(',')+1)
            setAddress(place_name.substring(0,index))
        }

        getAddress()
    }, [])

    function showDetail() {
        history.push(`/posts/${post._id}`)
    }

    const statusColor = post.status === 'Reunited' ? 'grey' : (post.status === 'Lost' ? 'coral' : 'green')
    const GRADIENT_LOST = {background:`linear-gradient(25deg, rgba(255,127,80,0.2) 0%, rgba(254,226,215,0) 21%, rgba(255,255,255,1) 100%)`}
    const GRADIENT_FOUND = {background:'linear-gradient(25deg, rgba(59,167,48,0.2) 0%, rgba(239,255,234,0) 21%, rgba(255,255,255,1) 100%)'}
    const GRADIENT_REUNITED = {background: 'linear-gradient(25deg, rgba(191,191,191,0.5) 0%, rgba(236,236,236,0) 21%, rgba(255,255,255,1) 100%)'}
    const background = post.status === 'Reunited' ? GRADIENT_REUNITED : (post.status === 'Lost' ? GRADIENT_LOST : GRADIENT_FOUND)

    return (
        <Card variant='outlined' className={classes.root} style={background}>
            <CardHeader
                title={<div className={classes.cardHeader}
                            style={{
                    width: '100%', backgroundColor: statusColor, color: 'white'}}>{post.status}</div>}
                style={{padding: 0}}
            />
            <CardMedia
                className={classes.media}
                title={post.petName}
            >
                <PetImages urls={post.petImages}/>
            </CardMedia>
            <CardContent className={classes.content}>
                <table className={classes.briefTable}>
                    <tbody>
                    <tr>
                        <td className={classes.dt}></td>
                        <td className={classes.dd} style={{textTransform:'capitalize'}}>{post.petName}</td>
                    </tr>
                    <tr>
                        <td className={classes.dt}>BREED</td>
                        <td className={classes.dd}>{post.petType.species} / {post.petType.breed}</td>
                    </tr>
                    <tr>
                        <td className={classes.dt}>COLOR</td>
                        <td className={classes.dd}>{post.petColor}</td>
                    </tr>
                    <tr>
                        <td className={classes.dt}>LAST SEEN</td>
                        <td className={classes.dd}>
                            {address} &nbsp;
                            <span style={{color:'darkgrey'}}>{(new Date(getLast(post).timestamp)).toLocaleString().replace(',','  ')}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </CardContent>
            <CardActions className={classes.action}>
                <Grid container justify='flex-end'>
                    <Button size="small" variant='outlined' style={{fontSize:12}} color="default" onClick={showDetail}>
                        see details
                    </Button>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default PostCard;