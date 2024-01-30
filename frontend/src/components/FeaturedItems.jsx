import { useRef } from 'react';
import { BsCartCheck } from 'react-icons/bs';
import { FaProductHunt } from 'react-icons/fa';



const FeaturedItems = ({
  image,
  title,
  description,
  backgroundColor,
  onClick,
}) => {
  const containerRef = useRef(null);
  const handleScroll = (e) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };
  return (
   
    <div className='flex justify-center items-center'>
      <div
        className='bg-white w-full max-h-[10rem] rounded shadow-md flex card text-grey-darkest'
        style={{ background: backgroundColor }}>
        <img
          className='w-1/2 max-h-[10rem] rounded-l-sm object-cover'
          src={image}
          alt='Room Image'
        />
        <div className='w-full flex flex-col'>
          <div className='p-4 pb-0 flex-1 text-gray-800'>
            <h3 className='font-semibold text-lg mb-1'>{title}</h3>
            <span className='text-xl text-gray-700 font-bold mb-2'>£63.00</span>
            <div className='flex items-center mt-4 mb-2'>
              <div className='px-2 text-sm'>
                <BsCartCheck className='text-gray-700' size={20} />
              </div>
              <span className='text-sm font-semibold'>Buy Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div class='flex flex-col justify-center '>
    //   <div class='relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white'>
    //     <div class='w-full md:w-1/3 bg-white grid place-items-center'>
    //       <img
    //         src='https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    //         alt='tailwind logo'
    //         class='rounded-xl'
    //       />
    //     </div>
    //     <div class='w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3'>
    //       <div class='flex justify-between item-center'>
    //         <p class='text-gray-500 font-medium hidden md:block'>Vacations</p>
    //         <div class='flex items-center'>
    //           <svg
    //             xmlns='http://www.w3.org/2000/svg'
    //             class='h-5 w-5 text-yellow-500'
    //             viewBox='0 0 20 20'
    //             fill='currentColor'>
    //             <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
    //           </svg>
    //           <p class='text-gray-600 font-bold text-sm ml-1'>
    //             4.96
    //             <span class='text-gray-500 font-normal'>(76 reviews)</span>
    //           </p>
    //         </div>
    //         <div class=''>
    //           <svg
    //             xmlns='http://www.w3.org/2000/svg'
    //             class='h-5 w-5 text-pink-500'
    //             viewBox='0 0 20 20'
    //             fill='currentColor'>
    //             <path
    //               fill-rule='evenodd'
    //               d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
    //               clip-rule='evenodd'
    //             />
    //           </svg>
    //         </div>
    //         <div class='bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block'>
    //           Superhost
    //         </div>
    //       </div>
    //       <h3 class='font-black text-gray-800 md:text-3xl text-xl'>
    //         The Majestic and Wonderful Bahamas
    //       </h3>
    //       <p class='md:text-lg text-gray-500 text-base'>
    //         The best kept secret of The Bahamas is the country’s sheer size and
    //         diversity. With 16 major islands, The Bahamas is an unmatched
    //         destination
    //       </p>
    //       <p class='text-xl font-black text-gray-800'>
    //         $110
    //         <span class='font-normal text-gray-600 text-base'>/night</span>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    // <div className='w-72 h-36 border border-gray-300 rounded-md overflow-hidden cursor-pointer shadow-md transform hover:scale-105 transition-transform'>
    //   <img
    //     src={image}
    //     alt={title}
    //     className='w-full h-20 object-cover border-b-2 border-gray-300'
    //   />
    //   <div className='p-2'>
    //     <h3 className='text-md font-semibold mb-1'>{title}</h3>
    //     <p className='text-xs text-gray-600'>{description}</p>
    //   </div>
    // </div>
  );
};

export default FeaturedItems;
