import React, {useContext, useEffect, useState} from "react";
import Posts from "./Posts/Posts";
import axios from "axios";
import {AppContext} from "../../ContextProvider";

export default function PostPlaza() {
    const {searchSetting}  = useContext(AppContext)
    const [pageOffset, setPageOffset] = useState(0)
    useEffect(()=>{
        async function updatePosts(){
            await axios.get('/posts',{
                headers:{
                    searchCriteria:searchSetting,
                    countPerPage:20,
                    pageOffset:pageOffset
                }
            })
                .then(res=>setRetrieved(res.data))
                .catch(e=>console.log())
        }
        updatePosts()
    },[searchSetting, pageOffset])

    return (
        <div>
            <SearchSetting/>
            <Posts />
        </div>
    )
}