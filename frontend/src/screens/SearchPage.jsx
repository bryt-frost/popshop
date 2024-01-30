import { useDispatch, useSelector } from 'react-redux';

import LoadingSpinner from '../common/helpers/LoadingSpinner';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductSearchList } from '../features/product/productSearchSlice';
import Searched from '../components/Searched';
import { MdSearchOff } from 'react-icons/md';
import { addToCart } from '../features/cart/cartSlice';
import SortSection from '../components/SortSection';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Chat from '../components/Chat';
import Footer from '../components/Footer';

const SearchPage = () => {
  const {
    results,
    isLoading,
    totalPages,
    currentPage: current,
  } = useSelector((state) => state.productSearch);

  const [currentPage, setCurrentPage] = useState(current);

  const dispatch = useDispatch();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  const handlePageChange = (newPage) => {
    // Set the newPage directly instead of relying on the current state
    setCurrentPage(newPage);

    // Update the params with the new page
    const updatedParams = { searchQuery, currentPage: newPage };
    dispatch(getProductSearchList(updatedParams));
  };

  useEffect(() => {
    // Fetch the data with the current page from the state
    const updatedParams = { searchQuery, currentPage };
    dispatch(getProductSearchList(updatedParams));
  }, [searchQuery, currentPage, dispatch]);

  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner info='Fetching products' />
      ) : (
        <div className='container mx-auto'>
          {results.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-[30vh]'>
              <MdSearchOff className='mx-auto text-6xl text-gray-500' />

              <div className='mt-4 text-center'>
                <p className='text-xl font-light text-gray-700'>
                  No results found for "{searchQuery}"
                </p>
              </div>
            </div>
          ) : (
            <>
              {results.length !== 0 && (
                <SortSection currentPage={currentPage} />
              )}

              <div className='sm:mx-8 grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2'>
                {results.map((result) => (
                  <div key={result.id} className='mb-4'>
                    <Searched
                      result={result}
                      cartItem={cartItems.find(
                        (cartItem) => cartItem.product.id === result.id,
                      )}
                      addToCart={(item) => dispatch(addToCart(item))}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <div className='flex items-center justify-center mt-4 space-x-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-full focus:outline-none'>
            <FaChevronLeft className='w-4 h-4 mr-2' />
            Previous
          </button>

          {totalPages > currentPage && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-full focus:outline-none'>
              Next
              <FaChevronRight className='w-4 h-4 ml-2' />
            </button>
          )}
        </div>
      )}
      <Chat />
      <Footer />
    </>
  );
};

export default SearchPage;
