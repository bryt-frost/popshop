import React, { useEffect, useState } from 'react';
import {
  BiCheck,
  BiX,
  BiLoader,
  BiArrowFromBottom,
  BiArrowFromTop,
} from 'react-icons/bi';
import { FiRefreshCw, FiTruck } from 'react-icons/fi';
import { MdLocationPin, MdPending } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { baseURL } from '../common/baseAPI';
import dayjs from 'dayjs';
import useAxios from '../common/hooks/useAxios';

const OrderTracking = () => {
  const dispatch = useDispatch();
  const [resp, setResp] = useState([]);
  const { authTokens, profile } = useSelector((state) => state.auth);
  useEffect(() => {
    const postData = async () => {
      const url = baseURL + 'orders';
      try {
        const axiosInstance = useAxios({ authTokens, dispatch });
        const resp = await axiosInstance.get(`${url}`);
        setResp(resp.data);
        return resp.data;
      } catch (error) {
        console.log(error.message);
      }
    };

    // Call the async function
    postData();
  }, [setResp, dispatch, authTokens]);
  console.log(resp);
  const orders = resp;

  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (orderId) => {
    setShowDetails((prevDetails) => ({
      ...prevDetails,
      [orderId]: !prevDetails[orderId],
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <MdPending className='text-gray-500 text-4xl' />;
      case 'Processed':
        return <BiLoader className='text-gray-500 text-4xl' />;
      case 'Shipped':
        return <FiTruck className='text-blue-500 text-4xl' />;
      case 'Delivered':
        return <BiCheck className='text-green-500 text-4xl' />;
      case 'Cancelled':
        return <BiX className='text-red-500 text-4xl' />;
      default:
        return null;
    }
  };

  const getProgressBarColor = (stepIndex, currentStatus) => {
    const statusOrder = ['Pending', 'Processed', 'Shipped', 'Delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const isActive = currentIndex >= stepIndex;

    return isActive ? 'bg-blue-500' : 'bg-gray-300';
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
    <div className='flex flex-col md:flex-row flex-grow-0 bg-gray-100'>
      <div className='w-full md:w-[70%] p-4 bg-white shadow-md'>
        <div className='justify-between flex items-center'>
          <h2 className='text-2xl font-semibold mb-6 '>Order Tracking</h2>
          <span className='text-2xl font-semibold mb-6 text-gray-300'>
            {orders.length} orders
          </span>
        </div>

        {orders.map((order) => (
          <div
            key={order.id}
            className={`p-6 border border-gray-300 rounded-md mb-4 transition-all duration-300 ease-in-out transform hover:shadow-lg shadow ${
              order.status === 'cancelled'
                ? 'bg-gray-100/50 hover:shadow-none shadow-none'
                : null
            }`}>
            <div className=' border-b text-sm px-2 flex items-center justify-between mb-4'>
              <h3 className='  text-gray-900 '>ID: {order.id}</h3>
              <p className='text-gray-500'>
                {dayjs(order.created_at).format('MMMM D, YYYY')}
              </p>
            </div>

            {order.status === 'cancelled' ? null : (
              <div className='flex items-center space-x-4'>
                {['pending', 'processed', 'shipped', 'delivered'].map(
                  (status, statusIndex) => (
                    <div
                      key={statusIndex}
                      className='flex-1 text-center relative'>
                      <div className='text-xs capitalize text-gray-500'>
                        {status}
                      </div>
                      <div
                        className={`h-1 ${getProgressBarColor(
                          statusIndex,
                          order.status,
                        )} rounded-full w-full mt-1`}></div>
                    </div>
                  ),
                )}
              </div>
            )}

            <div className='flex items-center justify-between mt-4'>
              <div className='flex items-center'>
                {getStatusIcon(order.status)}
                <p className='ml-2 text-sm text-gray-500 capitalize'>
                  {order.status}
                </p>
              </div>
              <div className='text-center space-x-2'>
                {order.status === 'cancelled' ? null : (
                  <button className='border text-black  py-2 rounded-md m-0  focus:outline-none transition-all duration-300 ease-in-out'>
                    <FiRefreshCw />
                  </button>
                )}

                <button
                  onClick={() => toggleDetails(order.id)}
                  className={`${
                    showDetails[order.id] ? 'bg-red-500' : 'bg-blue-500'
                  } text-white py-2 rounded-md m-0  focus:outline-none transition-all duration-300 ease-in-out`}>
                  {showDetails[order.id] ? (
                    <BiArrowFromBottom />
                  ) : (
                    <BiArrowFromTop />
                  )}
                </button>
              </div>
            </div>

            {showDetails[order.id] && (
              <div className='bg-white rounded-lg overflow-hidden shadow-lg p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <p className='font-semibold text-lg text-gray-800'>
                    Products:
                  </p>
                </div>
                <ul className='list-disc ml-6 text-gray-700'>
                  {order.items.map((item, index) => (
                    <li key={index} className='text-sm mb-2'>
                      {item.product.title}
                    </li>
                  ))}
                </ul>
                <div className='font-semibold text-sm mt-4'>
                  <p className='text-gray-700 mb-2'>
                    Drop Point: {profile?.suggested_drop_points[0].city}
                  </p>
                  <button
                    onClick={handleViewOnMap}
                    className='text-blue-500 hover:text-blue-700 transition duration-300 flex items-center'>
                    <MdLocationPin className='text-blue-500 mr-2' size={20} />
                    View on Map
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className=' flex-grow  bg-black p-4 text-white'>
        <p className='text-2xl font-semibold mb-4'>Hello</p>
      </div>
    </div>
  );
};

export default OrderTracking;
