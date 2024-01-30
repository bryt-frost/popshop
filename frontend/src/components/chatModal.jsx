// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { closeModal } from '../features/modal/chatModalSlice';
// import { useDispatch } from 'react-redux';

// const ChatModal = () => {
//   const { isOpen } = useSelector((state) => state.chatModal);
//   const dispatch = useDispatch();
//   const [message, setMessage] = useState('');
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Message sent:', message);
//     setMessage('');
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full h-full flex  justify-center bg-black bg-opacity-50 ${
//         isOpen ? '' : 'hidden'
//       }`}>
//       <div className='bg-white w-full max-w-md p-4  rounded-lg overflow-hidden '>
//         <div className='flex justify-between items-center mb-4'>
//           <h2 className='text-lg font-bold'>Chat Room</h2>
//           <button
//             onClick={() => dispatch(closeModal())}
//             className='text-gray-500 hover:text-gray-700'>
//             Close
//           </button>
//         </div>
//         <div className='flex-1 overflow-y-auto py-[50%]'>

//         </div>
//         <form onSubmit={handleSubmit} className='mt-4'>
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder='Type your message...'
//             className='w-full p-2 border border-gray-300 rounded-md'
//           />
//           <button
//             type='submit'
//             className='mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700'>
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatModal;

// Import useState, useEffect from 'react'
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeModal } from '../features/modal/chatModalSlice';
import { BsSend, BsSendFill, BsSendXFill } from 'react-icons/bs';
import { FaArrowUp } from 'react-icons/fa';

const ChatModal = () => {
  const { isOpen } = useSelector((state) => state.chatModal);
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);


  const handleWebSocket = () => {
    // Initialize WebSocket connection
    const socket = new WebSocket('ws://yourdomain.com/ws/chat/');

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChatMessages([...chatMessages, { text: data.message, sender: 'ai' }]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message sent:', message);

    // Add the new message to the chatMessages array
    setChatMessages([...chatMessages, { text: message, sender: 'User' }]);
    setMessage('');
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     setChatMessages([
  //       {
  //         text: 'Hello, my name is Zuby. How can I help you today?',
  //         sender: 'ai',
  //       },
  //       { text: 'Hi! How are you?', sender: 'User' },
  //       { text: "I'm doing well, thank you!", sender: 'ai' },
  //       {
  //         text: "Is there anything specific you're looking for?",
  //         sender: 'ai',
  //       },

  //       // ...more messages
  //     ]);
  //   }
  // }, [isOpen]);
    useEffect(() => {
      if (isOpen) {
        // Fetch initial messages from the AI
        handleWebSocket();
      }
    }, [isOpen]);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down, and show/hide the button accordingly
      if (chatContainerRef.current) {
        setShowScrollToTop(chatContainerRef.current.scrollTop > 100);
      }
    };

    // Attach the scroll event listener
    chatContainerRef.current.addEventListener('scroll', handleScroll);

    // Cleanup: Remove the event listener when the component is unmounted
  }, []);

  const handleScrollToTop = () => {
    // Scroll to the top when the button is clicked
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  };
  return (
    <div
      className={`fixed bottom-[0] left-0 w-full z-20  h-[100vh] flex items-end justify-center bg-black bg-opacity-50 ${
        isOpen ? '' : 'hidden'
      }`}>
      <div className=' bg-white w-full max-w-2xl p-6 rounded-lg overflow-hidden shadow-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-800'>Zuby</h2>
          <button
            onClick={() => dispatch(closeModal())}
            className='text-gray-500 hover:text-gray-700 focus:outline-none'>
            Close
          </button>
        </div>
        <div
          ref={chatContainerRef}
          className='flex-1 h-80 pb-1 overflow-y-auto bg-gray-100 p-4 rounded-md scroll-smooth'>
          {/* Display chat messages here */}

          {chatMessages.map((chatMessage, index) => (
            <div
            key={index}
              className={`mb-4 ${
                chatMessage.sender === 'User'
                  ? 'flex justify-end'
                  : 'flex justify-start'
              }`}>
              <div
                className={`${
                  chatMessage.sender === 'User'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                } p-3 rounded-[10px] max-w-[70%] shadow-md`}>
                {chatMessage.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className='mt-4 flex'>
          {/* <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type your message...'
            className='w-full p-3  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          />
          <button
            type='submit'
            className=' bg-blue-500 text-white p-3   hover:bg-blue-700 focus:outline-none'>
            <BsSendFill />
          </button> */}
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type your message...'
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white p-3 ml-2 rounded-md focus:outline-none hover:bg-blue-700'>
            <BsSendFill />
          </button>
        </form>
      </div>
      {showScrollToTop && (
        // <button
        //   onClick={handleScrollToTop}
        //   className='fixed bottom-24 text-center  bg-blue-500/50 text-white p-2 rounded-full focus:outline-none hover:bg-blue-700/50'>
        //   <FaArrowUp />
        // </button>
        <button
          onClick={handleScrollToTop}
          className='fixed bottom-24  text-center bg-blue-500 text-white p-2 rounded-full focus:outline-none hover:bg-blue-700'>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ChatModal;
