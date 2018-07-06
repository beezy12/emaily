import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

// handleSubmit is a built-in function of redux-form
// name property on Field is the key that will be store in the redux object
// anything you add onto Field, will get forwarded on to the component={}.
// example, I added label. this will make each field unique and customizable
class SurveyForm extends Component {
  renderFields() {
    return(
      <div>
        <Field label="Survey Title" type="text" name="title" component={SurveyField} />
        <Field label="Subject Line" type="text" name="subject" component={SurveyField} />
        <Field label="Email Body" type="text" name="body" component={SurveyField} />
        <Field label="Recipient List" type="text" name="emails" component={SurveyField} />
      </div>
    )
  }

  render() {
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}


export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
