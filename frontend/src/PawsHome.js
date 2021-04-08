import Banner from './components/Banner/Banner'
import Dashboard from './components/Dashboard/Dashboard'
import React from "react";
import NewestPosts from "./components/NewestPosts/NewestPosts";

function PawsHome() {

    return (
        <div>
            <Banner/>
            <Dashboard/>
            <NewestPosts/>
        </div>
    );
}

export default PawsHome;
