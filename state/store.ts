
import chatReducer from './Global/index';
import { configureStore } from "@reduxjs/toolkit";
import { graphqlApi } from './api';

export const store = configureStore({
  reducer: {
    [graphqlApi.reducerPath]: graphqlApi.reducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(graphqlApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;