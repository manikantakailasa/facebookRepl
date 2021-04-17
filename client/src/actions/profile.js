import axios from 'axios';
import { PROFILE_ERROR, GET_PROFILE,UPDATE_PROFILE,ACCOUNT_DELETED,CLEAR_PROFILE,GET_PROFILES,GET_REPOS } from './types';
import { setAlert } from './alert';


//get current user profile
export const getCurrentProfile = () => async dispatch => {
     dispatch({
            type: CLEAR_PROFILE
        });
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data.profile
        })
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

//get all profiles
export const getProfiles = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload:res.data
        })
    } catch (err) {
         dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//get profile by id 

export const getProfileById = userid => async dispatch => {
         dispatch({
            type: CLEAR_PROFILE
 });
    try {
        const res = await axios.get(`/api/profile/${userid}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {

         dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}
//get gihub repos
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//create and update profile data
export const createProfile = (formData, history, edit = false) => async dispatch => {
    const config= {
        headers: {'Content-Type':'application/json'}
    }

    try {
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error =>  dispatch(setAlert(error.msg,'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

// add experience 

export const addExperience = (formData, history) => async dispatch =>  {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    try {
        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience Added Sucessfully', 'success'));

        setTimeout(() => history.push('/dashboard'),2000);

    } catch (err) {

        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload:{msg: err.response.statusText, status: err.response.status}
        })
        
    }
}

//add education

export const addEducation = (formData, history) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    try {
        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education Added Successfully', 'success'));

        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'));
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }

}

//delete experience

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed','success'))

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//delete education

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed','success'))

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//delete account and profile

export const deleteAccount = () => async dispatch => {

    if (window.confirm('Are you sure? This can NOT be undone!')) {
        
    try {
        await axios.delete(`/api/profile/`);

        dispatch({
            type: CLEAR_PROFILE
        });

        dispatch({ type: ACCOUNT_DELETED });

        dispatch(setAlert('Your Account has been permanantly delted'))

    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
    }
}