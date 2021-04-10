import React, {useContext, useState} from 'react'
import Posts from "../PostPlaza/Posts/Posts";
import {AppContext} from "../../ContextProvider";

export default function UserPage(){
    const {userAuth, myPosts, myWatchings} = useContext(AppContext)
    const user = userAuth.user

    return (
        <div>
            <div className="userDetail">
                {/*TODO show details the current logged-in user. Also, contains button to allow user modify their info. */}
                <table>
                    {Object.keys(user).map(i=> (<tr><td>{i}</td><td>{user[i]}</td></tr>))}
                </table>
            </div>
            <h1>Your posts</h1>
            <Posts posts={myPosts} />
            <h2>Posts you are watching</h2>
            <Posts posts={myWatchings} />
        </div>
    )
}