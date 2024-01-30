import { useSelector } from 'react-redux';
import FeaturedItems from './FeaturedItems';
import Slider from 'react-slick';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductAdsSection = () => {


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const gradient1 = 'linear-gradient(135deg, #262B40 0%, #536976 100%)';
  const gradient2 = 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)';
  // const gradient3 = 'linear-gradient(135deg, #6A0572 0%, #AB83A1 100%)';
  const gradient3 = 'linear-gradient(to right, #00c6ff, #0072ff)';
  // const gradient3 = 'linear-gradient(to right, #f46b45, #eea849)';

  const backgroundColors = [gradient1, gradient2, gradient3, gradient1];
  const { productItems } = useSelector((state) => state.productList);
  return (
    <div className=''>
      <Slider {...sliderSettings}>
        {productItems.map((product) => (
          <Link
            to={`/products/${product.product_id}`}
            key={product.id}
            className='bg-gray-100 p-4'>
            <FeaturedItems
              title={product.title}
              description={product.description}
              image={product.image?.[0]?.image ?? <FaCartArrowDown />}
              backgroundColor={
                backgroundColors[product.id % backgroundColors.length]
              }
            />
          </Link>
        ))}
      </Slider>
      <div className='bg-gray-500/50 py-2  mt-2 rounded-full'>
        <p className='text-center'>Call 0245418403 to order by phone</p>
      </div>
    </div>
  );
};
export default ProductAdsSection;
