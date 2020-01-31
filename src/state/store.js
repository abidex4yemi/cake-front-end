import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';
import axiosInstance from '../api';
import { setToken } from './middleware';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(
        ReduxPromise,
        thunk.withExtraArgument(axiosInstance),
        setToken
      )
    )
  );

  let persistor = persistStore(store);

  return { store, persistor };
};
