import { FaStar, FaStarHalf } from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';

const StarRating = ({ value, color, text}) => {
  return (
    <div className='flex'>
      <span className='mr-0.5'>
        {text}
      </span>
      <span className='mr-0.5'>
        {value >= 1 ? (
          <FaStar className={color} />
        ) : value >= 0.5 ? (
          <FaStarHalf className={color} />
        ) : (
          <BsStar className={color} />
        )}
      </span>{' '}
      <span className='mr-0.5'>
        {value >= 2 ? (
          <FaStar className={color} />
        ) : value >= 1.5 ? (
          <FaStarHalf className={color} />
        ) : (
          <BsStar className={color} />
        )}
      </span>{' '}
      <span className='mr-0.5'>
        {value >= 3 ? (
          <FaStar className={color} />
        ) : value >= 2.5 ? (
          <FaStarHalf className={color} />
        ) : (
          <BsStar className={color} />
        )}
      </span>
      <span className='mr-0.5'>
        {value >= 4 ? (
          <FaStar className={color} />
        ) : value >= 3.5 ? (
          <FaStarHalf className={color} />
        ) : (
          <BsStar className={color} />
        )}
      </span>{' '}
      <span className='mr-0.5'>
        {value >= 5 ? (
          <FaStar className={color} />
        ) : value >= 4.5 ? (
          <FaStarHalf className={color} />
        ) : (
          <BsStar className={color} />
        )}
      </span>
    </div>
  );
};
export default StarRating;
