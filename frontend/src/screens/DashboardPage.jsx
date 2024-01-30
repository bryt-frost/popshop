import { useEffect } from "react";
import useAxios from "../common/hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardPage = () => {
    const {authTokens} = useSelector((state)=>state.auth)
    const axiosInstance = useAxios(authTokens);

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/products/try');


      } catch (error) {
       console.log("cant fetch");
      }
    };
    useEffect(() => {
        fetchData();
    }, []);
    
  return <div>DashboardPage</div>;
};
export default DashboardPage;
