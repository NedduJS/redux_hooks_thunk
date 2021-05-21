import { LOGIN } from './userTypes';

const initialState = {
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    default:
      return state;
  }
};

export default reducer;
