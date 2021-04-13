import {useState, useEffect} from 'react';
import axios from 'axios';
import createPersistedState from "@plq/use-persisted-state";
import sessionStorage from '@plq/use-persisted-state/lib/storages/session-storage';

const [useSessionState, clearSession] = createPersistedState('PawsHomeSessionStorage',sessionStorage)

export default function useGet() {

    //TODO session states here.
    const [loginUser, setLoginUser] = useSessionState("userInSession",null)

    //TODO normal global states here.
    const [dashBoard, setDashboard] = useState({})

    async function fetchMyPosts(){
        if(loginUser){
            return await axios.get(`/:${loginUser.username}/posts/mine`)
                .then(res=>{ return res.data; })
                .catch(e=>{/*error handling*/})
        } else {
            return null;
        }
    }

    async function fetchWatchingPosts(){
        if(loginUser){
            return await axios.get(`/:${loginUser.username}/posts/watching`)
                .then(res=>{ return res.data; })
                .catch(e=>{/*error handling*/})
        }
        else {
            return null;
        }

    }

    //to initiate and refresh Newest posts
    let fresh = true
    const refreshNewest = () =>{ fresh = !fresh }
    // useEffect(()=>{
    //     axios.get('/posts/newest', {
    //         params: {interval: 24}
    //     })
    //         .then(res => { setNewest(res.data) })
    //         .catch(e => {console.log(e)})
    // },[fresh])
    const [newestPosts, setNewest] = useState(()=>{
        refreshNewest()
        return fresh
    })

    //for login modal to send request for server to authenticate user.
    async function authenticateUser(username, password) {
        return await axios.post(`/`, {"username": username, "password": password})
            .then(res => {
                const user = res.data
                setLoginUser(user)
                return user
            })
            .catch(e => {console.log(e)})
    }

    //for signup
    async function signUpUser(user){
        console.log(user)
        return await axios.post('users/new',user)
            .then(res => {
                const dbUser = res.data
                if(dbUser){
                    setLoginUser(dbUser)
                }
                return dbUser
            })
            .catch(e=>{console.log(e)})
    }

    return  {
        //states
        loginUser, newestPosts,dashBoard,
        //functions
        clearSession, fetchMyPosts, fetchWatchingPosts,
        signUpUser, authenticateUser};
}