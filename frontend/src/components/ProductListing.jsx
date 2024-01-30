import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TruncatedText from '../common/helpers/TruncatedText';
import { FaCartArrowDown } from 'react-icons/fa';

import { getProductList } from '../features/product/productListSlice';

import { addToCart } from '../features/cart/cartSlice';

import LoadingSpinner from '../common/helpers/LoadingSpinner';
import ProductCard from './ProductCard';



const ProductListing = () => {
  const dispatch = useDispatch();
  const { productItems, isLoading, totalPages, currentPage:current } = useSelector(
    (state) => state.productList,
  );
  const { cartItems } = useSelector((state) => state.cart);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProductList(currentPage));
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {/* ... Header section */}
      {isLoading ? (
        <LoadingSpinner info={'New Arrivals'} />
      ) : (
        <div className='sm:mx-8 grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2'>
          {productItems.map((item) => (
            <ProductCard
              key={item.product_id}
              item={item}
              cartItem={cartItems.find(
                (cartItem) => cartItem.product.id === item.id,
              )}
              addToCart={(item) => dispatch(addToCart(item))}
            />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className='flex justify-center mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='mx-2 px-4 py-2 bg-gray-300 rounded-full'>
            Previous
          </button>
          {totalPages !== current && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='mx-2 px-4 py-2 bg-gray-300 rounded-full'>
              Next
            </button>
          )}
        </div>
      )}
    </>
  );
};


// const ProductListing = () => {
//   const dispatch = useDispatch();
//   const { productItems, isLoading, totalPages } = useSelector(
//     (state) => state.productList,
//   );
//   const { cartItems } = useSelector((state) => state.cart);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loadingMore, setLoadingMore] = useState(false);

//   useEffect(() => {
//     dispatch(getProductList(currentPage));
//   }, [dispatch, currentPage]);

//   const handlePageChange = () => {
//     if (!loadingMore && currentPage < totalPages) {
//       setLoadingMore(true);
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // When new products are loaded, set loadingMore to false
//   useEffect(() => {
//     setLoadingMore(false);
//   }, [productItems]);

//   // Event listener for infinite scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrolledToBottom =
//         window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
//       if (scrolledToBottom) {
//         handlePageChange();
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [handlePageChange]);

//   return (
//     <>
//       {/* ... Header section */}
//       <div className='sm:mx-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2'>
//         {productItems.map((item) => (
//           <ProductCard
//             key={item.product_id}
//             item={item}
//             cartItem={cartItems.find(
//               (cartItem) => cartItem.product.id === item.id,
//             )}
//             addToCart={(item) => dispatch(addToCart(item))}
//           />
//         ))}
//       </div>

//       {/* Loading indicator while more products are being loaded */}
//       {loadingMore && <div className='text-center mt-4'>Loading more...</div>}

//       {/* Optionally, you can show a "Load More" button instead of infinite scroll */}
//       {!loadingMore && currentPage < totalPages && (
//         <div className='flex justify-center mt-4'>
//           <button
//             onClick={handlePageChange}
//             className='px-4 py-2 bg-gray-300 rounded-full'>
//             Load More
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// const ProductListing = () => {
//   const dispatch = useDispatch();
//   const { productItems, isLoading } = useSelector((state) => state.productList);
//   const { cartItems } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(getProductList());
//   }, [dispatch]);

//   return (
//     <>
//       {/* ... Header section */}
//       {isLoading ? (
//         <LoadingSpinner />
//       ) : (
//         <div className='sm:mx-10 grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2'>
//           {productItems.map((item) => (
//             <ProductCard
//               key={item.product_id}
//               item={item}
//               cartItem={cartItems.find(
//                 (cartItem) => cartItem.product.id === item.id,
//               )}
//               addToCart={(item) => dispatch(addToCart(item))}
//             />
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

export default ProductListing;
