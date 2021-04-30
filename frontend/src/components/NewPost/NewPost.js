import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Card, Container, FormControl, InputLabel, Paper, Select} from "@material-ui/core";
import {PetColor, PetGender, PetSize, PostStatus} from "../../../../backend/src/db/schemas/PostSchema";
import {AppContext} from "../../ContextProvider";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {
    SentimentSatisfiedTwoTone,
    SentimentVeryDissatisfiedTwoTone,
    SentimentVerySatisfiedTwoTone
} from "@material-ui/icons";

export default function NewPost() {
    const {loginUser} = useContext(AppContext)

    const [post, setPost] = useState(() => {
        return {
            //poster to be added
            poster: loginUser._id,
            petName: "",
            //petImages to be added
            petBreed: "",
            petImages: [],
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

    return (
        <Container maxWidth={800}>
            <Paper variant='outlined'>
                <ToggleButtonGroup
                    value={post.status}
                    exclusive
                    size='small'
                    onChange={e => {
                        setPost({...post, status: e.target.value})
                    }}
                >
                    <ToggleButton value='Lost'>
                        <SentimentVeryDissatisfiedTwoTone/>Lost
                    </ToggleButton>
                    <ToggleButton value='Found'>
                        <SentimentSatisfiedTwoTone/>Found
                    </ToggleButton>
                </ToggleButtonGroup>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Pet Name"
                    type="text"
                    fullWidth
                    value={post.petName}
                    onChange={() => {
                        setPost({...post, petName: e.target.value})
                    }}
                />
                <FormControl size='small'>
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
                <FormControl size='small'>
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
                <FormControl size='small'>
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
                <FormControl size='small'>
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
                <FormControl size='small'>
                    <InputLabel>Gender</InputLabel>
                    <Select native
                            value={post.desexed}
                            onChange={e => setPost({...post, desexed: e.target.value})}
                    >
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                        <option value='Unknown'>Unknown</option>
                    </Select>
                </FormControl>
                <FormControl size='small'>
                    <InputLabel>Microchip status</InputLabel>
                    <Select native
                            value={post.isMicrochipped}
                            onChange={e => {
                                const mStatus = e.target.value
                                const number = mStatus !== 'Yes'? "": post.microchipNumber
                                setPost({...post, isMicrochipped: mStatus, microchipNumber: number})
                                }
                            }
                    >
                        <option value='Yes'>Male</option>
                        <option value='No'>Female</option>
                        <option value='Unknown'>Unknown</option>
                    </Select>
                </FormControl>
                {post.isMicrochipped === 'Yes' &&
                <TextField
                    autoFocus
                    margin="dense"
                    label="Microchip Number"
                    type="text"
                    fullWidth
                    value={post.microchipNumber}
                    onChange={e=>{setPost({...post, microchipNumber: e.target.value})}}
                />
                }
                <TextField
                    autoFocus
                    margin="dense"
                    label="Collar tag description"
                    type="text"
                    fullWidth
                    value={post.collarTagDescription}
                    onChange={() => {
                        setPost({...post, collarTagDescription: e.target.value})
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Pet Name"
                    type="text"
                    fullWidth
                    value={post.comment}
                    onChange={() => {
                        setPost({...post, comment: e.target.value})
                    }}
                />


            </Paper>
        </Container>
    );
}
