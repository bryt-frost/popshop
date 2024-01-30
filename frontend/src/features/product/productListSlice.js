import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import useAxios from './../../common/hooks/useAxios';

const url = 'products/resent-products';

export const getProductList = createAsyncThunk(
  'productList/getProductList',

  async (page, thunkAPI) => {
    try {
      const { authTokens } = thunkAPI.getState().auth;
      const dispatch = thunkAPI.dispatch;
      const axiosInstance = useAxios({ authTokens, dispatch });
      const resp = await axiosInstance.get(`${url}`);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  productItems: [],
  isLoading: false,
 // Initialize totalPages to 1
};

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.isLoading = false;

        state.productItems = action.payload
        // state.productItems = action.payload.results;



      })
      .addCase(getProductList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default productListSlice.reducer;

// const url = 'products';

// export const getProductList = createAsyncThunk(
//   'productList/getProductList',

//   async (_, thunkAPI) => {
//     try {

//       const { authTokens } = thunkAPI.getState().auth;
//     const dispatch = thunkAPI.dispatch;

//       const axiosInstance = useAxios({authTokens, dispatch});
//       const resp = await axiosInstance.get(url);
//       return resp.data;
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );

// const initialState = {
//   productItems: [],
//   isLoading: false,
// };

// const productListSlice = createSlice({
//   name: 'productList',
//   initialState,
//   reducers: {

//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getProductList.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getProductList.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.productItems = action.payload;
//         console.log(action.payload);
//       })
//       .addCase(getProductList.rejected, (state) => {
//         state.isLoading = false;
//       });
//   },
// });
// export default productListSlice.reducer;
