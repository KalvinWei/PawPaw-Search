import React, {useEffect, useState} from 'react'
import Button from "@material-ui/core/Button";
import {FormControl, FormHelperText, InputLabel, Paper, Select, Slider, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {
    SentimentSatisfiedTwoTone,
    SentimentVeryDissatisfiedTwoTone,
    SentimentVerySatisfiedTwoTone
} from "@material-ui/icons";

export default function SearchSetting({onSubmitSearch}) {
    //TODO: form elements supporting user to set some searching criteria.
    //TODO: NOTICE! should have some Context values to persist the criteria, <Posts> uses them to render
    const [settings, setSettings] = useState({
        status: "All",
        petBreed: "All",
        petSize: "All",
        petGender: "All",
        petColor: "All",
        //use Geolocation API to fetch current user's location,
        // and search in an area of the given radius
        originLatLng: [],
        rangeRadius: 0,
        //use keyword to search in petName, collarTagDescription, comment
        keywords: ""
    })

    function modifySettings(field) {
        setSettings({...settings, ...field})
    }

    useEffect(()=>{
        async function getCoords(){
            await navigator.geolocation.getCurrentPosition((geolocation)=>{
                const {latitude: lat, longitude: lng} = geolocation.coords
                setSettings({...settings, originLatLng: [lat, lng]})
            },()=>{
                console.log('Failed to get the current geolocation info.')
            })
        }
        getCoords()
    },[])

    function submitSearch() {
        if(settings.originLatLng.length === 0){
            alert('Geolocation search will not run according to the radius due to a failure to get your current location.')
        }
        onSubmitSearch(settings)
    }

    return (
        <Paper style={{marginRight:20,padding: 15, width:320}} variant={"outlined"}>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <ToggleButtonGroup
                        value={settings.status}
                        defaultValue='All'
                        exclusive
                        size='small'
                        onChange={(e, newVal) => {
                            modifySettings({status: newVal})
                        }}
                    >
                        <ToggleButton value='All'>
                            <strong>All</strong>
                        </ToggleButton>
                        <ToggleButton value='Lost'>
                            <SentimentVeryDissatisfiedTwoTone/>Lost
                        </ToggleButton>
                        <ToggleButton value='Found'>
                            <SentimentSatisfiedTwoTone/>Found
                        </ToggleButton>
                        <ToggleButton value='Reunited'>
                            <SentimentVerySatisfiedTwoTone/>Reunited
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item>
                    <FormControl size='small' fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select native
                                value={settings.petBreed}
                                onChange={(e)=>{
                                    const breed = e.target.value
                                    modifySettings({petBreed:breed})
                                }}
                        >
                            <option aria-label="None" value="All">All</option>
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
                <Grid item>
                    <FormControl size='small' fullWidth>
                        <InputLabel>Size</InputLabel>
                        <Select native
                                value={settings.petSize}
                                onChange={(e)=>{
                                    modifySettings({petSize:e.target.value})
                                }}
                        >
                            <option aria-label="None" value="All">All</option>
                            <option value='Small'>Small</option>
                            <option value='Medium'>Medium</option>
                            <option value='Big'>Big</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl size='small' fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select native
                                value={settings.petGender}
                                onChange={(e)=>{
                                    modifySettings({petGender:e.target.value})
                                }}
                        >
                            <option aria-label="None" value="All">All</option>
                            <option value='Unknown'>Unknown</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl size='small' fullWidth>
                        <InputLabel>Color</InputLabel>
                        <Select native
                                value={settings.petColor}
                                onChange={(e)=>{
                                    modifySettings({petColor:e.target.value})
                                }}
                        >
                            <option aria-label="None" value="All">All</option>
                            <option value='Mixed'>Mixed</option>
                            <option value='Black'>Black</option>
                            <option value='Brown'>Brown</option>
                            <option value='White'>White</option>
                            <option value='Grey'>Grey</option>
                            <option value='Golden'>Golden</option>
                            <option value='Ginger'>Ginger</option>
                            <option value='Lilac'>Lilac</option>
                            <option value='Red'>Red</option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl size='small' fullWidth>
                        <InputLabel>Search Radius</InputLabel>
                        <Select native
                                value={settings.rangeRadius}
                                onChange={(e)=>{
                                    modifySettings({rangeRadius:e.target.value})
                                }}
                        >
                            <option aria-label="None" value="0">Not Specified</option>
                            <option value={1}>1KM</option>
                            <option value={2}>2KM</option>
                            <option value={5}>5KM</option>
                            <option value={10}>10KM</option>
                        </Select>
                        <FormHelperText>This feature asks for your current location</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField id="standard-basic"
                               fullWidth
                               value={settings.keywords}
                               label="Keywords"
                               placeholder='blacks to divide words'
                               onChange={(e)=>{
                                   modifySettings({keywords:e.target.value})
                               }}
                    />
                    <FormHelperText>search in <strong>post comment</strong>, <strong>tag decription</strong> and <strong>post title</strong></FormHelperText>
                </Grid>
                <Grid item alignItems='center' >
                    <Button style={{width:'100%'}} variant='contained' color='primary' onClick={submitSearch}>Submit search</Button>
                </Grid>
            </Grid>
        </Paper>

    )
}