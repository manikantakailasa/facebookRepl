import { POSTS_ERROR, GET_POSTS,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POST,ADD_COMMENT,REMOVE_COMMENT } from './types';
import axios from 'axios';
import { setAlert } from './alert';

//get all posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//add like to post
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload:{id , likes:res.data}
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
//remve like to post

export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload:{id , likes:res.data}
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//delete post 

export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload:id
        })

        dispatch(setAlert('Post have been deleted', 'success'));


    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//add post 
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }

    }
    try {

        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('post created','success'));
        
    } catch (err) {

        dispatch({
            type: POSTS_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

//get post

export const getPost = id => async dispatch => {
    console.log(id)
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//add comment to post 
export const addComment = (postId,formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }

    }
    try {

        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('comment added','success'));
        
    } catch (err) {

        dispatch({
            type: POSTS_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

//delete comment to post 
export const removeComment = (postId,commentId) => async dispatch => {

    console.log(postId +"  "+ commentId)
    try {

        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('comment removed','success'));
        
    } catch (err) {

        dispatch({
            type: POSTS_ERROR,
             payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}