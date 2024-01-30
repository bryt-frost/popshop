import { useMemo } from 'react';
import { FaCartArrowDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import ShippingInfo from './ShippingInfo';
import CartItem from './../components/CartItem';
import { baseURL } from '../common/baseAPI';


const CartPage = () => {

  const { amount, cartItems, total } = useSelector((state) => state.cart);
  const placeOrder=()=>{
     const response = axios.post(baseURL + 'order', userData);

  }

  if (amount < 1) {
    return (
      <section className=' mt-4 md:w-2/3 flex-grow mx-auto rounded-md mb-4 shadow-md '>
        <div className=' rounded-md py-4 bg-slate-100'>
          <h3 className=' text-left text-xl font-bold text-gray-800'>
            <FaCartArrowDown
              className=' inline mx-6 text-orange-500'
              size={30}
            />
            Your Cart
          </h3>
          <p className='text-center font-medium text-gray-700 py-10'>
            Your cart is empty
          </p>
        </div>
      </section>
    );
  }
  return (
    <div className='mt-4 md:flex flex-auto justify-center items-start gap-4'>
      <div className='w-full rounded-md mb-4 shadow-md bg-white'>
        <div className='rounded-t-md py-2 bg-gray-100'>
          <h3 className='text-left text-xl font-bold text-gray-800 flex items-center justify-center'>
            <FaCartArrowDown className='mr-2 text-orange-500' size={30} />
            Your Cart
          </h3>
        </div>
        <div className='p-4'>
          {cartItems.map((item) => (
            <CartItem key={item.product.id} {...item} />
          ))}
        </div>
        <div className='border-t border-gray-300'>
          {' '}
          <button onClick={placeOrder} className='bg-blue-500'>order</button>
        </div>
      </div>

      <ShippingInfo total={total} />
    </div>
  );
};
export default CartPage;
