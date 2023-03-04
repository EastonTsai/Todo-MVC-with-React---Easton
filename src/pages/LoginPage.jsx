import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { login } from 'api/auth';
import Swal from 'sweetalert2'

const LoginPage = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  //登入成功或失敗的彈出視窗樣式
  const loginFinish = {
    position: 'top',
    title: '登入成功！',
    timer: 2500,
    icon: 'success',
    showConfirmButton: true,
  }
  const loginFailed = {
    position: 'top',
    title: '登入失敗！',
    timer: 2000,
    icon: 'error',
    showConfirmButton: false,
  }
  const inputPostFailed = {
    position: 'top',
    title: '請輸入 帳號 , 密碼 ！',
    timer: 2000,
    icon: 'error',
    showConfirmButton: false,
  }

  async function handleClick (){
    if( username.trim() === '' || password.trim() === '' ){
      Swal.fire(inputPostFailed)
      return
    }
    try{
      const data =  await login({ username, password })
      console.log(data)
      if (data.authToken){
        Swal.fire(loginFinish)
        await setTimeout(navigate('/todos'), 2500)
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
