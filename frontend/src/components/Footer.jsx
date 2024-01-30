
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { companyName } from '../common/stringConstants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (

    <footer className='bg-gray-800 text-white py-12'>
      <div className='container mx-auto flex flex-wrap justify-between px-4'>
        <div className='w-full md:w-1/3 mb-8 md:mb-0'>
          <h2 className='text-2xl font-bold mb-4'>{companyName}</h2>
          <p className='text-gray-300'>
            Where Every Purchase Unveils Your Story of Style, Inspiration, and
            Discovery!
          </p>
        </div>
        <div className='w-full md:w-1/3 mb-8 md:mb-0'>
          <h2 className='text-2xl font-bold mb-4'>Quick Links</h2>
          <ul className='list-none'>
            <li className='mb-2'>
              <a href='#' className='text-gray-300 hover:text-white'>
                Home
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-300 hover:text-white'>
                Shop
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-300 hover:text-white'>
                About Us
              </a>
            </li>
            <li className='mb-2'>
              <a href='#' className='text-gray-300 hover:text-white'>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className='w-full md:w-1/3 items-center justify-center '>
          <h2 className='text-2xl font-bold mb-4'>Connect With Us</h2>
          <div className='flex space-x-4'>
            <a href='#' className='text-gray-300 hover:text-white'>
              <FaFacebook size={30} />
            </a>
            <a href='#' className='text-gray-300 hover:text-white'>
              <FaTwitter size={30} />
            </a>
            <a href='#' className='text-gray-300 hover:text-white'>
              <FaInstagram size={30} />
            </a>
            <a href='#' className='text-gray-300 hover:text-white'>
              <FaWhatsapp size={30} />
            </a>
            {/* Add more social media icons as needed */}
          </div>
        </div>
      </div>
      <div className='mt-8 border-t border-gray-600 text-center text-gray-300'>
        <p className='mt-2'>
          &copy; {currentYear} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
