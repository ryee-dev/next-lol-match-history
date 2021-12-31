import create, { GetState, SetState } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { createMatchSlice, createSearchSlice, createSummSlice } from "@/store/slices";

// export type StoreState = MatchSlice & SummSlice & SearchSlice;

export type StoreSlice<T> = (set: SetState<any>, get: GetState<any>) => T;

export const useStore = create<any>((set, get) => ({
  ...createSummSlice(set, get),
  ...createMatchSlice(set, get),
  ...createSearchSlice(set, get),
}));

// @ts-ignore
mountStoreDevtool('useStore', useStore);
