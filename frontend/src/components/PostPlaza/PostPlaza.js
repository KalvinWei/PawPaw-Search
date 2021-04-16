import React, {useContext, useEffect, useState} from "react";
import Posts from "./Posts/Posts";
import {AppContext} from "../../ContextProvider";
import SearchSetting from "./SearchSetting/SearchSetting";

export default function PostPlaza() {
    //for searching posts according to criteria
    const {fetchPostsBy} = useContext(AppContext)
    const [posts, setPosts] = useState(null)
    const [pageOffset, setPageOffset] = useState(0)
    const [searchSetting, setSearch] = useState({})
    const [pageTotal, setPageTotal] = useState(0)

    useEffect(()=>{
        const {posts, pageTotal:pageCount} = fetchPostsBy(searchSetting, 20, pageOffset)
        setPosts(posts)
        setPageTotal(pageCount)
    },[searchSetting, pageOffset])

    function handlePageChange(e, pageIndex){
        setPageOffset(pageIndex-1)
    }

    return (
        <div>
            <SearchSetting onSubmitSearch={setSearch}/>
            <Posts posts={posts} page={pageOffset+1} onPageChange={handlePageChange} pageTotal={pageTotal}/>
        </div>
    )
}