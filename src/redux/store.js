import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './user/userReducer';
import charsReducer from './chars/charsReducer';
import { getCharactersAction, restoreFavsAction } from './chars/charsAction';
import { restoreSessionAction } from './user/userAction';

const rootReducer = combineReducers({
  user: userReducer,
  characters: charsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  getCharactersAction()(store.dispatch, store.getState);
  restoreSessionAction()(store.dispatch);
  restoreFavsAction()(store.dispatch);
  return store;
};

export default generateStore;
