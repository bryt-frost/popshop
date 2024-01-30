import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsInCategory } from '../features/category/categorySlice';
import { useSelector } from 'react-redux';

import Add_Remove from '../common/helpers/add_remove';
import StarRating from '../common/helpers/StarRating';
import TruncatedText from '../common/helpers/TruncatedText';
import { FaCartArrowDown } from 'react-icons/fa';
import { addToCart } from '../features/cart/cartSlice';
import LoadingSpinner from '../common/helpers/LoadingSpinner';
import Footer from '../components/Footer';

import Chat from '../components/Chat';

const ProductsInCategory = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  let { id } = useParams();

  const { productsInCategory: items, isLoading } = useSelector(
    (state) => state.category,
  );
  useEffect(() => {
    dispatch(getProductsInCategory(id));
  }, []);


return (
  <div className=''>
    <div className=''>
      {isLoading ? (
        <LoadingSpinner info={'Fetching items'} />
      ) : items && items.length > 0 ? (
        <div className='sm:mx-8 grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2'>
          {items.map((item) => {
            const cartItem = cartItems.find(
              (cartItem) => cartItem.product.id === item.id,
            );
            const isProductInCart = !!cartItem;

            return (
              <div
                key={item.id}
                className='hover:shadow-lg bg-white p-4 shadow-md rounded-md transition-transform transform hover:scale-105'>
                <Link to={`/products/${item.product_id}`}>
                  <div className='w-full h-30 flex justify-center items-center'>
                    <img
                      className='w-[200px] sm:w-[200px] object-cover mx-auto mb-1 rounded-md'
                      src={item.image?.[0]?.image ?? <FaCartArrowDown />}
                      alt={item.title}
                    />
                  </div>

                  <TruncatedText
                    className='text-lg font-semibold'
                    Element='h2'
                    text={item.title}
                  />

                  <StarRating
                    value={item.average_rating}
                    color='text-yellow-500'
                  />
                  <p className='text-orange-500 font-bold mt-2'>
                    GHC {item.price === null ? '- under review' : item.price}
                  </p>
                </Link>

                {isProductInCart ? (
                  <Add_Remove
                    cartItem={cartItem}
                    item={item}
                    className='bg-amber-400 text-white shadow-sm w-full mt-4 rounded-full hover:bg-amber-500 active:bg-amber-600 transition duration-150 active:shadow-xl hover:outline-1 outline outline-offset-2'
                    className2='bg-amber-400 text-white shadow-sm w-full mt-4 rounded-full hover:bg-amber-500 active:bg-amber-600 transition duration-150 active:shadow-xl hover:outline-1 outline outline-offset-2'
                  />
                ) : (
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className='bg-amber-400 text-white shadow-sm w-full mt-4 rounded-full hover:bg-amber-500 active:bg-amber-600 transition duration-150 active:shadow-xl hover:outline-1 outline outline-offset-2'>
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className='text-center text-gray-600 mt-8   h-[40vh] '>
          No items to show in this category.
        </p>
      )}
    </div>
    <Chat />
    <Footer />
  </div>
);
};


export default ProductsInCategory;
