import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";


export default function Banner(){

    const {userAuth} = useContext(AppContext)
    const {isValidUser, user} = userAuth

    return (
    <div className="banner">
        <div><h1>Our logo here</h1></div>
        <nav><ul>
            <li>Post Plaza</li>
            {isValidUser? <li>My page</li>: null}
        </ul></nav>

        {isValidUser ? <div><span>welcome! `{user.name}`</span></div> :
            <div><a>log in</a><a>sign up</a></div>}
    </div>
    );
}