import { StoreSlice } from '@/store';

export type SearchSlice = {
  searchQuery: string;
  setSearchQuery: any;
};

export const createSearchSlice: StoreSlice<SearchSlice> = (set, get) => ({
  searchQuery: '',
  setSearchQuery: (input: string) => {
    set(() => ({ searchQuery: input }));
  },
});
