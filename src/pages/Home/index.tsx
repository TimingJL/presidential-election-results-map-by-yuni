import styled from 'styled-components';
import Navigation from 'src/components/Navigation';
import Tabs from 'src/components/Tabs';
import Select from 'src/components/Select';
import TaiwanMap from 'src/components/TaiwanMap';
import rotateIconSrc from 'src/assets/images/rotate-cw.svg';
import Overview from 'src/pages/Home/Overview';
import { useElectionData } from 'src/hooks/useElectionsData';
import VoteCountInfo from 'src/pages/Home/VoteCountInfo';

const ContentWrapper = styled.div`
  padding: 32px 24px;
  box-sizing: border-box;
  @media ${({ theme }) => theme.desktop} {
    min-height: fit-content;
  }
`;

const Button = styled.button`
  box-sizing: border-box;
  padding: 0;
  margin-left: 8px;
  width: 36px;
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #262E49;
  transition: all 0.2s ease;
  &:hover {
    background-color: #525982;
  }
  &:active {
    background-color: #171C2C;
    transform: scale(0.95);
  }
`;

const SelectSection = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  .select__clear-button-text {
    display: none;
  }
  @media ${({ theme }) => theme.desktop} {
    .select__clear-button {
      width: 88px;
      height: 36px;
    }
    .select__clear-button-text {
      display: block;
    }
  }
`;

const SelectsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media ${({ theme }) => theme.desktop} {
    flex-direction: row;
    width: fit-content;
    .select__city,
    .select__area,
    .select__dept {
      width: 156px;
    }
    .select__area-and-dept {
      width: fit-content;
    }
    .select__clear-button {
      width: 88px;
      height: 36px;
    }
  }
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  & > * {
    width: 100%;
  }
`;

const Content = styled.div`
  @media ${({ theme }) => theme.desktop} {
    display: flex;
    justify-content: space-between;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  @media ${({ theme }) => theme.desktop} {
    svg {
      height: 100%;
      width: auto;
    }
  }
`;

const VoteCountInfoContainer = styled.div`
  margin-top: 20px;
`;

const Home = () => {
  const {
    electionOverview = {},
    cities = [],
    areas = [],
    depts = [],
    selectedThemeId,
    selectedCityId,
    selectedAreaId,
    selectedDeptId,
    themeItems = [],
    nationCandidatePairs = [],
    cityCandidatePairs = [],
    areaCandidatePairs = [],
    deptCandidatePairs = [],
    setSelectedThemeId,
    setSelectedCityId,
    setSelectedAreaId,
    setSelectedDeptId,
    cityTicketsMap = [],
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
              className="select__city"
              selectedOptionId={selectedCityId}
              options={cities.map((city) => ({ id: `${city.prv_code}_${city.city_code}_${city.area_code}_${city.dept_code}_${city.li_code}`, name: city.area_name }))}
              onChange={setSelectedCityId}
            />
            <Row className="select__area-and-dept">
              <Select
                className="select__area"
                disabled={!selectedCityId}
                selectedOptionId={selectedAreaId}
                options={areas.map((area) => ({ id: `${area.prv_code}_${area.city_code}_${area.area_code}_${area.dept_code}_${area.li_code}`, name: area.area_name }))}
                onChange={setSelectedAreaId}
              />
              <Select
                className="select__dept"
                disabled={!selectedAreaId || !selectedCityId}
                selectedOptionId={selectedDeptId}
                options={depts.map((dept) => ({ id: `${dept.prv_code}_${dept.city_code}_${dept.area_code}_${dept.dept_code}_${dept.li_code}`, name: dept.area_name }))}
                onChange={setSelectedDeptId}
              />
            </Row>
          </SelectsWrapper>
          <Button
            className="select__clear-button"
            onClick={() => {
              setSelectedCityId('');
              setSelectedAreaId('');
              setSelectedDeptId('');
            }}
          >
            <span className="select__clear-button-text">清除</span>
            <img src={rotateIconSrc} />
          </Button>
        </SelectSection>
        <Content>
          <Overview
            electionOverview={electionOverview}
            nationCandidatePairs={nationCandidatePairs}
          />
          <MapContainer>
            <TaiwanMap
              cityTicketsMap={cityTicketsMap}
              onClickCity={(cityId: string) => setSelectedCityId(cityId)}
            />
          </MapContainer>
          <VoteCountInfoContainer>
            <VoteCountInfo
              selectedCityId={selectedCityId}
              selectedAreaId={selectedAreaId}
              selectedDeptId={selectedDeptId}
              cityCandidatePairs={cityCandidatePairs}
              areaCandidatePairs={areaCandidatePairs}
              deptCandidatePairs={deptCandidatePairs}
            />
          </VoteCountInfoContainer>
        </Content>
      </ContentWrapper>
    </>
  );
};

export default Home;
