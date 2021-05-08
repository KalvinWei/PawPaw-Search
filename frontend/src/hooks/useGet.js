import {useState, useEffect} from 'react';
import axios from 'axios';
import createPersistedState from "@plq/use-persisted-state";
import localStorage from '@plq/use-persisted-state/lib/storages/local-storage';

const [useLocalStorage, clearLocalStorage] = createPersistedState('PawsHomeLocalStorage', localStorage)

export default function useGet() {

    //TODO session states here.
    const [loginUser, setLoginUser] = useLocalStorage("userInSession", null)

    //TODO normal global states here.

    //to initiate dashboard
    const [dashboard, setDashboard] = useState({})
    useEffect(() => {
        async function fetchDashboard() {
            return await axios.get('/dashboard')
                .then(res => setDashboard(res.data))
                .catch(e => console.log(e))
        }

        fetchDashboard()
    }, [])

    //NOTE: the result of this function is an object {posts, pageTotal}
    async function fetchPostsBy(searchCriteria, countPerPage, pageOffset) {
        searchCriteria = JSON.stringify(searchCriteria)
        return await axios.get('posts/', {
            headers: {
                searchCriteria, countPerPage, pageOffset
            }
        })
            .then(res => res.data)
            .catch(e => {
                console.log(e)
            })

    }

    async function fetchPostsOf(countPerPage, pageOffset, postType) {
        return await axios.get(`/users/${loginUser.username}/posts/${postType}`, {
            headers: {
                countPerPage, pageOffset
            }
        })
            .then(res => res.data)
            .catch(e => console.log(e))
    }

    async function fetchNewestPosts(days, countPerPage, pageOffset) {
        return await axios.get('posts/newest', {
            headers: {
                days, countPerPage, pageOffset
            }
        })
            .then(res => res.data)
            .catch(e => console.log(e))
    }

    async function fetchMatchedPosts(postID, countPerPage, pageOffset) {

        return await axios.get(`posts/${postID}/matches`, {
            headers: {
                postID: postID,
                countPerPage: countPerPage,
                pageOffset: pageOffset
            }
        })
            .then(res => res.data)
            .catch(e => console.log(e))
    }


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

    async function updateUserProfile(user) {
        return await axios.put(`/users/${user.username}/edit`, user)
            .then(res => res.data)
            .catch(e => {
                console.log(e)
            })
    }

    async function createPost(post) {
        return await axios.post('posts/', post)
            .then(res => res.data)
            .catch(e => {
                console.log(e)
            })
    }

    async function reportTrace(spot, postId) {
        return await axios.patch(`/posts/${postId}/trace`, spot)
            .then(res => res.data)
            .catch(e => console.log(e))

    }

    async function checkWatching(postId, userId) {
        return await axios.get(`/users/${userId}/posts/watchings/${postId}`)
            .then(res => res.data)
            .catch(e => console.log(e))
    }

    async function updateWatchStatus(postId, userId, actionType) {
        return await axios.put(`/users/${userId}/posts/watchings/${postId}`, {actionType})
            .then(res => res.data)
            .catch(e => console.log(e))
    }

    async function fetchPostById(postId){
        return await axios.get(`${postId}`)
            .then(res=>res.data)
            .catch(e=>console.log(e))
    }

    return {
        //states
        loginUser, dashboard, setLoginUser,
        //functions
        clearSession: clearLocalStorage, fetchPostsBy, fetchNewestPosts, fetchPostsOf,
        signUpUser, authenticateUser, fetchMatchedPosts, updateUserProfile, createPost,
        reportTrace, checkWatching, updateWatchStatus,  fetchPostById
    };
}