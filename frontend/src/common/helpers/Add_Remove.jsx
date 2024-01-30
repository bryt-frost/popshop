import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeItem,
  decreaseItem,
} from '../../features/cart/cartSlice';

const Add_Remove = ({ cartItem, item, className,className2 }) => {
  const dispatch = useDispatch();
  return (
    <div className=' flex mx-0 items-center justify-center'>
      <button
        onClick={() => {
          if (cartItem.quantity === 1) {
            dispatch(removeItem(cartItem.id));
            return;
          }
          dispatch(decreaseItem(cartItem.id));
        }}
        className={className}>
        <FaMinus className='inline ' />
      </button>
      <span className='w-full text-center mt-4'>{cartItem.quantity}</span>
      <button
        onClick={() => {
          dispatch(addToCart(item));
        }}
        className={className2}>
        <FaPlus className='inline' />
      </button>
    </div>
  );
};
export default Add_Remove;
