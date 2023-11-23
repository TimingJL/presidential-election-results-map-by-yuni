import styled from 'styled-components';
import Navigation from 'src/components/Navigation';
import Tabs from 'src/components/Tabs';
import Select from 'src/components/Select';
import rotateIconSrc from 'src/assets/images/rotate-cw.svg';

import { useElectionData } from 'src/hooks/useElectionsData';

const ContentWrapper = styled.div`
  padding: 32px 24px;
  background: #F5F5F5;
  min-height: 100vh;
`;

const SelectSection = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  button {
    padding: 0;
    margin-left: 8px;
    width: 36px;
  }
`;

const SelectsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  & > * {
    width: 100%;
  }
`;

// 'https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/C/00_000_00_000_0000.json?_t=1700639034'
// 'https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/1f7d9f4f6bfe06fdaf4db7df2ed4d60c/C/00_000_00_000_0000.json?_t=1700639034'
const Home = () => {
  const {
    cities,
    selectedThemeId,
    selectedCityId,
    themeItems,
    // nationTickets,
    // cityTickets,
    setSelectedThemeId,
    setSelectedCityId,
  } = useElectionData();
  const tabOptions = themeItems.map((themeItem) => {
    return {
      name: themeItem.theme_name,
      id: themeItem.theme_id,
    };
  });
  console.log({themeItems})

  return (
    <>
      <Navigation />
      <ContentWrapper>
        <Tabs
          selectedOptionId={selectedThemeId}
          options={tabOptions}
          onChange={setSelectedThemeId}
        />
        <SelectSection>
          <SelectsWrapper>
            <Select
              selectedOptionId={selectedCityId}
              options={cities.map((city) => ({ id: `${city.prv_code}_${city.city_code}_${city.area_code}_${city.dept_code}_${city.li_code}`, name: city.area_name }))}
              onChange={setSelectedCityId}
            />
            <Row>
              <Select options={cities.map((city) => ({ id: `${city.prv_code}_${city.city_code}_${city.area_code}_${city.dept_code}_${city.li_code}`, name: city.area_name }))}  />
              <Select options={cities.map((city) => ({ id: `${city.prv_code}_${city.city_code}_${city.area_code}_${city.dept_code}_${city.li_code}`, name: city.area_name }))}  />
            </Row>
          </SelectsWrapper>
          <button>
            <img src={rotateIconSrc} />
            {/* button */}
          </button>
        </SelectSection>
      </ContentWrapper>
    </>
  );
};

export default Home;
