import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../common/baseAPI';


export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  async (product_id, thunkAPI) => {
    try {
      const url = `${baseURL}/products/product/${product_id}/`;
      const viewedProducts =
        JSON.parse(localStorage.getItem('viewed-products')) || [];

      const headers = {
        'viewed-products': JSON.stringify(viewedProducts),
      };
      
      const resp = await axios.get(url, { headers });

      if (!viewedProducts.includes(product_id)) {
        viewedProducts.push(product_id);
        localStorage.setItem('viewed-products', JSON.stringify(viewedProducts));
      }

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


const initialState = {
  product: [],
  isLoading: false,
};


const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    removeProductDetail: (state) => {
      state.product = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetail.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { removeProductDetail } = productDetailSlice.actions;

export default productDetailSlice.reducer;


