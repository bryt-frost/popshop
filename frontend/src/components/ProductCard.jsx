import { FaCartArrowDown } from "react-icons/fa";
import TruncatedText from "../common/helpers/TruncatedText";
import { Link } from "react-router-dom";
import StarRating from "../common/helpers/StarRating";
import Add_Remove from "../common/helpers/add_remove";

const ProductCard = ({ item, cartItem, addToCart }) => {
  const isProductInCart = !!cartItem;

  return (


    <div className='hover:shadow-lg bg-white p-4 shadow-md rounded-md transition-transform transform hover:scale-105'>
      <Link to={`products/${item.product_id}`}>
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

        <StarRating value={item.average_rating} color='text-yellow-500' />
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
          onClick={() => addToCart(item)}
          className='bg-amber-400 text-white shadow-sm w-full mt-4 rounded-full hover:bg-amber-500 active:bg-amber-600 transition duration-150 active:shadow-xl hover:outline-1 outline outline-offset-2'>
          Add to Cart
        </button>
      )}
    </div>
  );
};
export default ProductCard;