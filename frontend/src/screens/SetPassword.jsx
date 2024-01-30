import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdLock, MdPassword } from 'react-icons/md';
import { BsCheck2Circle } from 'react-icons/bs';
import { baseURL } from '../common/baseAPI';

const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [matchError, setMatchError] = useState('');
  const { uid, token } = useParams();

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };
  const validatePasswordMatch = () => {
    if (password !== confirmPassword) {
      setMatchError('Passwords do not match');
      return false;
    } else {
      setMatchError('');
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validatePassword() || !validatePasswordMatch()) {

        return;
      }
      const response = await axios.post(
        baseURL + 'auth/users/reset_password_confirm/',
        {
          uid,
          token,
          new_password: password,
          re_new_password: confirmPassword,
        },
      );
      setSuccess(true);
      return response.data;
    } catch (error) {
      console.error('Error setting new password:', error);
      setError('Error setting a new password. Please try again.');
    }
  };

  if (success) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50  px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full mx-auto bg-white p-8 rounded-md shadow-md'>
          <div className='grid grid-flow-col gap-x-3 items-center justify-between '>
            <BsCheck2Circle size={45} className=' text-green-600' />
            Password reset successfully. You can now log in with your new
            password.
          </div>
          <hr className='m-4' />
          <Link
            to='/login'
            className='text-blue-500 underline hover:text-blue-700 block text-center'>
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-gray-50  px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full  bg-white p-8 rounded-md shadow-md'>
          <div className='flex items-center w-full justify-between'>
            <button className='mx-0 p-0 '>
              {' '}
              <MdPassword
                size={30}
                color='gray'
                className='text-center hover:scale-125'
              />
            </button>
            <h2 className='text-center text-2xl font-extrabold text-gray-900/90 '>
              NEW PASSWORD
            </h2>
          </div>
          <form onSubmit={handleSubmit} className='mt-8 space-y-3'>
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  New password
                </label>
                <input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={validatePassword}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                    passwordError ? 'border-red-500' : ''
                  }`}
                  placeholder='New password'
                />
                {passwordError && (
                  <p className='text-red-500 text-sm mt-1'>{passwordError}</p>
                )}
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  onKeyUp={validatePasswordMatch}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Confirm new password'
                />
                {matchError && (
                  <p className='text-red-500 text-sm mt-1'>{matchError}</p>
                )}
              </div>
            </div>

            <div>
              <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase'>
                RESET PASSWORD
              </button>
            </div>
            <div className='text-sm text-center'>
              {error && (
                <div className='text-red-500 text-sm mt-4'>{error}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetPassword;
