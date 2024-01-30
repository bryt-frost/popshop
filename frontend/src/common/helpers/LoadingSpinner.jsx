const LoadingSpinner = ({info}) => (
  <div className='my-[10vh]'>
    <div className='flex justify-center items-center bg-transparent '>
      <div
        style={{ animationDuration: '0.5s' }}
        className='animate-spin rounded-full h-10 w-10 border-t-4 border-blue-800  border-solid'></div>
    </div>
    <p className='text-center text-gray-500 pt-3'>Just a second</p>
    <p className='text-center text-gray-400 m-0 p-0'>{info}</p>
  </div>
);
export default LoadingSpinner;
