import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsCart2 } from 'react-icons/bs';
import { FaCartArrowDown, FaUserAlt, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import {
  MdOutlineLocalShipping,
  MdOutlineLogin,
  MdOutlineLogout,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { logout, perform_logout } from '../features/auth/authSlice';
import {
  getProductSearchList,
  setQuery,
} from '../features/product/productSearchSlice';
import { clearCart } from '../features/cart/cartSlice';

const Navbar = () => {
  const amount = useSelector((state) => state.cart.amount);
  const { authTokens } = useSelector((state) => state.auth);
  const { query } = useSelector((state) => state.productSearch);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!query) {
      return;
    }
    navigate(`/search?q=${query}`);
  };

  const handleLogout = () => {
     dispatch(logout());
     dispatch(perform_logout());
     dispatch(clearCart())
     
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className='max-w-full flex justify-between items-center py-4 px-2  border-b-2 bg-white'>
      <div className='flex items-center'>
        <FaCartArrowDown className='text-orange-500 text-[20px] md:text-[30px] sm:text-[40px]' />
        <Link
          to='/'
          className='ml-2 md:text-2xl sm:text-2xl text-[1.2rem] font-bold text-[#09110f]'>
          POPSHOP
        </Link>
      </div>

      <div className='flex  bg-gray-100/100 rounded-full ml-2 w-[450px] sm:w-[700px] lg:w-[800px]'>
        <input
          className='bg-transparent w-full h-8 pl-2 focus:outline-none'
          placeholder='Search...'
          type='search'
          name='search'
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <button
          type='submit'
          className='bg-amber-400 p-[0.4rem] rounded-r-full transition duration-150 hover:bg-amber-300 active:bg-amber-500'>
          <AiOutlineSearch size={20} onClick={handleSubmit} />
        </button>
      </div>

      <div className='flex items-center'>
        <Link to='/cart' className='mr-2'>
          <div className='relative'>
            <button className='px-4 hover:bg-[#ffe927] hover:text-[#000000] duration-300 cursor-pointer'>
              <BsCart2 size={20} />
            </button>
            <span className='bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center absolute top-1 right-1 transform translate-x-1 p-2 -translate-y-2'>
              {amount}
            </span>
          </div>
        </Link>

        <div className='relative inline-block text-left'>
          <button onClick={toggleDropdown} className='px-2 cursor-pointer'>
            <FaUserCircle className='' size={20} />
          </button>
          {isOpen && (
            <div className='origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white z-10'>
              <div
                className='py-1'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'>
                {authTokens ? (
                  <>
                    <Link
                      to='/account'
                      onClick={() => setIsOpen(false)}
                      className='px-4 py-2 text-sm flex text-gray-700 hover:bg-gray-100'>
                      <FaUserAlt className='mr-2' size={20} /> My Account
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to='/orders'
                      className='px-4 py-2 text-sm flex text-gray-700 hover:bg-gray-100'>
                      <MdOutlineLocalShipping className='mr-2' size={20} /> My
                      Orders
                    </Link>
                    <Link
                      state={{ previousUrl: location.pathname }}
                      onClick={handleLogout}
                      to='/login'
                      className='px-4 py-2 text-sm flex text-gray-700 hover:bg-gray-100'>
                      <MdOutlineLogout className='mr-2' size={20} /> Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      state={{ previousUrl: location.pathname }}
                      onClick={() => setIsOpen(false)}
                      to='/login'
                      className='px-4 py-2 text-sm flex text-gray-700 hover:bg-gray-100'>
                      <MdOutlineLogin className='mr-2' size={20} /> Login
                    </Link>
                    <Link
                      state={{ previousUrl: location.pathname }}
                      onClick={() => setIsOpen(false)}
                      to='/register'
                      className='px-4 py-2 text-sm flex bg-blue-300  text-gray-700 hover:bg-gray-100'>
                      <FaUserPlus className='mr-2' size={20} /> Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

