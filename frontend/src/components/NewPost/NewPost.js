import React, {useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {FormControl, FormHelperText, InputLabel, makeStyles, Paper, Select} from "@material-ui/core";
import {AppContext} from "../../ContextProvider";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {
    SentimentSatisfiedTwoTone,
    SentimentVeryDissatisfiedTwoTone
} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ImageUploader from '../../utils/FilePond/FilePond'
import LocalSearch from "../../utils/LocalSearch";


export default function NewPost() {
    const {loginUser} = useContext(AppContext)

    const [post, setPost] = useState(() => {
        return {
            //poster to be added
            poster: loginUser._id,
            petName: "",
            petImages: [],
            //backend needs to translate breed to petType{species, breed}
            petBreed: "",
            petColor: "Mixed",
            petSize: "Medium",
            isMicrochipped: "Unknown",
            microchipNumber: "",
            petGender: "Male",
            desexed: "",
            collarTagDescription: '',
            comment: '',
            status: 'Lost',
            trace: []
        }
    })

    function setImages(images){
        setPost({...post, petImages: images})
    }

    const history = useHistory()

    function handleCancel() {
        history.goBack()
    }

    async function handleSubmit() {
        return null;
    }



    return (
        <Paper variant='outlined'
               style={{margin: '20px auto', width: 500, padding: 20}}
        >
            <Grid container direction='column' spacing={2} gutterBottom>
                <Grid item container direction='column' spacing={2}>
                    <Grid item gutterBottom container spacing={3} justify='space-between'>
                        <Grid item>
                            <ToggleButtonGroup
                                value={post.status}
                                exclusive
                                size='small'
                                onChange={e => {
                                    setPost({...post, status: e.target.value})
                                }}
                            >
                                <ToggleButton value='Lost' style={{width:100}}>
                                    <SentimentVeryDissatisfiedTwoTone/>&nbsp; Lost
                                </ToggleButton>
                                <ToggleButton value='Found' style={{width:100}}>
                                    <SentimentSatisfiedTwoTone/>&nbsp; Found
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item>
                            <LocalSearch post={post} setPost={setPost}/>
                            <FormHelperText style={{textAlign:'right'}}>last seen address{post.trace[0] && `: ${post.trace[0].latitude},${post.trace[0].longitude}`}&nbsp;&nbsp;</FormHelperText>
                            <FormHelperText style={{textAlign:'right'}}></FormHelperText>
                        </Grid>
                    </Grid>
                    <Grid item gutterBottom>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Pet Name"
                            type="text"
                            fullWidth
                            value={post.petName}
                            onChange={e => {
                                setPost({...post, petName: e.target.value})
                            }}
                        />
                    </Grid>
                    <Grid item gutterBottom>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select native
                                    value={post.petBreed}
                                    onChange={e => setPost({...post, petBreed: e.target.groupName})}
                            >
                                <optgroup label='Dog'>
                                    <option value='Husky'>Husky</option>
                                    <option value='Poodle'>Poodle</option>
                                    <option value='Akita'>Akita</option>
                                    <option value='Golden Retriever'>Golden Retriever</option>
                                </optgroup>
                                <optgroup label="Cat">
                                    <option value='Cheetoh'>Cheetoh</option>
                                    <option value='Birman'>Birman</option>
                                </optgroup>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item gutterBottom>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Fur Color</InputLabel>
                            <Select native
                                    value={post.petColor}
                                    onChange={e => setPost({...post, petColor: e.target.value})}
                            >
                                <option value='Black'>Black</option>
                                <option value='Brown'>Brown</option>
                                <option value='White'>White</option>
                                <option value='Grey'>Grey</option>
                                <option value='Golden'>Golden</option>
                                <option value='Lilac'>Lilac</option>
                                <option value='Ginger'>Ginger</option>
                                <option value='Red'>Red</option>
                                <option value='Mixed'>Mixed</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item gutterBottom>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Size</InputLabel>
                            <Select native
                                    value={post.petSize}
                                    onChange={e => setPost({...post, petSize: e.target.value})}
                            >
                                <option value='Small'>Small</option>
                                <option value='Medium'>Medium</option>
                                <option value='Big'>Big</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item gutterBottom>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select native
                                    value={post.petGender}
                                    onChange={e => setPost({...post, petGender: e.target.value})}
                            >
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Unknown'>Unknown</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item gutterBottom>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Desexing Status</InputLabel>
                            <Select native
                                    value={post.desexed}
                                    onChange={e => setPost({...post, desexed: e.target.value})}
                            >
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                                <option value='Unknown'>Unknown</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item gutterBottom>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Microchip Status</InputLabel>
                            <Select native
                                    value={post.isMicrochipped}
                                    onChange={e => {
                                        const mStatus = e.target.value
                                        const number = mStatus !== 'Yes' ? "" : post.microchipNumber
                                        setPost({...post, isMicrochipped: mStatus, microchipNumber: number})
                                    }
                                    }
                            >
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                                <option value='Unknown'>Unknown</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    {post.isMicrochipped === 'Yes' &&
                        <Grid item gutterBottom>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Microchip Number"
                        type="text"
                        fullWidth
                        value={post.microchipNumber}
                        onChange={e => {
                            setPost({...post, microchipNumber: e.target.value})
                        }}
                    />
                        </Grid>
                    }
                    <Grid item gutterBottom>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Collar Tag Description"
                            type="text"
                            fullWidth
                            value={post.collarTagDescription}
                            onChange={e => {
                                setPost({...post, collarTagDescription: e.target.value})
                            }}
                        />
                    </Grid>
                    <Grid item gutterBottom>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Comment"
                            type="text"
                            fullWidth
                            value={post.comment}
                            onChange={e => {
                                setPost({...post, comment: e.target.value})
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <ImageUploader images={post.petImages} onChangeImages={setImages}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container justify='flex-end' spacing={2}>
                <Grid item>
                    <Button color='primary' style={{width:100}} size='small' variant='contained' onClick={handleSubmit}>Submit</Button>
                </Grid>
                <Grid item>
                    <Button color='default'  style={{width:100}}  size='small' variant='contained' onClick={handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
