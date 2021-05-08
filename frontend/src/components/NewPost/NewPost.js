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
    const {loginUser, createPost} = useContext(AppContext)

    const [post, setPost] = useState(() => {
        return {
            //poster to be added
            poster: loginUser._id,
            petName: "",
            petImages: [],
            //backend needs to translate breed to petType{species, breed}
            petBreed: "Other",
            petColor: "Mixed",
            petSize: "Small",
            isMicrochipped: "Unknown",
            microchipNumber: "",
            petGender: "Unknown",
            desexed: "Unknown",
            collarTagDescription: '',
            comment: '',
            status: 'Lost',
            trace: []
        }
    })

    useEffect(()=>{
        console.log('post changed')
        console.log(post)
    },[post])

    function setImages(filename) {
        if(!post.petImages.includes(filename))
            setPost({...post, petImages: [...post.petImages,filename]})
    }

    const history = useHistory()

    function handleCancel() {
        history.push('/')
    }

    async function handleSubmit() {
        const savedPost = await createPost(post)
        if (savedPost) {
            history.push({
                pathname: `/posts/${savedPost._id}`,
                state: savedPost
            })
        }

    }


    return (
        <Paper variant='outlined'
               style={{margin: '20px auto', width: 600, padding: 20}}
        >
            <Grid container direction='column' spacing={2} >
                <Grid item container direction='column' spacing={2}>
                    <Grid item container justify='center'>
                        <Grid item>
                            <ToggleButtonGroup
                                value={post.status}
                                defaultValue='Lost'
                                exclusive
                                size='small'
                                onChange={(e,newVal) => {
                                    setPost({...post, status: newVal})
                                }}
                            >
                                <ToggleButton value='Lost' style={{width: 100}}>
                                    <SentimentVeryDissatisfiedTwoTone/>Lost
                                </ToggleButton>
                                <ToggleButton value='Found' style={{width: 100}}>
                                    <SentimentSatisfiedTwoTone/>Found
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid item>
                            <LocalSearch post={post} setPost={setPost}/>
                    </Grid>
                    <Grid item >
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Pet Name"
                            type="text"
                            required={true}
                            fullWidth
                            value={post.petName}
                            onChange={e => {
                                setPost({...post, petName: e.target.value})
                            }}
                        />
                    </Grid>
                    <Grid item >
                        <FormControl size='small' fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select native
                                    required={true}
                                    value={post.petBreed}
                                    onChange={e => setPost({...post, petBreed: e.target.value})}
                            >
                                <optgroup label='Dog'>
                                    <option value='Husky'>Husky</option>
                                    <option value='Poodle'>Poodle</option>
                                    <option value='Akita'>Akita</option>
                                    <option value='Golden Retriever'>Golden Retriever</option>
                                    <option value='Australian Shepherd'>Australian Shepherd</option>
                                    <option value='Boxer'>Boxer</option>
                                    <option value='Bulldog'>Bulldog</option>
                                    <option value='Other'>Other</option>
                                </optgroup>
                                <optgroup label="Cat">
                                    <option value='Cheetoh'>Cheetoh</option>
                                    <option value='Birman'>Birman</option>
                                    <option value='Bengal'>Bengal</option>
                                    <option value='Siamese'>Siamese</option>
                                    <option value='Persian'>Persian</option>
                                    <option value='Maine Coon'>Maine Coon</option>
                                    <option value='Other'>Other</option>
                                </optgroup>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item >
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
                    <Grid item >
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
                    <Grid item >
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
                    <Grid item >
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
                    <Grid item >
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
                    <Grid item >
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
                    <Grid item >
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
                    <Grid item >
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Comment"
                            required={true}
                            type="text"
                            fullWidth
                            value={post.comment}
                            onChange={e => {
                                setPost({...post, comment: e.target.value})
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <ImageUploader onChangeImages={setImages}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <FormHelperText style={{textAlign:'right'}}>
                    REMINDER: pet name, comment, and address are required to submit
                </FormHelperText>
            </Grid>
            <Grid item container justify='flex-end' spacing={2}>
                <Grid item>
                    <Button color='primary' size='small' variant='contained'
                            onClick={handleSubmit}
                            style={{color:'white'}}
                            disabled={!post.petName || !post.comment ||  post.trace.length === 0}
                    >Submit</Button>
                </Grid>
                <Grid item>
                    <Button color='default'  size='small' variant='contained'
                            onClick={handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
