import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import HomeDataReducer from '../Reducers/HomeDataReducer';
import PageLoadingReducer from '../Reducers/PageLoadingReducer';

const rootReducer = combineReducers({
    homeData:HomeDataReducer,
    pageLoading:PageLoadingReducer
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['pageLoading']
  };
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

export default store;