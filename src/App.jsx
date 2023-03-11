import './App.scss';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { useState } from 'react'
import { checkPermission } from 'api/auth';

const basename = process.env.PUBLIC_URL

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkToken = async () => {
    try{
      const token = localStorage.getItem('authToken')
      if (token){
        const success = await checkPermission(token)
        if (success){
          return setIsAuthenticated(true)
        }
        return setIsAuthenticated(false)
      }
      return setIsAuthenticated(false)
    }
    catch(error){console.error(error)}
  }

  return (
    <div className="app">
      <BrowserRouter basename ={basename}>
        <AuthContext.Provider value={{
          isAuthenticated: isAuthenticated,
          setIsAuthenticated: setIsAuthenticated,
          checkToken: checkToken 
        }}>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="todos" element={<TodoPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
