// this component shows the user's form for review, either submit or cancel to go back
import React from 'react';

// destructuring and pulling just the onCancel function off of props
const SurveyFormReview = ({ onCancel }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      
      <button className="yellow darken-3 btn-flat"onClick={onCancel} >
        Cancel
      </button>
    </div>
  );
};

export default SurveyFormReview;
