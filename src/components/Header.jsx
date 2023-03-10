import styled from 'styled-components';
import * as jwt from 'jsonwebtoken';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: var(--major);
  padding: 0 16px;

  h3 {
    font-weight: 400;
    user-select: none;
  }
`;

const StyledGreetingText = styled.div`
  color: var(--gray);
  span {
    color: var(--major);
  }
`;

const Header = () => {

  const token = localStorage.getItem('authToken')
  const userName = jwt.decode(token)
  return (
    <StyledHeader>
      <h3>Tasks</h3>
      <StyledGreetingText>
        Hi <span>{userName.name}</span>
      </StyledGreetingText>
    </StyledHeader>
  );
};

export default Header;
