import { StoreSlice } from '@/store';
import { PartialState } from 'zustand';

export type MatchSlice = {};

export const createMatchSlice: StoreSlice<MatchSlice> = (set, get) => ({
  matchData: null,
  setMatchData: (data: PartialState<MatchSlice, never, never, never, never>) =>
    set({ data }),
});
