import { useSelector } from 'react-redux';
import { baseURL } from '../baseAPI';
import axios from 'axios';
import dayjs from 'dayjs';

import { jwtDecode } from 'jwt-decode';
import { setAuthTokens } from '../../features/auth/authSlice';

const useAxios = ({ authTokens: u, dispatch }) => {
  const axiosConfig = {
    baseURL: baseURL,
  };

  if (u && u.access) {
    axiosConfig.headers = { Authorization: `Bearer ${u.access}` };
  }

  const axiosInstance = axios.create(axiosConfig);

  axiosInstance.interceptors.request.use(async (req) => {
    if (!u || !u.access) {
      // Make the request without the authorization header
      return req;
    }

    const token = jwtDecode(u.access, { complete: true });

    const isExpired = dayjs.unix(token.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      return req;
    }

    try {
      const response = await axios.post(`${baseURL}auth/jwt/refresh/`, {
        refresh: u.refresh,
      });
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      dispatch(setAuthTokens(response.data));
      req.headers.Authorization = `Bearer ${response.data.access}`;
      // console.log(
      //   'Token refreshed. New Authorization header:',
      //   req.headers.Authorization,
      // );
    } catch (error) {
      delete req.headers.Authorization;
    }
    return req;
  });

  return axiosInstance;
};

export default useAxios;
