import styled from 'styled-components';

const NavigationWrapper = styled.div`
  height: 64px;
  padding: 24px;
  background: #262E49;
  color: #fff;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 16px;
`;

const Navigation = () => {
  return (
    <NavigationWrapper>
      2020 開票地圖
    </NavigationWrapper>
  );
};

export default Navigation;
