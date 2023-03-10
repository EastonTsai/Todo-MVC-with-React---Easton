import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, checkToken } = useContext(AuthContext)
  
  useEffect( ()=> {
    checkToken()
    if( !isAuthenticated ){
      navigate('/login')
    }
    else{
      navigate('/todos')
    }
  }, [isAuthenticated])
  


  return <div>HomePage</div>;
};

export default HomePage;
