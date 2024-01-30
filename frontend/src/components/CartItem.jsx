import { FaCaretDown, FaCaretUp, FaProductHunt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import {
  removeItem,
  increaseItem,
  decreaseItem,
  destroy_cart_item,
  getCartItems,
} from '../features/cart/cartSlice';

import { Link } from 'react-router-dom';

const CartItem = (item) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeItem(item.id));
    try {
      let cartItemId = item.id;
      dispatch(destroy_cart_item(cartItemId));
    } catch (error) {
      console.log('there was an error');
    }
  };

  return (
    <article className='flex items-center p-4 border-b border-gray-300'>
      <img
        className='w-20 h-20 rounded-md mr-4'
        src={item.product.image?.[0]?.image || <FaProductHunt />}
        alt={item.product.title}
      />

      <div className='flex flex-col flex-grow'>
        <Link
          to={`/products/${item.product.product_id}`}
          className='text-left text-xl text-gray-800 mb-1'>
          {item.product.title}
        </Link>
        <div className=''>
          <p className='text-gray-600'>{item.product.price}</p>
          <button
            type='button'
            onClick={handleRemoveItem}
            className='mt-2  p-0 text-red-500 hover:text-red-900 rounded-md'>
            Remove
          </button>
        </div>
      </div>

      <div className='flex flex-col items-center mt-4 md:mt-0'>
        <button
          onClick={() => dispatch(increaseItem(item.id))}
          className='icon-button hover:shadow hover:bg-slate-100'>
          <FaCaretUp size={24} />
        </button>
        <p className='text-lg text-black'>{item.quantity}</p>
        <button
          onClick={() => {


            if (item.quantity === 1) {
              if (typeof item.id === 'number') {
                dispatch(destroy_cart_item(item.id));
              }

              dispatch(removeItem(item.id));

              return;
            }
            dispatch(decreaseItem(item.id));
          }}
          className='icon-button hover:shadow hover:bg-slate-100'>
          <FaCaretDown size={24} />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
