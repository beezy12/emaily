import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';


const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipient List", name: "emails"}
];

// handleSubmit is a built-in function of redux-form
// name property on Field is the key that will be store in the redux object
// anything you add onto Field, will get forwarded on to the component={}.
// example, I added label. this will make each field unique and customizable
class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, field => {
      return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name} />
    });
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
