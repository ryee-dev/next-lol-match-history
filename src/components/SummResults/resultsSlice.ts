import { createSlice } from '@reduxjs/toolkit';

export interface ResultsState {
  fetched: boolean;
}

const initialState: ResultsState = {
  fetched: false,
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    validate: (state) => {
      state.fetched = true;
    },
    invalidate: (state) => {
      state.fetched = false;
    },
  },
});

export const { validate, invalidate } = resultsSlice.actions;

export default resultsSlice.reducer;
