import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authServices from './authServices';
import { extractErrorMessage } from '../../common/utils/extractErrorMessage';
import { baseURL } from '../../common/baseAPI';
import axios from 'axios';

import useAxios from '../../common/hooks/useAxios';

const getUserFromLocalStorage = () => {
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  return authTokens ? authTokens : null;
};
const getProfileFromLocalStorage = () => {
  const authTokens = JSON.parse(localStorage.getItem('profile'));
  return authTokens ? authTokens : null;
};
const initialState = {
  // user: user ? user : null,
  authTokens: getUserFromLocalStorage(),
  isLoading: false,
  isAuthenticated: false,
  error: null,
  reset_error: null,
  reset_success: false,
  isLoadingProfile: false,
  profile: getProfileFromLocalStorage(),
};

export const login = createAsyncThunk(
  'auth/login',
  async (authTokens, thunkAPI) => {
    try {
      return await authServices.login(authTokens);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const logout = createAction('auth/logout', (_, thunkAPI) => {
  authServices.logout();

  return {};
});

export const reset_password = createAsyncThunk(
  'auth/reset_password',
  async (email, thunkAPI) => {
    const url = baseURL + 'auth/users/reset_password/';

    try {
      const response = await axios.post(url, email);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  },
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',

  async (_, thunkAPI) => {
    const url = baseURL + 'auth/profile';
    try {
      const { authTokens } = thunkAPI.getState().auth;
      const dispatch = thunkAPI.dispatch;
      const axiosInstance = useAxios({ authTokens, dispatch });
      const resp = await axiosInstance.get(`${url}`);
      if (resp.data) {
        localStorage.setItem('profile', JSON.stringify(resp.data));
      }
      return resp.data;
    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const changeProfile = createAsyncThunk(
  'auth/changeProfile',

  async (_, thunkAPI) => {
    const url = baseURL + 'auth/profile/update';
    try {
      const { authTokens } = thunkAPI.getState().auth;
      const dispatch = thunkAPI.dispatch;
      const axiosInstance = useAxios({ authTokens, dispatch });
      const resp = await axiosInstance.put(`${url}`, _);
      return resp.data;
    } catch (error) {

      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// export const resend_activation = createAsyncThunk(
//   'auth/resend_activation',
//   async (email, thunkAPI) => {

//     const url = 'http://127.0.0.1:8000/auth/users/resend_activation/'
//     console.log(email);
//     try {
//       const response = await axios.post(url, email);
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(extractErrorMessage(error));
//     }
//   },
// );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    perform_logout: (state) => {
      state.authTokens = null;
      state.profile = null;
    },
    setAuthTokens: (state, action) => {
      state.authTokens = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authTokens = action.payload;

        state.isLoading = false;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;

        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(reset_password.fulfilled, (state, action) => {
        console.log(action);
        state.reset_success = true;
      })
      .addCase(reset_password.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoadingProfile = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoadingProfile = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.isLoadingProfile = false;
      });
  },
});

export const { setAuthTokens } = authSlice.actions;
export const { perform_logout } = authSlice.actions;
export default authSlice.reducer;
