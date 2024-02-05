import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  let { authTokens } = useSelector((state) => state.auth);
  return authTokens ? <Outlet /> : <Navigate to='/login' />;
};
export default PrivateRoutes;


