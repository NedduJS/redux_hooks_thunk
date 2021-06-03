import { loginWithGoogle, signOutGoogle } from '../../firebase';
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT } from './userTypes';
import { retrieveFavs } from '../chars/charsAction';

const saveStorage = (storage) => {
  window.localStorage.storage = JSON.stringify(storage);
};

const logOutAction = () => (dispatch, getState) => {
  signOutGoogle();
  dispatch({
    type: LOG_OUT,
  });
  window.localStorage.removeItem('storage');
};

const restoreSessionAction = () => (dispatch) => {
  let storage = window.localStorage.getItem('storage');
  storage = JSON.parse(storage);
  if (storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user,
    });
  }
};

const doGoogleLoginAction = () => async (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  try {
    const user = await loginWithGoogle();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      },
    });
    saveStorage(getState());
    retrieveFavs()(dispatch, getState);
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error.message,
    });
  }
};

export { doGoogleLoginAction, restoreSessionAction, logOutAction };
//6:44
