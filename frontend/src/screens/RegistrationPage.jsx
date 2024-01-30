import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { baseURL } from '../common/baseAPI';

// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     re_password: '',
//   });
//   const [noFormData, setNoFormData] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {

//     setNoFormData(
//       formData.email === '' ||
//         formData.password === '' ||
//         formData.re_password === '',
//     );
//   }, [formData]);

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = 'Password is required';
//     }
//     if (!formData.password.trim() < 8) {
//       newErrors.password = 'Password should be at least 8 characters';
//     }

//     if (formData.password.trim() !== formData.re_password.trim()) {
//       newErrors.re_password = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isFormValid = validateForm();

//     const response = await axios.post(
//       baseURL + 'auth/users/',
//       formData,

//     );
//     console.log(response.data);
//     if (isFormValid) {
//       setErrors({});
//     }
//     navigate('/');
//   };

//   return (
//     <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8'>
//       <div className='max-w-md w-full bg-white p-8 rounded-md shadow-md'>
//         <div className='flex items-center w-full justify-between'>
//           <button className='mx-0 p-0'>
//             <FaUserPlus size={30} className='text-center hover:scale-125' />
//           </button>
//           <h2 className='text-center text-2xl font-extrabold text-gray-900'>
//             SIGN UP
//           </h2>
//         </div>
//         <form onSubmit={handleSubmit} className='mt-8 space-y-3'>
//           <div className='rounded-md shadow-sm -space-y-px'>
//             <div>
//               <label htmlFor='email-address' className='sr-only'>
//                 Email address
//               </label>
//               <input
//                 id='email-address'
//                 name='email'
//                 type='email'
//                 onKeyDown={validateForm}
//                 required
//                 onChange={handleChange}
//                 value={formData.email}
//                 className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
//                   errors.email && 'border-red-500'
//                 }`}
//                 placeholder={`Email address ${errors.email ? '(error)' : ''}`}
//               />
//               {errors.email && (
//                 <small className='text-red-500'>{errors.email}</small>
//               )}
//             </div>
//             <div>
//               <label htmlFor='password' className='sr-only'>
//                 Password
//               </label>
//               <input
//                 id='password'
//                 name='password'
//                 type='password'
//                 onChange={handleChange}
//                 onKeyDown={validateForm}
//                 value={formData.password}
//                 className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
//                   errors.password && 'border-red-500'
//                 }`}
//                 placeholder={`Password ${errors.password ? '(error)' : ''}`}
//               />
//               {errors.password && (
//                 <small className='text-red-500'>{errors.password}</small>
//               )}
//             </div>
//             <div>
//               <label htmlFor='re_password' className='sr-only'>
//                 Confirm Password
//               </label>
//               <input
//                 id='re_password'
//                 name='re_password'
//                 type='password'
//                 onChange={handleChange}
//                 onKeyDown={validateForm}
//                 value={formData.re_password}
//                 className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
//                   errors.re_password && 'border-red-500'
//                 }`}
//                 placeholder={`Confirm Password ${
//                   errors.re_password ? '(error)' : ''
//                 }`}
//               />
//               {errors.re_password && (
//                 <small className='text-red-500'>{errors.re_password}</small>
//               )}
//             </div>
//           </div>
//           <div className='text-red-500 text-center leading-none'>
//             {/* Additional error messages can be displayed here if needed */}
//           </div>
//           <div>
//             <button
//               disabled={noFormData || errors}
//               type='submit'
//               className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full ${
//                 noFormData || errors
//                   ? ' text-black bg-gray-100 '
//                   : ' text-white bg-indigo-600 hover:bg-indigo-700 '
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase`}>
//               {/* Calculate the form validity directly */}
//               {false ? (
//                 <FaSpinner className='animate-spin text-xl' />
//               ) : (
//                 'SIGN UP'
//               )}
//             </button>
//           </div>
//           <div className='text-sm text-center'>
//             <Link
//               to='/login'
//               className='font-medium text-indigo-600 hover:text-indigo-500'>
//               Already have an account? Login
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    re_password: '',
  });

  const [noFormData, setNoFormData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setNoFormData(
      formData.email === '' ||
        formData.password === '' ||
        formData.re_password === '',
    );
  }, [formData]);

  const [errors, setErrors] = useState({});
  const [api_errors, setApi_errors] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const isButtonDisabled =
    noFormData || Object.values(errors).some((error) => error !== '');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Validate individual field on change
    const newErrors = { ...errors };

    switch (e.target.name) {
      case 'email':
        newErrors.email = !e.target.value.trim() ? 'Email is required' : '';
        break;
      case 'password':
        newErrors.password =
          e.target.value.trim().length < 8
            ? 'Password should be at least 8 characters'
            : '';
        break;
      case 're_password':
        newErrors.re_password =
          e.target.value.trim() !== formData.password.trim()
            ? 'Passwords do not match'
            : '';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (formData.password.trim().length < 8) {
      newErrors.password = 'Password should be at least 8 characters';
    }

    if (formData.password.trim() !== formData.re_password.trim()) {
      newErrors.re_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (!isFormValid) {
      // If form is not valid, prevent submission
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(baseURL + 'auth/users/', formData);
      console.log(response.data);

      navigate('/login');
    } catch (error) {
      console.error('Error submitting the form:', error);
      if (error.response) {
        const { data } = error.response;
    
        Object.values(data).map((i) => setApi_errors(String(i)));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-white p-8 rounded-md shadow-md'>
        <div className='flex items-center w-full justify-between'>
          <button className='mx-0 p-0'>
            <FaUserPlus size={30} className='text-center hover:scale-125' />
          </button>
          <h2 className='text-center text-2xl font-extrabold text-gray-900'>
            SIGN UP
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
                required
                onChange={handleChange}
                value={formData.email}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors.email && 'border-red-500'
                }`}
                placeholder={`Email address ${errors.email ? '(error)' : ''}`}
              />
              {errors.email && (
                <small className='text-red-500'>{errors.email}</small>
              )}
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                onChange={handleChange}
                value={formData.password}
                className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors.password && 'border-red-500'
                }`}
                placeholder={`Password ${errors.password ? '(error)' : ''}`}
              />
              {errors.password && (
                <small className='text-red-500'>{errors.password}</small>
              )}
            </div>
            <div>
              <label htmlFor='re_password' className='sr-only'>
                Confirm Password
              </label>
              <input
                id='re_password'
                name='re_password'
                type='password'
                onChange={handleChange}
                value={formData.re_password}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  errors.re_password && 'border-red-500'
                }`}
                placeholder={`Confirm Password ${
                  errors.re_password ? '(error)' : ''
                }`}
              />
              {errors.re_password && (
                <small className='text-red-500'>{errors.re_password}</small>
              )}
            </div>
          </div>

          <div className=' capitalize text-red-500 text-center leading-none'>
            <small>{api_errors}</small>
          </div>

          <div>
            <button
              // disabled={isButtonDisabled}
              type='submit'
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full ${
                isButtonDisabled
                  ? ' text-black bg-gray-100 '
                  : ' text-white bg-indigo-600 hover:bg-indigo-700 '
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase`}>
              {isLoading ? (
                <FaSpinner className='animate-spin text-xl' />
              ) : (
                'SIGN UP'
              )}
            </button>
          </div>

          <div className='text-sm text-center'>
            <Link
              to='/login'
              className='font-medium text-indigo-600 hover:text-indigo-500'>
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
