import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useAxios from './../../common/hooks/useAxios';

const url = 'products';

export const getProductSearchList = createAsyncThunk(
  'productSearch/getProductSearchList',

  async ({ searchQuery, currentPage }, thunkAPI) => {
    try {
      const { authTokens } = thunkAPI.getState().auth;
      const { selectedSortOption } = thunkAPI.getState().productSearch;
    const ordering = selectedSortOption || 'defaultSortOption';

      const dispatch = thunkAPI.dispatch;
      const axiosInstance = useAxios({ authTokens, dispatch });

      const resp = await axiosInstance.get(
        `${url}?search=${searchQuery}&ordering=${ordering}&page=${currentPage}`,
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  results: [],
  isLoading: false,
  //   currentPage: '',
  query: null,
  selectedSortOption: '',
  currentPage: 1,
  totalPages: 1,
};

const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSelectedSortOption: (state, action) => {
      console.log(action.payload);
      state.selectedSortOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductSearchList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductSearchList.fulfilled, (state, action) => {
        state.isLoading = false;

        state.results = action.payload.results;
        console.log(action.payload);
        state.totalPages = action.payload.total_pages;
        state.currentPage = action.payload.current_page;
        console.log(action.payload.total_pages, action.payload.current_page);
      })
      .addCase(getProductSearchList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setQuery, setSelectedSortOption } = productSearchSlice.actions;
export default productSearchSlice.reducer;
