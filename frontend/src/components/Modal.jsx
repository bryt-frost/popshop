import { useDispatch } from 'react-redux';
import { closeModal } from '../features/modal/modalSlice';
import { clearCart } from '../features/cart/cartSlice';


const Modal = () => {
  const dispatch = useDispatch();

  return (
    <aside className='modal-container' onClick={()=>dispatch(closeModal())}>
      <div className='modal'>
        <h4>Remove all items from your shopping cart?</h4>
        <div className='btn-container'>
          <button onClick={()=> {
            dispatch(clearCart())
            dispatch(closeModal())
          }}
            className='mt-[1rem] text-black hover:scale-105 shadow-2xl duration-300  bg-yellow-400'
            type='button'>
            Confirm
          </button>
          <button onClick={() => dispatch(closeModal())}
            className='mt-[1rem] outline outline-1 outline-offset-0 hover:scale-105  duration-300'
            type='button'>
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
