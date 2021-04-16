import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PetImages from "./PetImages/PetImages";
import fromLatLng from "../../../../utils/geoCoding";

const useStyles = makeStyles({
    root: {
        width: 255,
        height: 355
    },
    media: {
        height: 140,
    },
    content: {
        flexGrow:1
    }
});

function PostCard({post}) {
    const lastSpot = post.trace[post.trace.length - 1]
    const history = useHistory()

    const [address, setAddress] = useState("")
    useEffect(() => {
        async function getAddress() {
            const addr = await fromLatLng(lastSpot.latitude, lastSpot.longitude)
            setAddress(addr)
        }

        getAddress()
    }, [])

    function showDetail() {
        history.push({pathname: `/posts/${post._id}`, state: post})
    }

    const classes = useStyles();
    return (
        <Card variant='outlined' className={classes.root}>
            <CardMedia
                className={classes.media}
                title={post.petName}
            ><PetImages urls={post.petImages}/></CardMedia>
            <CardContent className={classes.content}>
                <Typography gutterBottom variant="h5" component="h2">
                    {post.petName} is {post.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Last seen: {address}<br/>
                    {post.comment}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={showDetail}>
                    see details
                </Button>
            </CardActions>
        </Card>
    );
}

export default PostCard;