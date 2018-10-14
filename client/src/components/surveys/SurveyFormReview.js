// this component shows the user's form for review, either submit or cancel to go back
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

// destructuring and pulling just the onCancel function off of props
// submitSurvey is an action creator that I imported in as a prop
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  // you could use es6 destructuring here and just pull name and label off of the 'field' object
  const reviewFields = formFields.map(field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>{formValues[field.name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel} >
        Cancel
      </button>

      {/* this 'submitSurvey' is my redux action in the actions/index.js file. it's imported with actions*/}
      {/*had to wrap it in an arrow function, otherwise it would be executed right away*/}
      {/* history here is an object that's passed in with reactRouter's withRouter at the bottom of this file*/}
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};


// this is how you pass values from the form through redux and into this component as props
function mapStateToProps(state) {
  // *** this console.log outputs what redux is giving us from the form values
  // you'll see the name 'surveyForm' in the log, which is the name we gave it in the
  // SurveyForm.js file at the bottom in the 'reduxForm'
  //console.log(state);
  return {
    formValues: state.form.surveyForm.values
  };
}

// check out React Router docs to see how this withRouter works, but basicially this allows us to use
// redirects from React Router as we need throughout my application, using the 'history' object
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
