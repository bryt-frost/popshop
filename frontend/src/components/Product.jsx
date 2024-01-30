import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProductDetail,
  removeProductDetail,
} from '../features/product/productDetailSlice';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarRating from '../common/helpers/StarRating';
import { addToCart } from '../features/cart/cartSlice';

const Product = ({ product }) => {
  const { product_id } = useParams();
  const dispatch = useDispatch();

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const settings1 = {
    asNavFor: nav2,
    ref: (slider) => (slider1.current = slider),
  };

  const settings2 = {
    asNavFor: nav1,
    ref: (slider) => (slider2.current = slider),
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: false,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(getProductDetail(product_id));

    return () => {
      dispatch(removeProductDetail());
    };
  }, []);

  return (
    <>
      <div className='flex flex-col md:flex-row gap-8 p-6 bg-white rounded-md shadow-lg'>
        <div className='w-full md:w-1/3 mx-auto'>
          <Slider {...settings1} className='border-b-2 mb-4'>
            {product.image?.map((image) => (
              <div key={image.id}>
                <img
                  className='w-60 h-60 object-cover rounded-md mx-auto'
                  src={image.image}
                  alt={`Product Image`}
                />
              </div>
            ))}
          </Slider>
          <Slider {...settings2} className='mt-2'>
            {product.image?.map((image) => (
              <div key={image.id}>
                <img
                  className='w-16 h-16 object-cover rounded-md mx-auto'
                  src={image.image}
                  alt={`Thumbnail Image`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className='w-full md:w-2/3 flex flex-col'>
          <div className='flex-grow'>
            <h2 className='text-2xl font-semibold mb-4'>{product.title}</h2>
            <p className='text-gray-700 mb-4'>{product.description}</p>
            <p className='text-orange-500 font-bold text-2xl '>
              GHC {product.price || 'N/A'}
            </p>
          </div>

          <div className='mt-4'>
            <div>
              <h3 className='text-xl  font-semibold tracking-wider'>Ratings</h3>
            </div>
            <ul className=''>
              <li className='border-b-2 py-2'>
                <StarRating
                  value={product.average_rating}
                  color='text-yellow-500'
                />
              </li>
              <li className='border-b-2 py-1.5'>
                <span className='font-semibold text-gray-700'>AVG RATING:</span>
                <span className='ml-2 text-lg'>{product.average_rating}</span>
              </li>
              <li className='py-1.5'>
                <span className='font-semibold text-gray-700'>QTY LEFT:</span>
                <span className='ml-2 text-lg'>{product.in_stock}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
