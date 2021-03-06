// this is an action creator
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// I want to fetch the user as soon as the app boots up so that I know whether to show login
// button or user profile...do this using componentDidMount in App.js
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/currentUser');
  // this is the action to dispatch AFTER I get a response from the server. the response is the User model.
  // look for FETCH_USER in the auth_reducer file
  // redux will always expect an object to be returned with a 'type', or it will crash
  dispatch({ type: FETCH_USER, payload: res.data });
};

// action creator handleToken here
export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  // I can use the same action FETCH_USER after I send a post, because I want to see how many tokens the
  // user has now, so again the response is the User model
  dispatch({ type: FETCH_USER, payload: res.data });
};


export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};


export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data});
};
