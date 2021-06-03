//dispatch ejecuta las acciones y getState entrega el store
import axios from 'axios';
import { updateDB, getFavs } from '../../firebase';

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

const URL = 'https://rickandmortyapi.com/api/character';

const saveStorage = (storage) => {
  window.localStorage.storage = JSON.stringify(storage);
};

const restoreFavsAction = () => (dispatch) => {
  let storage = window.localStorage.getItem('storage');
  storage = JSON.parse(storage);
  if (storage && storage.characters.favorites) {
    dispatch({
      type: GET_FAVS_SUCCESS,
      payload: storage.characters.favorites,
    });
  }
};

const retrieveFavs = () => async (dispatch, getState) => {
  dispatch({
    type: GET_FAVS,
  });
  const { uid } = getState().user;
  try {
    const array = await getFavs(uid);
    dispatch({
      type: GET_FAVS_SUCCESS,
      payload: [...array],
    });
    saveStorage(getState());
  } catch (error) {
    dispatch({
      type: GET_FAVS_ERROR,
      payload: error.message,
    });
  }
};

const addToFavoriteAction = () => (dispatch, getState) => {
  let { array, favorites } = getState().characters;
  const { uid } = getState().user;
  const char = array.shift();
  favorites.push(char);
  updateDB(favorites, uid);
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: { array: [...array], favorites: [...favorites] },
  });
};

const removeCharacterAction = () => (dispatch, getState) => {
  const { array } = getState().characters;
  array.shift();
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array],
  });
};

const getCharactersAction = () => async (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS,
  });
  try {
    const response = await axios.get(URL);
    dispatch({
      type: GET_CHARACTERS_SUCCESS,
      payload: response.data.results,
    });
  } catch (error) {
    dispatch({
      type: GET_CHARACTERS_ERROR,
      payload: error.response.message,
    });
  }
};

export {
  getCharactersAction,
  removeCharacterAction,
  addToFavoriteAction,
  retrieveFavs,
  restoreFavsAction,
};
