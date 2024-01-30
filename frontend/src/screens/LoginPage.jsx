import { useEffect, useState } from 'react';
import { FaLongArrowAltLeft, FaSpinner } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getProfile, login } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading, authTokens, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (authTokens) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = credentials;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
  };

  const goBack = async (replace) => {
    if (location.state === null) {

      return navigate('/', { replace: replace });
    }

    navigate(location.state.previousUrl, { replace: replace &&  false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(login({ email, password }));
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const auth = JSON.parse(localStorage.getItem('authTokens'));
      dispatch(getProfile())
      if (auth) {
        goBack(true);
      
      } else {
       
        return
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };

  return authTokens ? null : (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-50  px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full  bg-white p-8 rounded-md shadow-md'>
          <div className='flex items-center w-full justify-between'>
            <button className='mx-0 p-0 ' onClick={goBack}>
              {' '}
              <FaLongArrowAltLeft className='text-center hover:scale-125' />
            </button>
            <h2 className='text-center text-2xl font-extrabold text-gray-900/90 '>
              LOGIN
            </h2>
          </div>
          <form onSubmit={handleSubmit} className='mt-8 space-y-3'>
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  onChange={handleChange}
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  onChange={handleChange}
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
            </div>
            <div className='text-red-500 text-center leading-none'>
              <small className='leading-none '>{error}</small>
            </div>
            <div>
              <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase'>
                {isLoading ? (
                  <FaSpinner className=' animate-spin text-xl' />
                ) : (
                  'LOGIN'
                )}
              </button>
            </div>
            <div className='text-sm text-center'>
              <Link
                to={'/reset-password'}
                state={{ previousUrl: location.pathname }}
                className='font-medium text-indigo-600 hover:text-indigo-500 block'>
                Forgot your password?
              </Link>
              <a
                href='#'
                className='font-medium text-indigo-600 hover:text-indigo-500 '>
                Don't have an account yet? click here
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
