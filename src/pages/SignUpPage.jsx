import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { singup } from 'api/auth';

const SignUpPage = () => {
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  async function handleClick (){
    try{
      const singup = await singup({username, email, password})
      if ( singup.success ){
        navigate('/login')
        return
      }
      return alert('此帳號密碼已被使用 ！')
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
