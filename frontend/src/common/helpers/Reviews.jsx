import { useSelector } from 'react-redux';
import StarRating from './StarRating';
import { BsCheck2Circle } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const { product } = useSelector((state) => state.productDetail);
  return (
    <div className=''>
      <div className='my-2 w-full'>
        <div className='px-2 py-0.5 bg-slate-500 rounded-full mb-2'>
          {' '}
          <h1 className='font-bold text-xl text-white'>Reviews</h1>
        </div>
        {product.reviews?.map((review) => (
          <div key={review.id}>
            <div className='w-full bg-blue-50/30 rounded-lg px-4 overflow-hidden shadow-md'>
              <div className='py-4 flex '>
                {review.user.profile_picture ? (
                  <img
                    className='w-10 h-10  rounded-full mr-4'
                    src={review.user.profile_picture}
                    alt='reviewer avatar'
                  />
                ) : (
                  <div className='flex '>
                    <FaUserCircle className='w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12 text-gray-500 mr-4' />
                    {/* Your other content here */}
                  </div>
                )}

                <div className='py-1 pb-1 w-full'>
                  <div className='flex justify-between items-center'>
                    <div className='text-sm'>
                      <div className='flex justify-between'>
                        <p className='text-gray-800 mb-2 leading-none font-bold'>
                          Review by:{' '}
                          <span className='text-gray-500'>
                            {review.user.user?.email}
                          </span>
                        </p>
                      </div>
                      <p className='text-gray-600'>{review.text}</p>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <StarRating value={review.stars} color='text-yellow-500' />
                    <div>
                      <span className='text-sm text-amber-600'>
                        Actually purchased
                      </span>
                      <BsCheck2Circle
                        className='inline ml-1 text-green-600'
                        size={25}
                      />
                    </div>
                  </div>
                  <p className='text-sm'>
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    <span className='mx-1'>/</span>
                    {new Date(review.created_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {product.reviews?.length > 1 && (
        <div className='text-end mt-8  mb-8'>
          <button className='rounded-full p-3 bg-gray-300 text-amber-500 font-bold'>
            <Link to='/'>SEE MORE REVIEWS</Link>
          </button>
        </div>
      )}
      {product.reviews?.length === 0 && (
        <div className='text-center mt-8  mb-8'>
          <h3>No reviews yet.</h3>
        </div>
      )} */}
      {product.reviews?.length > 0 && (
        <div className='mt-8 mb-8 text-center'>
          {product.reviews.length > 2 && (
            <button
              className='inline-block px-6 py-3 font-semibold rounded-full transition duration-300 bg-opacity-70 hover:bg-opacity-90 bg-gray-200  text-gray-700 hover:text-gray-600 hover:underline'
              onClick={() => history.push('/')}>
              See More Reviews
            </button>
          )}
        </div>
      )}
      {product.reviews?.length === 0 && (
        <h3 className='text-gray-600 text-center p-4'>No reviews yet.</h3>
      )}

    </div>
    // <div className=''>
    //   <div className='my-4 w-full'>
    //     <div className='px-3 py-1 bg-slate-500 rounded-full mb-4'>
    //       <h1 className='font-bold text-xl text-white'>Customer Reviews</h1>
    //     </div>
    //     {product.reviews?.map((review) => (
    //       <div
    //         key={review.id}
    //         className='w-full bg-blue-50/30 rounded-lg p-4 mb-4 overflow-hidden shadow-md'>
    //         <div className='flex items-center'>
    //           {review.user.profile_picture ? (
    //             <img
    //               className='w-10 h-10 rounded-full mr-4'
    //               src={review.user.profile_picture}
    //               alt='reviewer avatar'
    //             />
    //           ) : (
    //             <div className='flex'>
    //               <FaUserCircle className='w-10 h-10 text-gray-500 mr-4' />
    //               {/* Your other content here */}
    //             </div>
    //           )}

    //           <div className='flex-1'>
    //             <div className='flex justify-between items-center'>
    //               <div>
    //                 <p className='text-gray-800 mb-1 leading-none font-semibold'>
    //                   Reviewed by:{' '}
    //                   <span className='text-gray-500'>
    //                     {review.user.user?.email}
    //                   </span>
    //                 </p>
    //               </div>
    //               <div className='flex items-center'>
    //                 <StarRating value={review.stars} color='text-yellow-500' />
    //                 <div className='ml-2'>
    //                   <span className='text-xs text-amber-600 font-semibold'>
    //                     Verified Purchase
    //                   </span>
    //                   <BsCheck2Circle
    //                     className='inline ml-1 text-green-600'
    //                     size={18}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //             <p className='text-gray-600 mb-2'>{review.text}</p>
    //             <p className='text-xs text-gray-500'>
    //               {new Date(review.created_at).toLocaleDateString('en-US', {
    //                 year: 'numeric',
    //                 month: 'long',
    //                 day: 'numeric',
    //               })}{' '}
    //               <span className='mx-1'>/</span>{' '}
    //               {new Date(review.created_at).toLocaleTimeString('en-US', {
    //                 hour: 'numeric',
    //                 minute: 'numeric',
    //               })}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   {product.reviews?.length > 1 && (
    //     <div className='text-end mt-8 mb-8'>
    //       <button className='rounded-full p-3 bg-gray-300 text-amber-500 font-bold'>
    //         <Link to='/'>See More Reviews</Link>
    //       </button>
    //     </div>
    //   )}
    //   {product.reviews?.length === 0 && (
    //     <div className='text-center mt-8 mb-8'>
    //       <h3>No reviews yet.</h3>
    //     </div>
    //   )}
    // </div>
    // <div className=''>
    //   <div className='my-4 w-full'>
    //     <div className='px-3 py-1 bg-slate-500 rounded-full mb-4'>
    //       <h1 className='font-bold text-xl text-white'>Customer Reviews</h1>
    //     </div>
    //     {product.reviews?.map((review) => (
    //       <div
    //         key={review.id}
    //         className='w-full bg-blue-50/30 rounded-lg p-4 mb-4 overflow-hidden shadow-md'>
    //         <div className='flex flex-col md:flex-row items-center'>
    //           {review.user.profile_picture ? (
    //             <img
    //               className='w-10 h-10 rounded-full mb-4 md:mr-4 md:mb-0'
    //               src={review.user.profile_picture}
    //               alt='reviewer avatar'
    //             />
    //           ) : (
    //             <div className='flex mb-4 md:mr-4 md:mb-0'>
    //               <FaUserCircle className='w-10 h-10 text-gray-500' />
    //               {/* Your other content here */}
    //             </div>
    //           )}

    //           <div className='flex-1'>
    //             <div className='flex justify-between items-center mb-2'>
    //               <div>
    //                 <p className='text-gray-800 leading-none font-semibold'>
    //                   Reviewed by:{' '}
    //                   <span className='text-gray-500'>
    //                     {review.user.user?.email}
    //                   </span>
    //                 </p>
    //               </div>
    //               <div className='flex items-center'>
    //                 <StarRating value={review.stars} color='text-yellow-500' />
    //                 <div className='ml-2'>
    //                   <span className='text-xs text-amber-600 font-semibold'>
    //                     Verified Purchase
    //                   </span>
    //                   <BsCheck2Circle
    //                     className='inline ml-1 text-green-600'
    //                     size={18}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //             <p className='text-gray-600 mb-2'>{review.text}</p>
    //             <p className='text-xs text-gray-500'>
    //               {new Date(review.created_at).toLocaleDateString('en-US', {
    //                 year: 'numeric',
    //                 month: 'long',
    //                 day: 'numeric',
    //               })}{' '}
    //               <span className='mx-1'>/</span>{' '}
    //               {new Date(review.created_at).toLocaleTimeString('en-US', {
    //                 hour: 'numeric',
    //                 minute: 'numeric',
    //               })}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   {product.reviews?.length > 1 && (
    //     <div className='text-center md:text-end mt-8 mb-8'>
    //       <button className='rounded-full p-3 bg-gray-300 text-amber-500 font-bold'>
    //         <Link to='/'>See More Reviews</Link>
    //       </button>
    //     </div>
    //   )}
    //   {product.reviews?.length === 0 && (
    //     <div className='text-center mt-8 mb-8'>
    //       <h3>No reviews yet.</h3>
    //     </div>
    //   )}
    // </div>
    // <div className=''>
    //   <div className='my-4 w-full'>
    //     <div className='px-3 py-1 bg-slate-500 rounded-full mb-4'>
    //       <h1 className='font-bold text-xl text-white'>Customer Reviews</h1>
    //     </div>
    //     {product.reviews?.map((review) => (
    //       <div
    //         key={review.id}
    //         className='w-full bg-blue-50/30 rounded-lg p-4 mb-4 overflow-hidden shadow-md'>
    //         <div className='flex flex-col md:flex-row items-center'>
    //           {review.user.profile_picture ? (
    //             <img
    //               className='w-10 h-10 rounded-full mb-2 md:mr-4 md:mb-0'
    //               src={review.user.profile_picture}
    //               alt='reviewer avatar'
    //             />
    //           ) : (
    //             <div className='flex mb-2 md:mr-4 md:mb-0'>
    //               <FaUserCircle className='w-10 h-10 text-gray-500' />
    //               {/* Your other content here */}
    //             </div>
    //           )}

    //           <div className='flex-1'>
    //             <div className='flex flex-col md:flex-row justify-between items-center mb-2'>
    //               <div className='mb-2 md:mb-0'>
    //                 <p className='text-gray-800 leading-none font-semibold'>
    //                   Reviewed by:{' '}
    //                   <span className='text-gray-500'>
    //                     {review.user.user?.email}
    //                   </span>
    //                 </p>
    //               </div>
    //               <div className='flex items-center'>
    //                 <StarRating value={review.stars} color='text-yellow-500' />
    //                 <div className='ml-2'>
    //                   <span className='text-xs text-amber-600 font-semibold'>
    //                     Verified Purchase
    //                   </span>
    //                   <BsCheck2Circle
    //                     className='inline ml-1 text-green-600'
    //                     size={18}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //             <p className='text-gray-600 mb-2'>{review.text}</p>
    //             <p className='text-xs text-gray-500'>
    //               {new Date(review.created_at).toLocaleDateString('en-US', {
    //                 year: 'numeric',
    //                 month: 'long',
    //                 day: 'numeric',
    //               })}{' '}
    //               <span className='mx-1'>/</span>{' '}
    //               {new Date(review.created_at).toLocaleTimeString('en-US', {
    //                 hour: 'numeric',
    //                 minute: 'numeric',
    //               })}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   {product.reviews?.length > 1 && (
    //     <div className='text-center md:text-end mt-8 mb-8'>
    //       <button className='rounded-full p-3 bg-gray-300 text-amber-500 font-bold'>
    //         <Link to='/'>See More Reviews</Link>
    //       </button>
    //     </div>
    //   )}
    //   {product.reviews?.length === 0 && (
    //     <div className='text-center mt-8 mb-8'>
    //       <h3>No reviews yet.</h3>
    //     </div>
    //   )}
    // </div>
    // <div className=''>
    //   <div className='my-4 w-full'>
    //     <div className='px-3 py-1 bg-slate-500 rounded-full mb-4'>
    //       <h1 className='font-bold text-xl text-white'>Customer Reviews</h1>
    //     </div>
    //     {product.reviews?.map((review) => (
    //       <div
    //         key={review.id}
    //         className='w-full bg-blue-50/30 rounded-lg p-4 mb-4 overflow-hidden shadow-md'>
    //         <div className='flex flex-col md:flex-row items-center'>
    //           {review.user.profile_picture ? (
    //             <img
    //               className='w-10 h-10 rounded-full mb-2 md:mb-0 md:mr-4'
    //               src={review.user.profile_picture}
    //               alt='reviewer avatar'
    //             />
    //           ) : (
    //             <div className='flex mb-2 md:mb-0'>
    //               <FaUserCircle className='w-10 h-10 text-gray-500' />
    //               {/* Your other content here */}
    //             </div>
    //           )}

    //           <div className='flex-1'>
    //             <div className='flex flex-col md:flex-row items-center md:justify-between mb-2'>
    //               <div className='md:flex md:items-center'>
    //                 <p className='text-gray-800 leading-none font-semibold mb-1 md:mb-0'>
    //                   Reviewed by:{' '}
    //                   <span className='text-gray-500'>
    //                     {review.user.user?.email}
    //                   </span>
    //                 </p>
    //               </div>
    //               <div className='flex items-center'>
    //                 <StarRating value={review.stars} color='text-yellow-500' />
    //                 <div className='ml-2'>
    //                   <span className='text-xs text-amber-600 font-semibold'>
    //                     Verified Purchase
    //                   </span>
    //                   <BsCheck2Circle
    //                     className='inline ml-1 text-green-600'
    //                     size={18}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //             <p className='text-gray-600 mb-2'>{review.text}</p>
    //             <p className='text-xs text-gray-500'>
    //               {new Date(review.created_at).toLocaleDateString('en-US', {
    //                 year: 'numeric',
    //                 month: 'long',
    //                 day: 'numeric',
    //               })}{' '}
    //               <span className='mx-1'>/</span>{' '}
    //               {new Date(review.created_at).toLocaleTimeString('en-US', {
    //                 hour: 'numeric',
    //                 minute: 'numeric',
    //               })}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   {product.reviews?.length > 1 && (
    //     <div className='text-center md:text-end mt-8 mb-8'>
    //       <button className='rounded-full p-3 bg-gray-300 text-amber-500 font-bold'>
    //         <Link to='/'>See More Reviews</Link>
    //       </button>
    //     </div>
    //   )}
    //   {product.reviews?.length === 0 && (
    //     <div className='text-center mt-8 mb-8'>
    //       <h3>No reviews yet.</h3>
    //     </div>
    //   )}
    // </div>
  );
};
export default Reviews;
