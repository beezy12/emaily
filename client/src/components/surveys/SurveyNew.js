// SurveyNew is the parent component for both SurveyForm and SurveyFormReview
// it determines which view I show
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = { new: true }
  // }

  // this little bit of code right here is 100% the same as the constructor code above
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview
        onCancel={() => this.setState({ showFormReview: false })}
      />;
    }

    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

// by adding this reduxForm, it clears out the form values when going back to the new survey page.
// by default, all the values get dumped. in the surveyForm file I had to set a flag to NOT destroy the values,
// but not here, by default
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
