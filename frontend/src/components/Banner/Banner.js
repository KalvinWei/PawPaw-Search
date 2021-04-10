import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";
import {Link, NavLink, Route, Switch, useRouteMatch} from 'react-router-dom'
import LoginDialog from "../Dialogs/LoginDialog/LoginDialog";


export default function Banner() {
    const {userAuth} = useContext(AppContext)
    const {isValidUser, user} = userAuth

    const {url, path} = useRouteMatch()


    return (
        <div className="banner">
            <div><h1>Our logo here</h1></div>
            <nav>
                <NavLink to='\PostPlaza'>Post Plaza</NavLink>
                {isValidUser ? <NavLink to='\MyPage'>My Page</NavLink> : null}
            </nav>
            {isValidUser ? <div><span>welcome! `{user.name}`</span></div> :
                <div><Link to={`${url}/login`}>log in</Link><Link to={`${url}/sign-up`}>sign up</Link></div>}
            <Switch>
                <Route path={`${path}/login`}>
                    <LoginDialog/>
                </Route>
            </Switch>
            <Switch>
                <Route path={`${path}/sign-up`}>
                    <SignUpDialog/>
                </Route>
            </Switch>
        </div>
    );
}