import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return(
      <div>
        surveyyyyyy formmmm
      </div>
    );
  }
}


export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
