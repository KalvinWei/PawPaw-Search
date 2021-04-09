import React, {useContext, useState} from 'react'
import Posts from "../PostPlaza/Posts/Posts";
import axios from "axios";
import {AppContext} from "../../ContextProvider";

export default function UserPage(){
    const {sessionData} = useContext(AppContext)
    const user = sessionData.userAuth

    const [myPosts, setMyPosts] = useState(()=>{
        return axios.get(`/:${user.username}/posts/mine`)
            .then(res=>{ return res.data; })
            .catch(e=>{/*error handling*/})
    })

    const [myWatchings, setMyWatchings] = useState(()=>{
        return axios.get(`/:${user.username}/posts/watching`)
            .then(res=>{ return res.data; })
            .catch(e=>{/*error handling*/})
    })


    return (
        <div>
            <div className="userDetail">
                {/*TODO show details the current logged-in user. Also, contains button to allow user modify their info. */}
                <table>
                    {Object.keys(user).map(i=>{
                        <tr><td>{i}</td><td>{user[i]}</td></tr>
                    })}
                </table>
                <Posts />
            </div>
            <Posts searchIn="myPosts" />
        </div>
    )
}