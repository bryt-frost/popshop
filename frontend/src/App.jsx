import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './components/Modal';
import { Route, Routes, useLocation, useResolvedPath } from 'react-router-dom';

import CartPage from './screens/CartPage';
import ProductDetailPage from './screens/productDetailPage';
import LoginPage from './screens/LoginPage';
import PrivateRoutes from './common/PrivateRoutes';
import RegistrationPage from './screens/RegistrationPage';

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
import DashboardPage from './screens/dashboard/pagesaa/DashboardPage';
import Settings from './screens/dashboard/parials/Settings';
import Analytics from './screens/dashboard/parials/Analytics';
import Home from './screens/Home';
import HomeDash from './screens/dashboard/parials/Home';
import OrderManagement from './screens/dashboard/parials/OrderManagement';
import ProductManagement from './screens/dashboard/parials/ProductManagement';
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
const excludedPaths = [
  '/login',
  '/reset-password',
  '/admin',
  '/admin/settings',
  '/admin/analytics',
  '/admin/order-management',
  '/admin/product-management',
  '/register',
];

const shouldRenderNavbar =
  !excludedPaths.includes(location.pathname) &&
  !location.pathname.startsWith('/set-password');

  return (
    <>
      {shouldRenderNavbar && <Navbar />}

      {isOpen && <Modal />}

      {/* <RegistrationPage /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/admin' element={<DashboardPage />}>
            <Route index element={<HomeDash />} />
            <Route path='analytics' element={<Analytics />} />
            <Route path='settings' element={<Settings />} />
            <Route path='order-management' element={<OrderManagement />} />
            <Route path='product-management' element={<ProductManagement />} />
          </Route>
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
        <Route path='/set-password/:uid/:token' element={<SetPassword />} />
      </Routes>
    </>
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
