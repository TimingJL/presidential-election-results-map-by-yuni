/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import Navigation from 'src/components/Navigation';
import Tabs from 'src/components/Tabs';
import Select from 'src/components/Select';
import rotateIconSrc from 'src/assets/images/rotate-cw.svg';
import Overview from 'src/pages/Home/Overview';
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

const Home = () => {
  const {
    cities,
    areas,
    depts,
    selectedThemeId,
    selectedCityId,
    selectedAreaId,
    selectedDeptId,
    themeItems,
    setSelectedThemeId,
    setSelectedCityId,
    setSelectedAreaId,
    setSelectedDeptId,
  } = useElectionData();
  const tabOptions = themeItems.map((themeItem) => {
    return {
      name: themeItem.theme_name,
      id: themeItem.theme_id,
    };
  });

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
              <Select
                selectedOptionId={selectedAreaId}
                options={areas.map((area: any) => ({ id: `${area.prv_code}_${area.city_code}_${area.area_code}_${area.dept_code}_${area.li_code}`, name: area.area_name }))}
                onChange={setSelectedAreaId}
              />
              <Select
                selectedOptionId={selectedDeptId}
                options={depts.map((dept: any) => ({ id: `${dept.prv_code}_${dept.city_code}_${dept.area_code}_${dept.dept_code}_${dept.li_code}`, name: dept.area_name }))}
                onChange={setSelectedDeptId}
              />
            </Row>
          </SelectsWrapper>
          <button>
            <img src={rotateIconSrc} />
            {/* button */}
          </button>
        </SelectSection>
        <Overview />
      </ContentWrapper>
    </>
  );
};

export default Home;
