import Reviews from '../common/helpers/Reviews';
import Product from '../components/Product';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useSelector } from 'react-redux';
import { BsHeart, BsShareFill } from 'react-icons/bs';
import Add_Remove from '../common/helpers/add_remove';
import Footer from '../components/Footer';

import Chat from '../components/Chat';

import Swal from 'sweetalert2';

//import 'sweetalert2/src/sweetalert2.scss';
import '@sweetalert2/theme-material-ui';
const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productDetail);
  const { cartItems } = useSelector((state) => state.cart);
  const { authTokens } = useSelector((state) => state.auth);
  const cartItem = cartItems.find(
    (cartItem) => cartItem.product.id === product.id,
  );
  const isProductInCart = !!cartItem;
  const { isOpen } = useSelector((state) => state.chatModal);
  const handleAddToFavorite = () => {
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
Toast.fire({
  icon: 'success',
  title: 'Signed in successfully',
});

  };
  return (
    <div className={`w-full ${!isOpen ? '' : 'fixed h-screen bottom-0'}`}>
      <Product product={product} />
      <div className='mb-3'>
        <Reviews />
      </div>

      <div className='fixed bottom-0 left-0 right-0  bg-white justify-center items-center text-center flex md:mx-[30%] p-4 rounded-full mt-4 shadow-md'>
        {authTokens && (
          <button
            onClick={handleAddToFavorite}
            className='m-0 hover:text-amber-500 active:border-amber-600 active:border'>
            <BsHeart
              className='inline text-amber-400 shadow-sm rounded-md'
              size={30}
            />
          </button>
        )}

        <div className='flex-1 md:w-full'>
          {isProductInCart ? (
            <Add_Remove
              cartItem={cartItem}
              item={product}
              className='bg-amber-400 text-white shadow-sm rounded-s-full hover:bg-amber-500 active:bg-amber-600 transition duration-150 active:shadow-xl px-8 p-3 w-[30%] md:w-[50%]'
              className2='bg-amber-400 text-white shadow-sm rounded-e-full  hover:bg-amber-500 active:bg-amber-600 transition duration-150 active:shadow-xl px-8 p-3 w-[30%] md:w-[50%]'
            />
          ) : (
            <button
              onClick={() => {
                dispatch(addToCart(product));
              }}
              className='bg-amber-400 text-white shadow-sm rounded-md hover:bg-amber-500 active:bg-amber-600 transition duration-150 active:shadow-xl p-3 w-[80%] md:w-[100%]'>
              Add to Cart
            </button>
          )}
        </div>

        <button className='hover:text-amber-500 active:border-amber-600 active:border inline'>
          <BsShareFill
            className='inline text-amber-400 shadow-sm rounded-md'
            size={30}
          />
        </button>
      </div>

      <Footer />
      <Chat />
    </div>
  );
};

export default ProductDetailPage;
