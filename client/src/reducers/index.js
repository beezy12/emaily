import { combineReducers } from 'redux';
// reducer is just the name of the function from redux-form. es6 lets you rename it in this way
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
