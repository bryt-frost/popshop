import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import modalReducer from './features/modal/modalSlice';
import categoryReducer from './features/category/categorySlice';
import productListReducer from './features/product/productListSlice';
import productDetailReducer from './features/product/productDetailSlice';
import productSearchReducer from './features/product/productSearchSlice';
import authReducer from './features/auth/authSlice';
import chatModalReducer from './features/modal/chatModalSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: persistedReducer,
    modal: modalReducer,
    chatModal: chatModalReducer,
    category: categoryReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    productSearch: productSearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);
