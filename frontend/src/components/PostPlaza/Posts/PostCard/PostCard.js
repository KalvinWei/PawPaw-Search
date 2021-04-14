import React from "react";
import {useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PetImages from "./PetImages/PetImages";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function PostCard({post}) {
    const lastSpot = post.trace[post.trace.length-1]
    const history = useHistory()

    function showDetail(){
        history.push(`/posts/${post._id}`)
    }

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    component={<PetImages urls={post.petImages}/>}
                    title={post.petName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {post.petName} is {post.status}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Last seen: {lastSpot.longitude} {lastSpot.latitude}<br />
                        {post.comment}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={showDetail}>
                    see details
                </Button>
            </CardActions>
        </Card>
    );
}

export default PostCard;