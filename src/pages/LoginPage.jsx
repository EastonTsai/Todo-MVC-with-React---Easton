import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { checkPermission, login } from 'api/auth';
import Swal from 'sweetalert2'

const LoginPage = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  //登入成功或失敗的彈出視窗樣式
  const loginFinish = {
    position: 'top',
    title: '登入成功！',
    text: '進入 Todos 頁面',
    timer: 2500,
    icon: 'success',
    showConfirmButton: true,
  }
  const loginFailed = {
    position: 'top',
    title: '登入失敗！',
    text: '帳號密碼錯誤',
    icon: 'error',
    showConfirmButton: true,
  }
  const inputPostFailed = {
    position: 'top',
    title: '請輸入 帳號 , 密碼 ！',
    timer: 2000,
    icon: 'error',
    showConfirmButton: false,
  }

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
        }
      }
      catch(error){console.error(error)}
    }
    checkToken()
  }, [])
  async function handleClick (){
    if( username.trim() === '' || password.trim() === '' ){
      Swal.fire(inputPostFailed)
      return
    }
    try{
      const data =  await login({ username, password })
      if (data.authToken){
        localStorage.setItem('authToken', data.authToken)
        Swal.fire(loginFinish)
        navigate('/todos')
        return 

      }
      Swal.fire(loginFailed)
      setPassword('')
      setUsername('')
      return 
    }
    catch(error){
      console.error(error)
    }
  }

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

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
          label='密碼'
          type='password'
          placeholder='請輸入密碼'
          value={password}
          onChange={setPassword}
        />
      </AuthInputContainer>
      <AuthButton
        onClick={handleClick}
      >登入</AuthButton>
      <Link to='/signup'>
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
