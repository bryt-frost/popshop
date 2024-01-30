import { useSelector } from 'react-redux';
import {
  getProductSearchList,
  setSelectedSortOption,
} from '../features/product/productSearchSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const SortSection = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedSortOption = useSelector(
    (state) => state.productSearch.selectedSortOption,
  );
  const searchQuery = new URLSearchParams(location.search).get('q');
  const handleSortChange = (selectedSortOption) => {
    dispatch(setSelectedSortOption(selectedSortOption));
    console.log(selectedSortOption);
    var  currentPage = 1
    const params = { searchQuery, currentPage };
    dispatch(getProductSearchList(params));
  };

  return (
    <div className='flex items-center justify-between p-2 mt-4  rounded-md border border-gray-800 border-spacing-1 shadow-sm'>
      {/* Sorting Section */}
      <div className='flex justify-between items-center p-3 rounded-md'>
        <select
          className='px-4 py-2 w-full border rounded-md bg-white text-gray-800 focus:outline-none focus:border-gray-500'
          value={selectedSortOption}
          onChange={(e) => handleSortChange(e.target.value)}>
          <option className='hover:bg-gray-100' value=''>
            Select filter
          </option>
          <option className='hover:bg-gray-100' value='views'>
            Popularity
          </option>
          <option className='hover:bg-gray-100' value='-created'>
            New In
          </option>
          <option className='hover:bg-gray-100' value='-average_rating'>
            Best Rating
          </option>
          <option className='hover:bg-gray-100' value='price'>
            Lowest Price
          </option>
          <option className='hover:bg-gray-100' value='-price'>
            Highest Price
          </option>
        </select>
      </div>

      <button className='bg-amber-500 text-white'>Filters</button>
    </div>
  );
};

export default SortSection;
