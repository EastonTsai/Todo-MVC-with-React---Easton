import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { signUp } from 'api/auth';
import Swal from "sweetalert2"
import { AuthContext } from 'context/AuthContext';
const SignUpPage = () => {
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()
  const { isAuthenticated, checkToken } = useContext(AuthContext)

  const signUpFininsh = {
    position: 'top',
    title: '註冊成功！',
    text: '請輸入帳號完成登入',
    icon: 'success',
    showConfirmButton: true,
  }
  const signUpFailed = {
    position: 'top',
    title: '註冊失敗！',
    text: '此帳號已被註冊',
    icon: 'info',
    showConfirmButton: true,
  }

  useEffect( () => {
    checkToken()
    if(isAuthenticated){
      navigate('/todos')
    }
  }, [isAuthenticated])

  async function handleClick (){
    try{
      const singup = await signUp({username, email, password})
      if ( singup.success ){
        Swal.fire(signUpFininsh)
        navigate('/login')
        return
      }
      Swal.fire(signUpFailed)
      setUsername('')
      setEmail('')
      setPassword('')
      return
    }
    catch(error){ console.error(error) }
  }

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput 
          label='帳號'
          type='text'
          placeholder='請輸入帳號'
          value={username}
          onChange={setUsername}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput 
          label='Email'
          type='email'
          placeholder='請輸入帳 Email'
          value={email}
          onChange={setEmail}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput 
          label='密碼'
          type='password'
          placeholder='請輸入密碼'
          value={password}
          onChange={setPassword}
        />
      </AuthInputContainer>
      <AuthButton
        onClick={handleClick}
      >註冊</AuthButton>
      <Link to='/login'>
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
