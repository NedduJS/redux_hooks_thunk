import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT } from './userTypes';

const initialState = {
  loggedIn: false,
  fetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return { ...initialState };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, loggedIn: true, ...action.payload };
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case LOGIN:
      return { ...state, fetching: true };
    default:
      return state;
  }
};

export default reducer;
