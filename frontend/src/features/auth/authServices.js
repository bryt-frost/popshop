import axios from 'axios';
import { baseURL } from '../../common/baseAPI';
import getStoredState from 'redux-persist/es/getStoredState';

const login = async (userData) => {
  const response = await axios.post(baseURL + 'auth/jwt/create', userData);

  if (response.data) {
    localStorage.setItem('authTokens', JSON.stringify(response.data));
  }

  return response.data;
};
const logout = () => {
  localStorage.removeItem('authTokens');

};

const authServices = {
  login,
  logout,
};

export default authServices;
