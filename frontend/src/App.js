import Banner from './components/Banner/Banner'
import Dashboard from './components/Dashboard/Dashboard'
import React from "react";
import NewestPosts from "./components/NewestPosts/NewestPosts";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import PostPlaza from "./components/PostPlaza/PostPlaza";
import UserPage from "./components/UserPage/UserPage";
import PostDetail from "./components/PostDetail/PostDetail";
import NewPost from "./components/NewPost/NewPost";

function App() {

    return (
        <Router>
        <div>
                <Banner/>
                <Switch>
                    <Route exact path={'/'}>
                        <Dashboard/>
                        <NewestPosts/>
                    </Route>
                    <Route path='/PostPlaza'>
                        <PostPlaza/>
                    </Route>
                    <Route path='/MyPage'>
                        <UserPage/>
                    </Route>
                    <Route path='/posts/:id'>
                        <PostDetail/>
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
