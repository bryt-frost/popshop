import { useDispatch } from 'react-redux';
import { openModal } from '../features/modal/chatModalSlice';
import ChatModal from './chatModal';
import { BsFillChatDotsFill } from 'react-icons/bs';

const Chat = () => {
  const dispatch = useDispatch();
  return (
    <div>
      {' '}
      <div
        onClick={() => dispatch(openModal())}
        className='fixed bottom-24 right-4 flex justify-center items-center rounded-full shadow-lg bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300'>
        <div className='hover:text-amber-500 active:border-amber-600'>
          <BsFillChatDotsFill
            className='p-3 bg-transparent text-amber-400'
            size={40}
          />
        </div>
      </div>
      <ChatModal />
    </div>
  );
};
export default Chat;
