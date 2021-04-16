import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../ContextProvider";
import Posts from "../PostPlaza/Posts/Posts";

export default function UserPage(){
    const {loginUser, fetchPostsOf} = useContext(AppContext)
    const user = loginUser
    //TODO for testing
    delete user.address
    delete user.myPosts
    delete user.myWatchings

    //states for myPosts
    const [myPosts, setMyPosts] = useState(null)
    const [offSetMy, setOffsetMy] = useState(0)
    const [pageTotalMy, setPageTotalMy] = useState(0)
    useEffect(()=>{
        async function fetchData(){
            const {posts, pageTotal:pageCount} = await fetchPostsOf(20, offSetMy, 'mine')
            setMyPosts(posts)
            setPageTotalMy(pageCount)
        }
        fetchData()
    },[offSetMy])
    function handlePageChangeMy(pageIndex){
        setOffsetMy(pageIndex-1)
    }


    //states for myWatchings
    const [watchings, setWatchings] = useState(null)
    const [offSetWatching, setOffsetWatching] = useState(0)
    const [pageTotalWatching, setPageTotalWatching] = useState(0)
    useEffect(()=>{
        async function fetchData(){
            const {posts, pageTotal:pageCount}  = await fetchPostsOf(20, offSetWatching,'watching')
            setWatchings(posts)
            setPageTotalWatching(pageCount)
        }
        fetchData()
    }, [offSetWatching])
    function handlePageChangeWatchings(pageIndex){
        setOffsetWatching(pageIndex-1)
    }


    return (
        <div>
            <div>
                {/*TODO show details the current logged-in user. Also, contains button to allow user modify their info. */}
                <table>
                    <tbody>
                    {Object.keys(user).map(key=> <tr key={key}><td>{key}</td><td>{user[key]}</td></tr>)}
                    </tbody>
                </table>
            </div>
            <h1>Your posts</h1>
            <Posts posts={myPosts} page={offSetMy+1} onPageChange={handlePageChangeMy} pageTotal={pageTotalMy}/>
            <h2>Posts you are watching</h2>
            <Posts posts={watchings} page={offSetWatching+1} onPageChange={handlePageChangeWatchings} pageTotal={pageTotalWatching} />
        </div>
    )
}