import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
// import { initDB } from '../helpers/dbUtils';
import * as reducers from '../reducers';
// import storage from 'redux-persist/lib/storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer'],
};

////export const storeObj = {};

// const setup = () => {
const reducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
     /*  serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }, */
      immutableCheck: false,
    serializableCheck: false,
    }).concat(logger),
});

// initDB(store);
//storeObj.store = store;

export const persistor = persistStore(store);
//   return store;
// };

// export default setup;

// Store has all of the default middleware added, _plus_ the logger middleware
