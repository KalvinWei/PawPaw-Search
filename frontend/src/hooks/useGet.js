import {useState, useEffect} from 'react';
import axios from 'axios';

/**
 * A custom hook which fetches data from the given URL. Includes functionality to determine
 * whether the data is still being loaded or not.
 */
export default function useGet() {

    const [ctxData, setCtxData] = useState(null);
    setCtxData({...ctxData,searchIn:"allPosts",searchCriteria:{},  searchPosts:[],myPosts:[]})
    //TODO you can append global state variable here.

    function authenticateUser(username, password) {
        return axios.post(`/user/${username}`, {username: username, password: password})
            .then(res => {
                setCtxData({...ctxData, isValidUser: res.data.isValidUser, user: res.data.user})
            })
            .catch(e => {

            })
    }

    function getNewestPosts(interval) {
        return axios.get('/posts/newest', {
            params: {interval: interval}
        })
            .then(res => {
                setCtxData({...ctxData, newestPosts: res.data})
            })
            .catch(e => {

            })
    }

    //this hook is to refresh data in MyPosts or in PostPlaza.
    useEffect(()=> {
         axios.get('/posts', {
            params: {
                criteria: (ctxData.searchIn == "allPosts") ? {start:"/* now() - 48hours*/",end:"/* now()*/"}
                : ctxData.searchCriteria
            }
        })
            .then(res => {
                if(ctxData.searchIn =="allPosts") setCtxData({...ctxData, searchPosts: res.data})
                else setCtxData({...ctxData, myPosts:res.data})
            })
    }, [ctxData.searchCriteria, ctxData.searchIn])

    function setSearchLocale(searchIn){
        setCtxData({...ctxData,searchIn:searchIn})
    }

    return {ctxData,  authenticateUser, getNewestPosts, setSearchLocale};
}