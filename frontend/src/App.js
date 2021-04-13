import Banner from './components/Banner/Banner'
import Dashboard from './components/Dashboard/Dashboard'
import React from "react";
import NewestPosts from "./components/NewestPosts/NewestPosts";
import {BrowserRouter as Router} from 'react-router-dom'

function App() {

    return (
        <Router>
        <div>
                <Banner/>
                <Dashboard/>
                <NewestPosts/>
        </div>
        </Router>
    )
}

export default App;
