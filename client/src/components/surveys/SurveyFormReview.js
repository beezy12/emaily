// this component shows the user's form for review, either submit or cancel to go back
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

// destructuring and pulling just the onCancel function off of props
const SurveyFormReview = ({ onCancel, formValues }) => {

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
      <button className="yellow darken-3 btn-flat" onClick={onCancel} >
        Cancel
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

export default connect(mapStateToProps)(SurveyFormReview);
