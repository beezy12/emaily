// this is an action creator
import axios from 'axios';
import { FETCH_USER } from './types';

// I want to fetch the user as soon as the app boots up so that I know whether to show login
// button or user profile...do this using componentDidMount in App.js
export const fetchUser = () => {
    return function(dispatch) {
        axios
            .get('/api/currentUser')
            .then(res => dispatch({ type: FETCH_USER, payload: res }))
    };
};
