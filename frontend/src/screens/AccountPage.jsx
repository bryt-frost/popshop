import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { changeProfile, getProfile } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../common/helpers/LoadingSpinner';
import { data } from '../../data';

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  disabled,
  textarea,
  component: Component = 'input',
}) => {
  return (
    <div className='mb-4'>
      <label
        htmlFor={name}
        className='block text-sm font-semibold text-gray-700 mb-1'>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-indigo-800 transition-all ${
            disabled ? 'bg-gray-100' : 'bg-white'
          }`}
          disabled={disabled}
          rows='4'
        />
      ) : (
        <Component
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-indigo-800 transition-all ${
            disabled ? 'bg-gray-100' : 'bg-white'
          }`}
          disabled={disabled}
        />
      )}
    </div>
  );
};

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authTokens, profile, isLoadingProfile } = useSelector(
    (state) => state.auth,
  );

  const initialUserData = {
    first_name: '',
    last_name: '',
    email: '',
    about: '',
    phone_number: '',
    city: '',
    region: '',
    country: '',
  };

  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authTokens) {
        return navigate('/');
      }

      setUserData({
        first_name: profile?.user?.first_name || '',
        last_name: profile?.user?.last_name || '',
        email: profile?.user?.email || '',
        about: profile?.about || '',
        phone_number: profile?.phone_number || '',
        city: profile?.city || '',
        region: profile?.region || '',
        country: profile?.country?.name || '',
      });
    };

    fetchProfile();

    return () => {
      // Cleanup logic (if needed)
    };
  }, [authTokens, setUserData, dispatch]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Perform save/update logic here
    setEditMode(false);
  };

  const handleCancelClick = () => {

    setEditMode(false);
  };

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const toSend = {
      user: {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      },

      country: userData.country,
      region: userData.region,
      city: userData.city,
      about: userData.about,
    };

    dispatch(changeProfile(toSend));

    handleSaveClick();
    dispatch(getProfile());
  };

  if (isLoadingProfile) {
    return <LoadingSpinner />;
  }
  const handlePasswordChange = () => {};
  return (
    <>
      <div className='min-h-screen flex flex-col lg:flex-row md:flex-row justify-between items-start bg-gradient-to-r from-gray-100/10 to-gray-100/10'>
        <div className='w-full md:w-1/4 p-8 bg-white rounded-md mb-3 border-b'>
          <div className='text-center mb-6'>
            <img
              src='https://via.placeholder.com/150'
              alt='User Avatar'
              className='w-20 h-20 mx-auto mb-4 rounded-full'
            />
            <h2 className='text-3xl font-bold text-gray-800'>
              {userData.first_name} {userData.last_name}
            </h2>
            <p className='text-gray-500'>{userData.username}</p>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <p className='text-sm text-gray-600'>
              <strong>Email:</strong> {userData.email}
            </p>
            <p className='text-sm text-gray-600'>
              <strong>Phone:</strong> {userData.phone_number}
            </p>
            <p className='text-sm text-gray-600'>
              <strong>City:</strong> {userData.city}
            </p>
          </div>
        </div>

        <div className='w-full md:w-[73%] p-8 bg-white rounded-md shadow-md mb-4 lg:ml-4'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='mt-4 flex justify-end'>
              {editMode ? (
                <>
                  <button
                    type='button'
                    onClick={handleCancelClick}
                    className='mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none transition-all'>
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none transition-all'>
                    Save
                  </button>
                </>
              ) : (
                <button
                  type='button'
                  onClick={handleEditClick}
                  className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none transition-all'>
                  Edit Profile
                </button>
              )}
            </div>

            <div className='grid grid-cols-1 gap-4'>
              <div className='grid grid-cols-1 gap-4'>
                <div>
                  <h1 className='block text-xl font-semibold text-gray-700 '>
                    Essentials
                  </h1>
                  <hr />
                </div>
                <InputField
                  label='First Name'
                  name='first_name'
                  type='text'
                  value={userData.first_name}
                  onChange={handleChange}
                  disabled={!editMode}
                />

                <InputField
                  label='Last Name'
                  name='last_name'
                  type='text'
                  value={userData.last_name}
                  onChange={handleChange}
                  disabled={!editMode}
                />

                <InputField
                  label='Email'
                  name='email'
                  type='email'
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
                <div>
                  <h1 className='block text-xl font-semibold text-gray-700 '>
                    Address
                  </h1>
                  <hr />
                </div>
                <div>
                  <label
                    htmlFor='country'
                    className='block text-sm font-semibold text-gray-700 '>
                    Country
                  </label>
                  <select
                    disabled={!editMode}
                    value={userData.country}
                    id='country'
                    name='country'
                    onChange={handleChange}
                    className={`mb-4 mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-indigo-500 ${
                      editMode ? 'bg-white' : 'bg-gray-100'
                    }`}>
                    <option aria-disabled disabled value=''>
                      Select Country
                    </option>
                    <option value='GH'>Ghana</option>
                    {/* Add other countries as needed */}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='region'
                    className='block text-sm font-semibold text-gray-700 '>
                    Region
                  </label>
                  <select
                    disabled={!editMode}
                    value={userData.region}
                    id='region'
                    name='region'
                    onChange={handleChange}
                    className={`mb-4 mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-indigo-500 ${
                      editMode ? 'bg-white' : 'bg-gray-100'
                    }`}>
                    <option aria-disabled disabled value=''>
                      Select Region
                    </option>
                    {data.map((item) => (
                      <option key={item.region} value={item.region}>
                        {item.region}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='city'
                    className='block text-sm font-semibold text-gray-700 '>
                    City
                  </label>
                  <select
                    disabled={!editMode}
                    value={userData.city}
                    id='city'
                    name='city'
                    onChange={handleChange}
                    className={`mb-4 mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-indigo-500 ${
                      editMode ? 'bg-white' : 'bg-gray-100'
                    }`}>
                    <option aria-disabled disabled value=''>
                      Select City
                    </option>
                    {data
                      .find((item) => item.region === userData.region)
                      ?.cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <h1 className='block text-xl font-semibold text-gray-700 '>
                    Extras
                  </h1>
                  <hr />
                </div>
                <InputField
                  label='Phone'
                  name='phone_number'
                  type='text'
                  value={userData.phone_number}
                  onChange={handleChange}
                  disabled={!editMode}
                  component={PhoneInput}
                  default='US'
                />

                <InputField
                  label='About'
                  name='about'
                  type='text'
                  textarea
                  value={userData.about}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </form>
          <div>
            <h1 className='block text-xl font-semibold text-gray-700 '>
              Password
            </h1>
            <hr />
            <button
              className={`mb-4 mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none transition-all ${
                editMode ? 'bg-slate-500 text-white' : 'bg-gray-100'
              }`}
              disabled={!editMode}
              onClick={editMode ? handlePasswordChange : () => {}}>
              Reset password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountPage;
// const AccountPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { authTokens, profile, isLoadingProfile } = useSelector(
//     (state) => state.auth,
//   );

//   const initialUserData = {
//     first_name: '',
//     last_name: '',
//     email: '',
//     about: '',
//     phone_number: '',
//     city: '',
//     region: '',
//     country: '',
//   };

//   const [userData, setUserData] = useState(initialUserData);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!authTokens) {
//         return navigate('/');
//       }

//       setUserData({
//         first_name: profile?.user?.first_name || '',
//         last_name: profile?.user?.last_name || '',
//         email: profile?.user?.email || '',
//         about: profile?.about || '',
//         phone_number: profile?.phone_number || '',
//         city: profile?.city || '',
//         region: profile?.region|| '',
//         country: profile?.country?.name || '',
//       });
//     };
//     console.log('re-rendered');
//     fetchProfile();
//     return () => {
//       // Cleanup logic (if needed)
//     };
//   }, [authTokens, setUserData, dispatch]);

//   const handleEditClick = () => {
//     setEditMode(true);
//   };

//   const handleSaveClick = () => {
//     // Perform save/update logic here
//     setEditMode(false);
//   };

//   const handleCancelClick = () => {
//     // Reset user data and exit edit mode
//     setUserData(initialUserData);
//     setEditMode(false);
//   };

//   const handleChange = (e) => {
//     if (e && e.target) {
//       const { name, value } = e.target;
//       setUserData((prevUserData) => ({
//         ...prevUserData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const toSend = {
//       user: {
//         first_name: userData.first_name,
//         last_name: userData.last_name,
//         email: userData.email,
//       },
//       user_address: {
//         country: { name: userData.country },
//         region: { name: userData.region },
//         city: { name: userData.city, region: userData.region },
//       },
//       about: userData.about,
//     };

//     dispatch(changeProfile(toSend));

//     handleSaveClick();
//   };

//   if (isLoadingProfile) {
//     return <LoadingSpinner />;
//   }

//   const handlePasswordChange = () => {
//     console.log('fjlkadsfasflksa');
//   };

//   return (
//     <>
//       <div className='min-h-screen flex flex-col lg:flex-row md:flex-row justify-between items-start bg-gradient-to-r from-gray-100/10 to-gray-100/10'>
//         <div className='w-full md:w-1/4 p-8 bg-white rounded-md mb-3 border-b'>
//           <div className='text-center mb-6'>
//             <img
//               src='https://via.placeholder.com/150'
//               alt='User Avatar'
//               className='w-20 h-20 mx-auto mb-4 rounded-full'
//             />
//             <h2 className='text-3xl font-bold text-gray-800'>
//               {userData.first_name} {userData.last_name}
//             </h2>
//             <p className='text-gray-500'>{userData.username}</p>
//           </div>

//           <div className='grid grid-cols-1 gap-4'>
//             <p className='text-sm text-gray-600'>
//               <strong>Email:</strong> {userData.email}
//             </p>
//             <p className='text-sm text-gray-600'>
//               <strong>Phone:</strong> {userData.phone_number}
//             </p>
//             <p className='text-sm text-gray-600'>
//               <strong>City:</strong> {userData.city}
//             </p>
//           </div>
//         </div>

//         <div className='w-full md:w-[73%] p-8 bg-white rounded-md shadow-md mb-4 lg:ml-4'>
//           <form onSubmit={(e) => handleSubmit(e)}>
//             <div className='mt-4 flex justify-end'>
//               {editMode ? (
//                 <>
//                   <button
//                     type='button'
//                     onClick={handleCancelClick}
//                     className='mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none transition-all'>
//                     Cancel
//                   </button>
//                   <button
//                     type='submit'
//                     className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none transition-all'>
//                     Save
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   type='button'
//                   onClick={handleEditClick}
//                   className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none transition-all'>
//                   Edit Profile
//                 </button>
//               )}
//             </div>

//             <div className='grid grid-cols-1 gap-4'>
//               <div className='grid grid-cols-1 gap-4'>
//                 <div>
//                   <h1 className='block text-xl font-semibold text-gray-700 '>
//                     Essentials
//                   </h1>
//                   <hr />
//                 </div>
//                 <InputField
//                   label='First Name'
//                   name='first_name'
//                   type='text'
//                   value={userData.first_name}
//                   onChange={handleChange}
//                   disabled={!editMode}
//                 />

//                 <InputField
//                   label='Last Name'
//                   name='last_name'
//                   type='text'
//                   value={userData.last_name}
//                   onChange={handleChange}
//                   disabled={!editMode}
//                 />

//                 <InputField
//                   label='Email'
//                   name='email'
//                   type='email'
//                   value={userData.email}
//                   onChange={handleChange}
//                   disabled={!editMode}
//                 />
//                 <div>
//                   <h1 className='block text-xl font-semibold text-gray-700 '>
//                     Address
//                   </h1>
//                   <hr />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor='country'
//                     className='block text-sm font-semibold text-gray-700 '>
//                     Country
//                   </label>
//                   <select
//                     disabled={!editMode}
//                     value={userData.country}
//                     id='country'
//                     name='country'
//                     onChange={handleChange}
//                     className={`mb-4 mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-indigo-500 ${
//                       editMode ? 'bg-white' : 'bg-gray-100'
//                     }`}>
//                     <option aria-disabled disabled value=''>
//                       Select Country
//                     </option>
//                     <option value='GH'>Ghana</option>
//                     <option value='CA'>Canada</option>
//                   </select>
//                 </div>
//                 <InputField
//                   label='Region'
//                   name='region'
//                   type='text'
//                   value={userData.region}
//                   onChange={handleChange}
//                   disabled={!editMode}
//                 />
//                 <InputField
//                   label='City'
//                   name='city'
//                   type='text'
//                   value={userData.city}
//                   onChange={handleChange}
//                   disabled={!editMode}
//                 />
//                 <div>
//                   <h1 className='block text-xl font-semibold text-gray-700 '>
//                     Extras
//                   </h1>
//                   <hr />
//                 </div>
//                 <InputField
//                   label='Phone'
//                   name='phone_number'
//                   type='text'
//                   value={userData.phone_number}
//                   onChange={handleChange}
//                   disabled={!editMode}
//                   component={PhoneInput}
//                   default='US'
//                 />

//                 <InputField
//                   label='About'
//                   name='about'
//                   type='text'
//                   textarea
//                   value={userData.about}
//                   onChange={handleChange}
//                   disabled={!editMode}
//                 />
//               </div>
//             </div>
//           </form>
//           <div>
//             <h1 className='block text-xl font-semibold text-gray-700 '>
//               Password
//             </h1>
//             <hr />
//             <button
//               className={`mb-4 mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none transition-all ${
//                 editMode ? 'bg-slate-500 text-white' : 'bg-gray-100'
//               }`}
//               disabled={!editMode}
//               onClick={editMode ? handlePasswordChange : () => {}}>
//               Reset password
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
