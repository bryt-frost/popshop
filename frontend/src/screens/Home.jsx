import FeaturedItems from '../components/FeaturedItems';
import ProductListing from '../components/ProductListing';
import Categories from '../components/categories';
import {  useSelector } from 'react-redux';

import Footer from '../components/Footer';

import ProductAdsSection from '../components/ProductAdsSection';
import Chat from '../components/Chat';
import { useState } from 'react';
import { PaystackButton } from 'react-paystack';

const Home = () => {
const publicKey = 'pk_test_a7195117e0211a8d30ba80d8516c355d6607a703';
const amount = 1000000; // Remember, set in kobo!
const [email, setEmail] = useState('');
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const currency="GHS"


  const { isOpen } = useSelector((state) => state.chatModal);

  return (
    <>
      <div className={`w-full ${!isOpen ? '' : 'fixed h-screen bottom-0'}`}>
        <ProductAdsSection />
        <ProductListing />
        <Categories />
        <Footer />
      </div>
      <Chat />


    </>
  );
};
export default Home;
