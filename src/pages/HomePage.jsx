import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkPermission } from "api/auth";

const HomePage = () => {
  const navigate = useNavigate()

  useEffect( () => {
    const checkToken = async () => {
      try{
        const token = localStorage.getItem('authToken')
        if (token){
          const success = await checkPermission(token)
          if (success){
            navigate('/todos')
            return 
          }
          navigate('/login')
          return 
        }
      }
      catch(error){console.error(error)}
    }
    checkToken()
  }, [])

  return <div>HomePage</div>;
};

export default HomePage;
