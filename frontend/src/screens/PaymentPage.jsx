import React, { useState } from 'react';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = () => {
    // Handle payment logic (e.g., send data to the server for processing)
    console.log('Processing payment...');
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-96'>
        <h1 className='text-2xl font-bold mb-4'>Payment Details</h1>
        <form>
          <div className='mb-4'>
            <label
              htmlFor='cardNumber'
              className='block text-sm font-medium text-gray-600'>
              Card Number
            </label>
            <input
              type='text'
              id='cardNumber'
              className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500'
              placeholder='1234 5678 9012 3456'
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className='mb-4 flex'>
            <div className='w-1/2 mr-2'>
              <label
                htmlFor='expiryDate'
                className='block text-sm font-medium text-gray-600'>
                Expiry Date
              </label>
              <input
                type='text'
                id='expiryDate'
                className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500'
                placeholder='MM/YY'
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div className='w-1/2 ml-2'>
              <label
                htmlFor='cvc'
                className='block text-sm font-medium text-gray-600'>
                CVC
              </label>
              <input
                type='text'
                id='cvc'
                className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500'
                placeholder='123'
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          </div>
          <button
            type='button'
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
            onClick={handlePayment}>
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
