import React, {useState} from 'react'

export default function SearchSetting({onSubmitSearch}){
    //TODO: form elements supporting user to set some searching criteria.
    //TODO: NOTICE! should have some Context values to persist the criteria, <Posts> uses them to render
    const [settings, setSettings] = useState({
        postType:"",
        petSpecies:"",
        petBreed:"",
        petSize:"",
        petGender:"",
        petColor:"",
        //use Geolocation API to fetch current user's location,
        // and search in an area of the given radius
        rangeRadius:0,
        //use keyword to search in petName, collarTagDescription, comment
        keyword:""
    })

    function modifySettings(field){
        setSettings({...settings, ...field})
    }

    function submitSearch(){
        onSubmitSearch(settings)
    }

    return (
        <div style={{border:"1px solid grey"}}>
            <div>
                <label >postType:</label>
                <input type="text" value={settings.postType} onInput={e=>modifySettings({postType:e.target.value})} />
            </div>
            <div>
                <label >petType.species:</label>
                <input type="text" value={settings.petSpecies} onInput={e=>modifySettings({petSpecies:e.target.value})} />
            </div>
            <div>
                <label >petType.breed:</label>
                <input type="text" value={settings.petBreed} onInput={e=>modifySettings({petBreed:e.target.value})}  />
            </div>
            <div>
                <label >petSize:</label>
                <input type="text" value={settings.petSize} onInput={e=>modifySettings({petSize:e.target.value})}  />
            </div>
            <div>
                <label >petGender:</label>
                <input type="text" value={settings.petGender} onInput={e=>modifySettings({petGender:e.target.value})}  />
            </div>
            <div>
                <label >petColor:</label>
                <input type="text" value={settings.petColor} onInput={e=>modifySettings({petColor:e.target.value})} />
            </div>
            <div>
                <label >rangeRadius:</label>
                <input type="text" value={settings.rangeRadius} onInput={e=>modifySettings({rangeRadius:e.target.value})}  />
            </div>
            <div>
                <label >keyword:</label>
                <input type="text" value={settings.keyword} onInput={e=>modifySettings({keyword:e.target.value})}  />
            </div>
            <button onClick={submitSearch} >Submit search</button>
        </div>
    )
}