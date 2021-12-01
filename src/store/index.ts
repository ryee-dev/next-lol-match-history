import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from '../components/SummResults/resultsSlice';

export const store = configureStore({
  reducer: {
    results: resultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
