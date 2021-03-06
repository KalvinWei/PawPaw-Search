import Banner from './components/Banner/Banner'
import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PostPlaza from "./components/PostPlaza/PostPlaza";
import UserPage from "./components/UserPage/UserPage";
import PostDetail from "./components/PostDetail/PostDetail";
import NewPost from "./components/NewPost/NewPost";
import HomePage from "./components/HomePage/HomePage";

function App() {

    return (
        <Router>
        <div>
                <Banner/>
                <Switch>
                    <Route exact path={'/'}>
                        <HomePage />
                    </Route>
                    <Route path='/PostPlaza'>
                        <PostPlaza/>
                    </Route>
                    <Route path='/MyPage'>
                        <UserPage/>
                    </Route>
                    <Route path='/posts/:id'>
                        <PostDetail />
                    </Route>
                    <Route path='/create-new-post'>
                        <NewPost/>
                    </Route>
                </Switch>
        </div>
        </Router>
    )
}

export default App;
