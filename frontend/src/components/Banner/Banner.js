import React, {useContext} from 'react';
import {AppContext} from "../../ContextProvider";
import {Link, NavLink, Route, Switch, useHistory, useLocation} from 'react-router-dom'
import LoginDialog from "../Dialogs/LoginDialog/LoginDialog";
import SignUpDialog from "../Dialogs/SignUpDialog/SignUpDialog";


export default function Banner() {
    const {loginUser, clearSession} = useContext(AppContext)

    const history = useHistory()
    const {pathname} = useLocation()

    const logout = ()=>{
        clearSession()
        history.push("/")
    }

    return (
        <div className="banner">
            <div><h1>Our logo here</h1></div>
            <nav>
                <NavLink to='/PostPlaza'>Post Plaza</NavLink>
                {loginUser ? <NavLink to='/MyPage'>My Page</NavLink> : null}
                {loginUser ?
                    <div>
                        <span>welcome! {loginUser.firstName + " " + loginUser.lastName}</span>
                        <button onClick={logout}>log out</button>
                    </div> :
                    <div>
                        <Link to={`/login`}>log in</Link><br/>
                        <Link to={`/sign-up`}>sign up</Link>
                    </div>}
            </nav>
            <Switch>
                <Route path={`/login`}>
                    <LoginDialog/>
                </Route>
                <Route path={`/sign-up`}>
                    <SignUpDialog/>
                </Route>
            </Switch>
        </div>
    );
}