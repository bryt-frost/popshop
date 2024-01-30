import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  let { authTokens } = useSelector((state) => state.auth);
  return authTokens ? <Outlet /> : <Navigate to='/login' />;
};
export default PrivateRoutes;

// const PrivateRoutes = ({ children, ...rest }) => {
//   let { authTokens } = useSelector((state)=> state.auth);
//   if (!authTokens) {
//     return <Navigate to={'/login'} {...rest}></Navigate>;
//   }
//   return children;
// };
// export default PrivateRoutes;
