import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  p {
    font-size: 14px;
    font-weight: 300;
    margin: 2rem 0 1rem;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  outline: 0;

  font-size: 14px;
  font-weight: 300;
  margin: 2rem 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = ({userTodos}) => {
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  //彈出視樣式
  const logup = {
    position: 'top',
    title: '您已經登出',
    icon: 'info',
    showConfirmButton: true,
  }

  function handleClick (){
    Swal.fire(logup)
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <StyledFooter>
      <p>剩餘項目數： {userTodos.length}</p>
      <StyledButton
        onClick={handleClick}
      >登出</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
