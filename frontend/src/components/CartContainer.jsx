import { FaCartArrowDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';
import CartItem from './CartItem';

const CartContainer = () => {
  const dispatch = useDispatch();
  const { amount, cartItems, total } = useSelector((state) => state.cart);
  console.log(cartItems);
  if (amount < 1) {
    return (
      <section className='md:w-2/3 flex-grow mx-auto rounded-md mb-4 shadow-md '>
        <div className=' rounded-md py-4 bg-slate-100'>
          <h3 className='text-center text-2xl font-bold'>
            <FaCartArrowDown
              className=' inline mx-6 text-orange-500'
              size={30}
            />
            Your Bag
          </h3>
          <p className='text-center font-medium text-gray-700 py-10'>
            Your cart is empty
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className='md:w-2/3 w-[92%] flex-grow mx-auto rounded-md mb-4 shadow-md'>
      <div className=' rounded-md py-4 bg-slate-100'>
        <h3 className='text-center text-2xl font-bold'>
          <FaCartArrowDown className=' inline mx-6 text-orange-500' size={30} />
          Your Bag
        </h3>
      </div>
      <div>
        {cartItems.map((item) => {
        
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr className='w-[90%] mx-auto' />
        <div className='p-10'>
          <div className='flex justify-between items-center '>
            <h2>Total</h2>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className='mt-4 flex justify-between mx-auto'>
            <button
              onClick={() => dispatch(openModal())}
              className=' bg-red-500/90 text-white'>
              Clear cart
            </button>{' '}
            <button className=' bg-yellow-500 text-white'>
              Clear Check Out
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
};
export default CartContainer;
