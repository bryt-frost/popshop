import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../../common/baseAPI';
import axios from 'axios';

// const url = `${baseURL}products/categories`;
const url = `${baseURL}products/categories`;


export const getCategoryItems = createAsyncThunk(
  'category/getCategoryItems',
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getProductsInCategory = createAsyncThunk(
  'category/getProductsInCategory',
  async (id, thunkAPI) => {
    try {
      const resp = await axios(`${url}/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  categoryItems: [],
  isLoading: false,
  productsInCategory: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
  
      .addCase(getCategoryItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryItems = action.payload;
      })
      .addCase(getCategoryItems.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getProductsInCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsInCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.productsInCategory = action.payload;
      })
      .addCase(getProductsInCategory.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default categorySlice.reducer;
