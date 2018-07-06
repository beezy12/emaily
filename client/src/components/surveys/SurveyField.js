// SurveyField contains logic to render a single label and text input
import React from 'react';

// { input } here is being pulled off of the props coming from redux-form. it has a ton of
// built-in form functions. you can pass props in where you're passing in { input } and
// console.log props out to see what is coming in.
// the {...input} is the same as calling onBlur{input.onBlur} and onChange={input.onChange}.
// it just gives you all those things that are on input.
export default ({ input, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  )
};
