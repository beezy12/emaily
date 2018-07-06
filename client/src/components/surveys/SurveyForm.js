import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

// handleSubmit is a built-in function of redux-form
// name property on Field is the key that will be store in the redux object
class SurveyForm extends Component {
  render() {
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <Field
            type="text"
            name="surveyTitle"
            component="input"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}


export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
