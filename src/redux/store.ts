import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { swapiApi } from './api';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [swapiApi.reducerPath]: swapiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
