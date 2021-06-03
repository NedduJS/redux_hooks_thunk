import {
  GET_CHARACTERS,
  GET_CHARACTERS_SUCCESS,
  GET_CHARACTERS_ERROR,
  REMOVE_CHARACTER,
  ADD_TO_FAVORITES,
  GET_FAVS,
  GET_FAVS_SUCCESS,
  GET_FAVS_ERROR,
} from './charsTypes';

const initialData = {
  fetching: false,
  array: [],
  current: {},
  favorites: [],
};

const reducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_FAVS_ERROR:
      return { ...state, fetching: false, error: action.message };
    case GET_FAVS_SUCCESS:
      return { ...state, fetching: false, favorites: action.payload };
    case GET_FAVS:
      return { ...state, fetching: true };
    case ADD_TO_FAVORITES:
      return { ...state, ...action.payload };
    case REMOVE_CHARACTER:
      return { ...state, array: action.payload };
    case GET_CHARACTERS:
      return { ...state, fetching: true };
    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, fetching: false, array: action.payload };
    default:
      return state;
  }
};

export default reducer;
