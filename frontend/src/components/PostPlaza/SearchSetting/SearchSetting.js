import React, {useContext, useState} from 'react'
import {AppContext} from "../../../ContextProvider";

export default function SearchSetting(){
    //TODO: form elements supporting user to set some searching criteria.
    //TODO: NOTICE! should have some Context values to persist the criteria, <Posts> uses them to render
    const  {searchSetting, setSearch} = useContext(AppContext)


    return (
        <div style={{border:"1px solid grey"}}>
            <div>
                <label >postType:</label>
                <input type="text" value={searchSetting.postType} onInput={e => {setSearch(...searchSetting,e.target.value);}} />
            </div>
            <div>
                <label >petType.species:</label>
                <input type="text" value={searchSetting.petType.species} onInput={e => {setSearch(...searchSetting,e.target.value);}} />
            </div>
            <div>
                <label >petType.breed:</label>
                <input type="text" value={searchSetting.petType.breed} onInput={e => {setSearch(...searchSetting,e.target.value);}} />
            </div>
            <div>
                <label >petSize:</label>
                <input type="text" value={searchSetting.petSize} onInput={e => {setSearch(...searchSetting,e.target.value);}} />
            </div>
            <div>
                <label >petGender:</label>
                <input type="text" value={searchSetting.petGender} onInput={e => {setSearch(...searchSetting,e.target.value);}} />
            </div>
            <div>
                <label >petColor:</label>
                <input type="text" value={searchSetting.petColor} onInput={e => {setSearch(...searchSetting,e.target.value);}} />
            </div>
            <div>
                <label >rangeRadius:</label>
                <input type="text" value={searchSetting.rangeRadius} onInput={e => {setSearch(...searchSetting,e.target.value);}} />
            </div>
            <div>
                <label >keyword:</label>
                <input type="text" value={searchSetting.keyword} onInput={e => {setSearch(...searchSetting,e.target.value);}} />
            </div>
        </div>
    )
}