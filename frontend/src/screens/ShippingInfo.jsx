import { FaEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { add_to_cart_api } from '../features/cart/cartSlice';
import { useEffect } from 'react';
openModal

import { openModal, } from '../features/modal/modalSlice';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdLocationCity, MdLocationPin } from 'react-icons/md';

const ShippingInfo = ({ total }) => {
  const dispatch = useDispatch();
const { authTokens, profile } = useSelector((state) => state.auth);


  const handleAddToCartApi = async () => {
    try {
      dispatch(add_to_cart_api(/* pass necessary parameters here */));
      // After successfully adding to cart, trigger getCartItems
     // await dispatch(getCartItems());

    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle the error
    }
  };

useEffect(() => {

}, [dispatch]);

  
  const handleViewOnMap = () => {
    // Replace with the actual coordinates or address
    const loc  =   profile.suggested_drop_points?.[0]
    const location = `${loc.city}-${loc.name}`;

    // Create the Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location,
    )}`;
    window.open(googleMapsUrl, '_blank');
  };
  // return (
  //   <div className='w-full rounded-md mb-4 shadow-md'>
  //     <div className='mx-4 rounded-t-md py-2 '>
  //       <h3 className='text-left text-xl font-bold'>Shipping Information</h3>
  //     </div>

  //     <div className='p-4 text-[1rem] '>
  //       <div className='uppercase'>
  //         <div className='flex gap-3 border-b mb-2 border-gray-500'>
  //           <span className='font-bold '>Country:</span>
  //           <span>Ghana</span>
  //         </div>
  //         <div className='flex gap-3 border-b mb-2 border-gray-500'>
  //           <span className='font-bold'>Region:</span>
  //           <span>Volta Region</span>
  //         </div>
  //         <div className='flex gap-3 border-b border-gray-500 mb-2'>
  //           <span className='font-bold'>City:</span>
  //           <span>Aflao</span>
  //         </div>
  //         <div className='flex gap-3 border-b border-gray-500 mb-2 items-center'>
  //           <span className='font-bold'>Pick-up Station:</span>
  //           <span>Glory Ventures - boarder</span>

  //           <FaEye className=' text-blue-500 px-0' size={25} />
  //         </div>
  //       </div>
  //       <button className='text-blue-500 px-0'>
  //         Select Another Pick-up Station
  //       </button>
  //     </div>
  //     <div className=' rounded-t-md  mx-4'>
  //       <h3 className='text-left text-xl font-bold'>Payment Information</h3>
  //       <hr />
  //     </div>
  //     <div className='m-4'>
  //       <div className='p-10'>
  //         <div className='flex justify-between items-center '>
  //           <h2>Total</h2>
  //           <span>GHC {total.toFixed(2)}</span>
  //         </div>
  //         <div className='mt-4 flex justify-between mx-auto'>
  //           <button
  //             onClick={() => dispatch(openModal())}
  //             className='  bg-transparent shadow-sm rounded-full hover:bg-red-500 hover:text-white active:bg-red-600 transition duration-150 active:shadow-xl '>
  //             Clear cart
  //           </button>{' '}
  //           <button
  //             onClick={handleAddToCartApi}
  //             className=' bg-amber-400 text-white shadow-sm rounded-full hover:bg-amber-500 active:bg-amber-600 transition duration-150 active:shadow-xl hover:outline-1 '>
  //             Continue
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className='w-full rounded-md mb-4 shadow-md'>
      <div className=' rounded-t-md py-2 bg-gray-100'>
        <h3 className=' mx-4 text-left text-xl font-bold text-gray-800'>
          Your Current Address
        </h3>
      </div>
      {authTokens && profile ? (
        <div className='p-4 text-sm'>
          <div className='uppercase'>
            <div className='flex items-center justify-between border-b mb-2 border-gray-200'>
              <span className='font-bold'>Country:</span>
              <span>{profile?.user_address?.country}</span>
            </div>
            <div className='flex items-center justify-between border-b mb-2 border-gray-200'>
              <span className='font-bold'>Region:</span>
              <span>{profile?.user_address?.region}</span>
            </div>
            <div className='flex items-center justify-between border-b mb-2 border-gray-200'>
              <span className='font-bold'>City:</span>
              <span>{profile?.user_address?.city}</span>
            </div>
            {profile.suggested_drop_points && (
              <div className=' bg-white rounded-md overflow-hidden shadow '>
                <div className=' p-4'>
                  <small className='text-white text-xs p-1  bg-slate-500 font-bold'>
                    Nearest Drop Point
                  </small>
                  <h2 className='text-xl font-bold '>
                    {profile.suggested_drop_points?.[0].name}
                  </h2>
                  {/* Drop Point Location */}
                  <p className='text-gray-600 text-sm'>
                    City: {profile.suggested_drop_points?.[0].city}
                  </p>{' '}
                  <span className='text-gray-400 lowercase'>
                    This drop point is based on your current address
                  </span>
                  <Link className='text-blue-500 mx-2 hover:underline' to={'/'}>
                    Change address
                  </Link>
                  {/* Drop Point Map Link */}
                  <button
                    onClick={handleViewOnMap}
                    href='#'
                    className='text-blue-500 px-0 hover:underline flex'>
                    <MdLocationPin className='text-blue-500 mr-2' size={20} />{' '}
                    View on map
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>
          {' '}
          <Link to={'login'}>Login to proceed.</Link>
        </p>
      )}

      <div className='mx-4'>
        <div className='rounded-t-md border-t-2 border-gray-200 mt-4'>
          <h3 className='text-left text-xl font-bold py-2 text-gray-800'>
            Payment Information
          </h3>
        </div>

        <div className='p-4'>
          <div className='flex justify-between items-center text-lg'>
            <h3>Shipping fee</h3>
            <span className='text-gray-600'>
              GHC {(total * 0.05).toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between items-center text-lg font-semibold'>
            <h2>Total</h2>
            <span className='text-green-600'>
              GHC {(total + total * 0.05).toFixed(2)}
            </span>
          </div>
          <div className='mt-4 flex justify-between mx-auto'>
            <button
              onClick={() => dispatch(openModal())}
              className='bg-transparent text-red-500 border border-red-500 px-6 py-2 rounded-full hover:bg-red-500 hover:text-white focus:outline-none transition duration-300'>
              Clear Cart
            </button>
            {authTokens ? (
              <button
                onClick={handleAddToCartApi}
                className='bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 focus:outline-none transition duration-300'>
                Continue
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShippingInfo;
