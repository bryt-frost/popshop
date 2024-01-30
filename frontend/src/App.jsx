import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './components/Modal';
import { Route, Routes, useLocation, useResolvedPath } from 'react-router-dom';
import Home from './screens/Home';
import CartPage from './screens/CartPage';
import ProductDetailPage from './screens/productDetailPage';
import LoginPage from './screens/LoginPage';
import PrivateRoutes from './common/PrivateRoutes';
import RegistrationPage from './screens/RegistrationPage';
import DashboardPage from './screens/DashboardPage';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { logout, perform_logout } from './features/auth/authSlice';
import SearchPage from './screens/SearchPage';
import PassResetPage from './screens/passResetPage';
import SetPassword from './screens/SetPassword';
import ProductsInCategory from './screens/ProductsInCategory';
import AccountPage from './screens/AccountPage';
import OrderTracking from './screens/Orders';
import PaymentPage from './screens/PaymentPage';

function App() {
  // const location = useResolvedPath();
  const location = useLocation();
  const dispatch = useDispatch();
  const { authTokens } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authTokens) {
      const token = jwtDecode(authTokens.refresh, { complete: true });
      const isExpired = dayjs.unix(token.exp).diff(dayjs()) < 1;
      if (isExpired) {
        localStorage.removeItem('authTokens');
        dispatch(logout());
        dispatch(perform_logout());
      }
    }
  }, [authTokens]);

  const { cartItems } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    if (authTokens) {
      dispatch(getCartItems(''));
    }
  }, [authTokens]);

  const login = '/login';
  const resetPass = '/reset-password';
  const setPass = '/set-password/';
  const register = '/register';

  const shouldRenderNavbar =
    location.pathname !== login &&
    location.pathname !== resetPass &&
    location.pathname !== register &&
    !location.pathname.startsWith(setPass);

  return (
    <div className='px-2'>
      
      {shouldRenderNavbar && <Navbar />}

      {isOpen && <Modal />}

      {/* <RegistrationPage /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/orders' element={<OrderTracking />} />
          <Route path='/payment-page' element={<PaymentPage />} />
        </Route>
        <Route path='/products/:product_id' element={<ProductDetailPage />} />
        <Route path='/categories/:id' element={<ProductsInCategory />} />
        <Route path={`/search`} element={<SearchPage />} />
 
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/reset-password' element={<PassResetPage />} />
        <Route
          path='/set-password/:uid/:token'
          element={<SetPassword />}
        />
      </Routes>
    </div>
  );
}

export default App;
// <div>
//   <Navbar />
//   <FeaturedItems />
//   {isOpen && <Modal />}
//   {isLoading ? (
//     <div className='my-[20vh]'>
//       <div className='flex justify-center items-center bg-transparent '>
//         <div
//           style={{ animationDuration: '0.5s' }}
//           className='animate-spin rounded-full h-10 w-10 border-t-4 border-blue-800  border-solid'></div>
//       </div>
//       <p className='text-center text-gray-500 pt-3'>Just a second</p>
//     </div>
//   ) : (
//     <CartContainer />
//   )}
// </div>
