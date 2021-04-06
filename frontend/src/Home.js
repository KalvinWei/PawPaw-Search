import Banner from './Banner/Banner'
import Dashboard from './Dashboard/Dashboard'
import NewestPosts from "./NewestPosts/NewestPosts";

function Home() {
    return (
        <div>
            <Banner/>
            <Dashboard/>
            <NewestPosts/>
        </div>
    );
}

export default Home;
