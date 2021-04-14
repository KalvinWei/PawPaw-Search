import {useState, useEffect} from 'react';
import axios from 'axios';
import createPersistedState from "@plq/use-persisted-state";
import sessionStorage from '@plq/use-persisted-state/lib/storages/session-storage';

const [useSessionState, clearSession] = createPersistedState('PawsHomeSessionStorage', sessionStorage)

export default function useGet() {

    //TODO session states here.
    const [loginUser, setLoginUser] = useSessionState("userInSession", null)

    //TODO normal global states here.

    //to initiate dashboard
    const [dashboard,setDashboard] = useState({})
    useEffect(()=>{
        async function fetchDashboard() {
            return await axios.get('/dashboard')
                .then(res => setDashboard(res.data))
                .catch(e => console.log(e))
        }
        fetchDashboard()
    },[])


    //to initiate and refresh Newest posts
    const [newestPosts, setNewestPosts] = useState([])
    useEffect(()=>{
        async function fetchNewest(){
            await axios.get('/posts/newest/10', )
                .then(res => setNewestPosts(res.data))
                .catch(e=>null)
        }
        fetchNewest()
    },[])


    //fetch posts for UserPage.js
    async function fetchMyPosts() {
        if (loginUser) {
            return await axios.get(`/:${loginUser.username}/posts/mine`)
                .then(res => {
                    return res.data;
                })
                .catch(e => {/*error handling*/
                })
        } else {
            return null;
        }
    }

    async function fetchWatchingPosts() {
        if (loginUser) {
            return await axios.get(`/:${loginUser.username}/posts/watching`)
                .then(res => {
                    return res.data;
                })
                .catch(e => {/*error handling*/
                })
        } else {
            return null;
        }

    }

    //for searching posts according to criteria
    const [searchSetting, setSearch] = useState({
        postType:"",
        petType:{
            species:"",
            breed:""
        },
        petSize:"",
        petGender:"",
        petColor:"",
        //use Geolocation API to fetch current user's location,
        // and search in an area of the given radius
        rangeRadius:0,
        //use keyword to search in petName, collarTagDescription, comment
        keyword:""
    })


    //for login modal to send request for server to authenticate user.
    async function authenticateUser(username, password) {
        return await axios.post(`/`, {"username": username, "password": password})
            .then(res => {
                const user = res.data
                setLoginUser(user)
                return user
            })
            .catch(e => {
                console.log(e)
            })
    }

    //for signup
    async function signUpUser(user) {
        console.log(user)
        return await axios.post('users/new', user)
            .then(res => {
                const dbUser = res.data
                if (dbUser) {
                    setLoginUser(dbUser)
                }
                return dbUser
            })
            .catch(e => {
                console.log(e)
            })
    }

    return {
        //states
        loginUser, newestPosts,dashboard,searchSetting,
        //functions
        clearSession, fetchMyPosts, fetchWatchingPosts, setSearch,
        signUpUser, authenticateUser
    };
}