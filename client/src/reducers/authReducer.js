import { FETCH_USER } from '../actions/types';

// returning || false because it was returning a set of empty strings when the user was logged out. empty strings
// are equal to false...so I am saying if it's an empty string, set it to explicitly to false

// anytime an action comes across with a type of FETCH_USER, return the action's payload (the updated user model)
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload  || false;
    default:
      return state;
  }
}
