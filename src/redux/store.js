import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './contacts/contactsApi';
import filterReduser from './contacts/contact-reduser';
import authReduser from './auth/auth-slice';
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
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
   key: 'auth',
   storage,
   whitelist: ['token'],
};

export const store = configureStore({
   reducer: {
      filter: filterReduser,
      auth: persistReducer(authPersistConfig, authReduser),
      [contactsApi.reducerPath]: contactsApi.reducer,
   },
   middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
      contactsApi.middleware,
   ],
   devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
