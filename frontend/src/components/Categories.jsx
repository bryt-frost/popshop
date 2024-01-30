import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryItems } from '../features/category/categorySlice';
import { Link } from 'react-router-dom';

const Categories = () => {
  const dispatch = useDispatch();
  const { categoryItems } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategoryItems(''));
  }, []);

  return (
    // <div className='px-4 py-6 cursor-pointer'>
    //   <h1 className='text-gray-800 text-2xl font-semibold mb-4'>
    //     Browse By Category
    //   </h1>
    //   <hr className='my-2 border-t border-gray-300' />

    //   <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-4'>
    //     {categoryItems.map((item) => (
    //       <Link to={`/categories/${item.id}`}
    //         className='bg-white rounded-lg p-4 shadow-md transform transition-transform hover:scale-105 duration-300'
    //         key={item.id}>
    //         <div className='flex justify-between items-center'>
    //           <h2 className='text-md sm:text-sm'>{item.name}</h2>

    //           <div className='object-cover'>
    //             <img
    //               className='w-10 h-10 object-cover rounded-full'
    //               src={item.icon}
    //               alt={item.name}
    //             />
    //           </div>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
    <div className='px-4 py-6 cursor-pointer'>
      <h1 className='text-gray-800 text-2xl font-semibold mb-4'>
        Browse By Category
      </h1>
      <hr className='my-2 border-t border-gray-300' />

      <div className='grid grid-cols-2 text-center sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4'>
        {categoryItems.map((item) => (
          <Link
            to={`/categories/${item.id}`}
            className='bg-white rounded-lg p-4 shadow-md transform transition-transform hover:scale-105 duration-300'
            key={item.id}>
            <div className='flex flex-col items-center'>
              <div className='object-cover mb-2'>
                <img
                  className='w-16 h-16 object-cover rounded-full'
                  src={item.icon}
                  alt={item.name}
                />
              </div>
              <h2 className='text-md sm:text-sm'>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Categories;
