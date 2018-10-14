import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
//import _ from 'lodash';


// handleSubmit is a built-in function of redux-form
// name property on Field is the key that will be store in the redux object
// anything you add onto Field, will get forwarded on to the component={}.
// example, I added label. this will make each field unique and customizable
class SurveyForm extends Component {
  // renderFields() {
  //   return _.map(FIELDS, field => {
  //     return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name} />
  //   });
  // }

  // label,name here used to be field, and I used field.name and field.label. but with es6 destructuring, you can just pull the label and name off of FIELDS array
  renderFields() {
    return formFields.map(({ label, name }) => <Field key={name} component={SurveyField} type="text" label={label} name={name} />
  )};

  render() {
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}


// this function auto runs on page load
function validate(values) {
  const errors = {};


  // 'error.emails' here comes from the name of emails in the FIELDS array above.
  // passing empty string here because this validateEmails function runs on page load, and was undefined
  // since the user hasn't made any errors yet
  errors.emails = validateEmails(values.emails || '');


  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `you must provide a ${name}`;
    }
  });


  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
