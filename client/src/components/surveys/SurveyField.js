// SurveyField contains logic to render a single label and text input
import React from 'react';

// { input } here is being pulled off of the props coming from redux-form. it has a ton of
// built-in form functions. you can pass props in where you're passing in { input } and
// console.log props out to see what is coming in.
// the {...input} is the same as calling onBlur{input.onBlur} and onChange={input.onChange}.
// it just gives you all those things that are on input.

// also using nested es6 destructuring with meta here, pulling off just error, and touched. you can
// console.log meta to see what properties it has
export default ({ input, label, meta: { error, touched } }) => {
  //console.log(meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px"}}>
        {touched && error}
      </div>
    </div>
  )
};
