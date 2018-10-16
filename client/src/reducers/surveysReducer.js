import { FETCH_SURVEYS } from '../actions/types';

//boilerplate reducer
// state is an empty array when the app first boots up
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
