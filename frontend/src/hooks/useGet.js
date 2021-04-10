import {useState, useEffect} from 'react';
import axios from 'axios';
import createPersistedState from "@plq/use-persisted-state";
import sessionStorage from '@plq/use-persisted-state/lib/storages/session-storage';

const [useSessionState, clear] = createPersistedState('PawsHomeSessionStorage',sessionStorage)

export default function useGet() {

    //TODO session states here.
    const [userAuth, setUserAuth] = useSessionState('userAuth',{isvalidUser:false, user:null})

    //TODO normal global states here.
    const [myPosts, setMyPosts] = useState(()=>{
        return axios.get(`/:${user.username}/posts/mine`)
            .then(res=>{ return res.data; })
            .catch(e=>{/*error handling*/})
    })

    const [myWatchings, setMyWatchings] = useState(()=>{
        return axios.get(`/:${user.username}/posts/watching`)
            .then(res=>{ return res.data; })
            .catch(e=>{/*error handling*/})
    })

    //to initiate and refresh Newest posts
    const [fresh, setFresh] = useState(true)
    const refreshNewest = () =>{ setFresh(!fresh) }
    const [newestPosts, setNewest] = useState(()=>{
        useEffect(()=>{
            axios.get('/posts/newest', {
                params: {interval: 24}
            })
                .then(res => { setNewest(res.data) })
                .catch(e => {})
        })
    },[fresh])

    //for login modal to send request for server to authenticate user.
    function authenticateUser(username, password) {
        return axios.post(`/session`, {username: username, password: password})
            .then(res => {
                setUserAuth(res.data)
                return res.data
            })
            .catch(e => {})
    }

    return  {userAuth, myPosts, myWatchings,
        authenticateUser, setFresh};
}