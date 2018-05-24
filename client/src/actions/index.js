// this is an action creator
import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
    return function(dispatch) {
        axios
            .get('/api/currentUser')
            .then(res => dispatch({ type: FETCH_USER, payload: res }))
    }
};
