import React from 'react'
import Posts from "../PostPlaza/Posts/Posts";

export default function UserPage(){
    return (
        <div>
            <div className="userDetail">
                {/*TODO show details the current logged-in user. Also, contains button to allow user modify their info. */}
            </div>
            <Posts searchIn="myPosts" />
        </div>
    )
}