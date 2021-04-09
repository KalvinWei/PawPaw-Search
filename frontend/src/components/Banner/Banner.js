import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";


export default function Banner(){

    const {sessionData} = useContext(AppContext)
    const {isValidUser, user} = sessionData.userAuth

    return (
    <div className="banner">
        <div><h1>Our logo here</h1></div>
        <nav><ul>
            <li>All posts</li>
            <li>My page</li>
        </ul></nav>
        {isValidUser ? <div><span>welcome! `{user.name}`</span></div> : <div><a>log in</a><a>sign up</a></div>}
    </div>
    );
}