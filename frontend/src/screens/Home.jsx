import ProductListing from '../components/ProductListing';
import Categories from '../components/categories';
import {  useSelector } from 'react-redux';

import Footer from '../components/Footer';

import ProductAdsSection from '../components/ProductAdsSection';
import Chat from '../components/Chat';


const Home = () => {


  const { isOpen } = useSelector((state) => state.chatModal);

  return (
    <div className=''>
      <div
        className={`w-full md:px-4 px-2 ${
          !isOpen ? '' : 'fixed h-screen bottom-0'
        }`}>
        <ProductAdsSection />
        <ProductListing />
        <Categories />
      </div>
      <Footer />
      <Chat />
    </div>
  );
};
export default Home;
