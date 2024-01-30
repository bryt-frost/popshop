import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import useAxios from '../../common/hooks/useAxios';
import { useDispatch } from 'react-redux';

const url = 'cart';

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (_, thunkAPI) => {
    try {
      const { authTokens } = thunkAPI.getState().auth;

      if (!authTokens) {
        throw new Error('Auth tokens are not available.');
      }

      const dispatch = thunkAPI.dispatch;

      const axiosInstance = useAxios({ authTokens, dispatch });

      const resp = await axiosInstance.get(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const mergeCartItems = (existingCartItems, newCartItems) => {
  const mergedItems = [...existingCartItems];

  newCartItems.forEach((newItem) => {
    const existingItemIndex = mergedItems.findIndex(
      (item) => item.product.id === newItem.product.id,
    );

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, increase its quantity
      // mergedItems[existingItemIndex].quantity += newItem.quantity;
    } else {
      // If the item doesn't exist in the cart, add it
      mergedItems.push({ ...newItem });
    }
  });

  return mergedItems;
};
const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
  is_add_to_cart_api: false,
};

export const add_to_cart_api = createAsyncThunk(
  'cart/add_to_cart_api',
  async (_, thunkAPI) => {
    try {
      const { authTokens } = thunkAPI.getState().auth;

      if (!authTokens) {
        throw new Error('Auth tokens are not available.');
      }

      const dispatch = thunkAPI.dispatch;

      const axiosInstance = useAxios({ authTokens, dispatch });
      const { cartItems } = thunkAPI.getState().cart;
      const requestData = cartItems.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
      }));
      const resp = await axiosInstance.post(url + '/add-to-cart/', requestData);
      thunkAPI.dispatch(getCartItems());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const destroy_cart_item = createAsyncThunk(
  'cart/destroy_cart_item',
  async (_, thunkAPI) => {
    try {
      const { authTokens } = thunkAPI.getState().auth;

      if (!authTokens) {
        throw new Error('Auth tokens are not available.');
      }

      const dispatch = thunkAPI.dispatch;

      const axiosInstance = useAxios({ authTokens, dispatch });

      const resp = await axiosInstance.delete(url + `/destroy-cart-item/${_} `);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('persist:cart');
    },

    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === newItem.id,
      );
      console.log(action.payload);

      if (existingItem) {
        // If the item already exists in the cart, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist in the cart or is missing a 'product' property, add it
        state.cartItems.push({
          product: { ...newItem },
          quantity: 1,
          id: new Date().toISOString(),
        });
      }

      // Recalculate totals
      state.amount = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      state.total = state.cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      );
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      localStorage.removeItem(`persist:cart.${itemId}`);
    },
    increaseItem: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);

      cartItem.quantity = cartItem.quantity + 1;
    },
    decreaseItem: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.quantity = cartItem.quantity - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.quantity;
        total += item.product.price * item.quantity;
      });
      state.amount = amount;
      state.total = total;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.cartItems = action.payload;
        const mergedCartItems = mergeCartItems(state.cartItems, action.payload);

        // Update state with the merged cart items
        state.cartItems = mergedCartItems;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(add_to_cart_api.fulfilled, (state, action) => {
        state.cartItems = [];
      })
      .addCase(add_to_cart_api.rejected, (action) => {
        console.log(action.payload);
      });
  },
});

export const {
  clearCart,
  addToCart,
  removeItem,
  increaseItem,
  decreaseItem,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
