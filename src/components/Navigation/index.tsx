import styled from 'styled-components';

const NavigationWrapper = styled.nav`
  height: 64px;
  padding: 0px 24px;
  background: #262E49;
  color: #fff;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  @media ${({ theme }) => theme.desktop} {
    height: 72px;
    font-size: 32px;
  }
`;

const Navigation = () => {
  return (
    <NavigationWrapper>
      <h1>總統即時開票全台地圖</h1>
    </NavigationWrapper>
  );
};

export default Navigation;
