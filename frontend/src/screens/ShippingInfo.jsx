import { useDispatch } from 'react-redux';

import { add_to_cart_api, clearCart } from '../features/cart/cartSlice';

import { openModal } from '../features/modal/modalSlice';

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { MdLocationPin } from 'react-icons/md';
import Swal from 'sweetalert2';
import { usePaystackPayment } from 'react-paystack';

import { baseURL } from '../common/baseAPI';
import useAxios from '../common/hooks/useAxios';

const ShippingInfo = ({ total }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authTokens, profile } = useSelector((state) => state.auth);
  const userData = {
    email: profile?.user.email,
    phone: profile?.phone_number || '',
    name: `${profile?.user.first_name} ${profile.user.last_name}`,
    suggested_drop_points: profile?.suggested_drop_points[0] || [],
    publicKey: 'pk_test_a7195117e0211a8d30ba80d8516c355d6607a703',
    // Add other user information as needed
  };
  console.log(userData);
  const handleCancel = () => {
    navigate('/account');
  };

  const shippingFee = (total * 0.05).toFixed(2);
  const allTotal = (Number(total) + Number(shippingFee)).toFixed(2);
  const forPaystack = Math.ceil(allTotal);

  const componentProps = {
    email: userData.email,
    amount: parseInt(forPaystack) * 100,
    currency: 'GHS',
    metadata: {
      name: userData.name,
      phone: userData.phone,
    },
    publicKey: 'pk_test_a7195117e0211a8d30ba80d8516c355d6607a703',
  };

  const initializePayment = usePaystackPayment(componentProps);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const onSuccess = (response) => {
    const url = baseURL + 'orders/pay/';
    const ref = response.reference || '';

    const data = {
      email: componentProps.email,
      amount: forPaystack,
      ref: ref,
    };

    const axiosInstance = useAxios({ authTokens, dispatch });
    axiosInstance
      .post(url, data)
      .then((response) => {
        if (response.status === 201) {
          axiosInstance
            .get(baseURL + 'orders/pay/verify/' + ref)
            .then((resp) => {
              if (resp.status === 200) {
                Toast.fire({
                  icon: 'success',
                  background: '#78C07C',

                  titleText: resp.data.detail,
                  color: '#fff',
                });
                axiosInstance
                  .post(
                    baseURL + 'orders/create-order/',
                    userData.suggested_drop_points,
                  )
                  .then((res) => {
                    if (res.status === 201) {
                      Toast.fire({
                        icon: 'success',
                        background: '#78C07C',
                        titleText: 'Order created',
                        color: '#fff',
                      });
                      dispatch(clearCart());
                    }
                  })
                  .catch((err) => {
                    Toast.fire({
                      background: '#FFD54F',
                      titleText: 'The order could not be created',
                      color: '#FFFFFF',
                    });
                  });
              }
            })
            .catch((err) => {
              Toast.fire({
                background: '#FFD54F',
                titleText: err.response.data.detail,
                color: '#FFFFFF',
              });
            });
        }
      })
      .catch((error) => {
        Toast.fire({
          background: '#FFD54F',
          titleText: response.error,
          color: '#FFFFFF',
        });
      });
  };
  const onClose = (error) => {
    Toast.fire({
      background: '#FFD54F',
      titleText: 'Payment cancelled',
      color: '#FFFFFF',
    });
  };

  const handlePayment = () => {
    initializePayment({ onSuccess, onClose });
  };

  const handleUserConfirmation = () => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'ml-4 bg-green-500 text-white border border-green-500 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg',
        cancelButton:
          'text-black py-2 px-6 focus:outline-none hover:bg-red-400 hover:text-white rounded text-lg border border-red-400',
      },

      buttonsStyling: false,
    });

    swalWithTailwindButtons
      .fire({
        title: 'User Confirmation',
        html: `
<div class="text-left">
  <p class="text-gray-700 mb-2"><strong>Email:</strong> ${userData.email}</p>
  <p class="text-gray-700 mb-2"><strong>Phone:</strong> ${userData.phone}</p>
  <p class="text-gray-700 mb-2"><strong>Name:</strong> ${userData.name}</p>
</div>
    `,
        icon: 'question',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Yes, proceed!',
        cancelButtonText: 'No, Edit It!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handlePayment();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          handleCancel();
        }
      });
  };

  const handleAddToCartApi = async () => {
    try {
      dispatch(add_to_cart_api());
      handleUserConfirmation();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleViewOnMap = () => {
    // Replace with the actual coordinates or address
    const loc = profile.suggested_drop_points?.[0];
    const location = `${loc.city}-${loc.name}`;

    // Create the Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location,
    )}`;
    window.open(googleMapsUrl, '_blank');
  };

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
                  <Link className='text-blue-500 mx-2 hover:underline' to={'/account'}>
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
        <div className='text-sm p-4 border border-gray-200 rounded-lg mx-4 mt-4'>
          <Link className='text-blue-500' to={'login'}>
            Login to proceed.
          </Link>
          <p>Check that you have completed setting up your profile. </p>
          <Link className='text-blue-500' to={'/account'}>
            Click here to go to profile
          </Link>
        </div>
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
            <span className='text-gray-600'>GHC {shippingFee}</span>
          </div>
          <div className='text-lg flex  justify-between items-center font-semibold'>
            <h2>Total</h2>
            <span className='text-green-600'>GHC {allTotal}</span>
          </div>
          <div className='mt-4 flex items-center flex-wrap justify-between mx-auto gap-2'>
            {authTokens ?(
              <button
                onClick={handleAddToCartApi}
                className='bg-amber-500 text-white px-6 py-2 rounded-none hover:bg-amber-600 w-full focus:outline-none transition duration-300'>
                Proceed to Payment
              </button>
            ) : (
              <Link to={'/login'} />
            )}
            <button
              onClick={() => dispatch(openModal())}
              className='bg-transparent text-red-500 border border-red-500 px-6 py-2 rounded-none w-full hover:bg-red-500 hover:text-white focus:outline-none transition duration-300'>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShippingInfo;
