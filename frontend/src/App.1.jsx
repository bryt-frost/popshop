import Navbar from './components/Navbar';
import { Route, Routes, useResolvedPath } from 'react-router-dom';
import Home from './screens/Home';
import CartPage from './screens/CartPage';
import ProductDetailPage from './screens/productDetailPage';
import LoginPage from './screens/LoginPage';
import PrivateRoutes from './common/PrivateRoutes';
import RegistrationPage from './screens/RegistrationPage';

export function App() {
  const location = useResolvedPath();

  const shouldRenderNavbar = location.pathname !== '/login';
  // const { cartItems, isLoading } = useSelector((state) => state.cart);
  // const { isOpen } = useSelector((state) => state.modal);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(calculateTotals());
  // }, [cartItems]);
  // useEffect(() => {
  //   dispatch(getCartItems(''));
  // }, []);
  return (
    <div className='px-4'>
      {/* <Navbar /> */}
      {shouldRenderNavbar && <Navbar />}
      <RegistrationPage />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:product_id' element={<ProductDetailPage />} />
        <Route
          path='/cart'
          element={
            <PrivateRoutes>
              <CartPage />
            </PrivateRoutes>
          }
        />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}
