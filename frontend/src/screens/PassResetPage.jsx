

import React, { useState, useEffect } from 'react';
import { FaLongArrowAltLeft, FaSpinner } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { reset_password } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import CountdownTimer from '../common/helpers/CountdownTimer';

const PassResetPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, authTokens, error } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: '',
  });

  const [resend, setResend] = useState(false);
  const [countdownElapsed, setCountdownElapsed] = useState(false);

  const { email } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
  };

  const goBack = () => {
    if (location.state === null) {
      return navigate('/');
    }
    navigate(location.state.previousUrl);
  };

  const handleResendActivation = async () => {
    try {
      dispatch(reset_password({ email }));
      setResend(true);
      setCountdownElapsed(false);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleResendActivation();

    setCountdownElapsed(false);
  };

  const initialTimeInSeconds = 300; // 5 minutes

  useEffect(() => {
    if (!countdownElapsed && resend) {
      const timeoutId = setTimeout(() => {
        setCountdownElapsed(true);
        setResend(false);
      }, initialTimeInSeconds * 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [countdownElapsed, resend, initialTimeInSeconds]);

  return authTokens ? null : (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-white p-8 rounded-md shadow-md'>
        <div className='flex items-center w-full justify-between'>
          <button className='mx-0 p-0 ' onClick={goBack}>
            <FaLongArrowAltLeft className='text-center hover:scale-125' />
          </button>
          <h2 className='text-center text-2xl font-extrabold text-gray-900/90'>
            RESET PASSWORD
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
          </div>
          <div className='text-red-500 text-center leading-none'>
            <small className='leading-none '>{error}</small>
          </div>
          <div>
            <button
              disabled={resend}
              className={` ${
                resend
                  ? 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium  text-black bg-gray-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 '
                  : 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase'
              }`}>
              {isLoading ? (
                <FaSpinner className='animate-spin text-xl' />
              ) : resend && !countdownElapsed ? (
                <CountdownTimer initialTimeInSeconds={initialTimeInSeconds} />
              ) : (
                'GO'
              )}
            </button>
          </div>
          <div className='text-sm text-center'>
            <div>
              {/* <span

                onClick={handleResendActivation}
                className={`${!resend ? 'hidden' : '' } cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 `}>
                Re-send activation link
              </span> */}
            </div>

            <a
              href='#'
              className='font-medium text-indigo-600 hover:text-indigo-500 '>
              Don't have an account yet? click here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PassResetPage;

