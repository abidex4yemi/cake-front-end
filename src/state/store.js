import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import { middleware as flashMiddleware } from 'redux-flash';

import rootReducer from './reducers';
import axiosInstance from '../api';
import { setToken } from './middleware';

const flashOptions = { timeout: 5000 };

const rootPersistConfig = {
  key: 'data-cake',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['creatingProfile', 'loginIn', 'updatingProfile', 'flash', 'token']
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(
        ReduxPromise,
        thunk.withExtraArgument(axiosInstance),
        setToken,
        flashMiddleware(flashOptions)
      )
    )
  );

  let persistor = persistStore(store);

  return { store, persistor };
};
