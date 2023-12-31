import * as React from 'react';
import axios from 'axios';
import { uniq, orderBy } from 'lodash';
import partyColors from 'src/assets/data/party_colors.json';
import areaThemes from 'src/assets/data/area_themes.json';
import { TParty, TLocation, TTicket, TCandidatePair } from 'src/types';

const baseURL = 'https://db.cec.gov.tw/static/elections/data';

const getLocationCode = (item?: TLocation) => {
  return `${item?.prv_code}_${item?.city_code}_${item?.area_code}_${item?.dept_code}_${item?.li_code}`;
};

const getCandidatePairs = (nationTickets: TTicket[] = []): TCandidatePair[] => {
  const candidateNoList = uniq(nationTickets.map((item) => item.cand_no));
  return candidateNoList.map((candidateNo) => {
    const president = nationTickets.find((item) => item.cand_no === candidateNo && item.is_vice !== 'Y');
    const vicePresident = nationTickets.find((item) => item.cand_no === candidateNo && item.is_vice === 'Y');
    return {
      candidateNo,
      areaId: getLocationCode(president) || '',
      areaName: president?.area_name || '',
      presidentName: president?.cand_name || '',
      vicePresidentName: vicePresident?.cand_name || '',
      partyName: president?.party_name || '',
      partyCode: president?.party_code || 0,
      partyColor: (partyColors as TParty[])?.find((item) => item.party_name === president?.party_name)?.color_code || 'b3b3b3',
      ticketNum: president?.ticket_num || 0,
      ticketPercent: president?.ticket_percent || 0,
    };
  });
};

const getCityTicketsMap = (cities: TLocation[] = [], cityTickets: TTicket[] = []) => {
  const cityTicketsMap = cities.map((city) => {
    const code = getLocationCode(city);
    const name = city.area_name;
    const tickets = cityTickets.filter((item) => item.area_name === name);
    const winnerParty = orderBy(tickets, ['ticket_num'], ['desc'])[0];
    const partyColor = partyColors?.find((item) => item.party_name === winnerParty?.party_name)?.color_code || 'b3b3b3';
    return {
      code,
      name,
      partyName: winnerParty?.party_name,
      partyColor,
    }
  });
  return cityTicketsMap;
};

export const useElectionData = () => {
  const [selectedThemeId, setSelectedThemeId] = React.useState(areaThemes[0].theme_items[0].theme_id);
  const [cities, setCities] = React.useState<TLocation[]>([]);
  const [selectedCityId, setSelectedCityId] = React.useState<string>('');
  const [selectedAreaId, setSelectedAreaId] = React.useState<string>('');
  const [selectedDeptId, setSelectedDeptId] = React.useState<string>('');
  const [areas, setAreas] = React.useState<TLocation[]>([]);
  const [depts, setDepts] = React.useState<TLocation[]>([]);
  const [electionOverview, setElectionOverview] = React.useState<TTicket>({} as TTicket);
  const [nationTickets, setNationTickets] = React.useState<TTicket[]>([]);
  const [cityTickets, setCityTickets] = React.useState<TTicket[]>([]);
  const [areaTickets, setAreaTickets] = React.useState<TTicket[]>([]);
  const [deptTickets, setDeptTickets] = React.useState<TTicket[]>([]);
  const themeItems = areaThemes[0].theme_items;
  const nationCandidatePairs = getCandidatePairs(nationTickets);
  const cityCandidatePairs = getCandidatePairs(cityTickets?.filter((item) => getLocationCode(item) === selectedCityId));
  const areaCandidatePairs = getCandidatePairs(areaTickets?.filter((item) => getLocationCode(item) === selectedAreaId));
  const deptCandidatePairs = getCandidatePairs(deptTickets?.filter((item) => getLocationCode(item) === selectedDeptId));
  const cityTicketsMap = getCityTicketsMap(cities, cityTickets);

  const resetSelectedIds = () => {
    setSelectedCityId('');
    setSelectedAreaId('');
    setSelectedDeptId('');
  };
  
  React.useEffect(() => {
    // 縣市行政區
    axios.get(`${baseURL}/areas/ELC/P0/00/${selectedThemeId}/C/00_000_00_000_0000.json`)
    .then(res =>{
      setCities(res.data['00_000_00_000_0000']);
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });

    // 選舉概況表
    axios.get(`${baseURL}/profiles/ELC/P0/00/${selectedThemeId}/N/00_000_00_000_0000.json`)
    .then(res =>{
      setElectionOverview(res.data['00_000_00_000_0000'][0]);
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });
  }, [selectedThemeId])

  React.useEffect(() => {
    if (!selectedThemeId) return;
    // 年度，全國
    axios.get(`${baseURL}/tickets/ELC/P0/00/${selectedThemeId}/N/00_000_00_000_0000.json`)
    .then(res =>{
      setNationTickets(res.data['00_000_00_000_0000']);
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });

    axios.get(`${baseURL}/tickets/ELC/P0/00/${selectedThemeId}/C/00_000_00_000_0000.json`)
    .then(res =>{
      setCityTickets(res.data['00_000_00_000_0000']);
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });
  }, [selectedThemeId]);

  React.useEffect(() => {
    if (!selectedThemeId || !selectedCityId) return;
    // 區、鄉、鎮
    axios.get(`${baseURL}/areas/ELC/P0/00/${selectedThemeId}/D/${selectedCityId}.json`)
    .then(res =>{
      const updatedAreas = res.data[selectedCityId];
      const defaultArea = updatedAreas?.[0];
      setAreas(updatedAreas);
      setSelectedAreaId(getLocationCode(defaultArea));
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });

    axios.get(`${baseURL}/tickets/ELC/P0/00/${selectedThemeId}/D/${selectedCityId}.json`)
    .then(res =>{
      setAreaTickets(res.data[selectedCityId]);
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });
  }, [selectedThemeId, selectedCityId]);

  React.useEffect(() => {
    if (!selectedThemeId || !selectedCityId) return;
    // 里、村
    axios.get(`${baseURL}/areas/ELC/P0/00/${selectedThemeId}/L/${selectedCityId}.json`)
    .then(res =>{
      const updatedDept = res.data[selectedAreaId];
      const defaultDept = updatedDept?.[0];
      setDepts(updatedDept);
      setSelectedDeptId(getLocationCode(defaultDept));
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });

    axios.get(`${baseURL}/tickets/ELC/P0/00/${selectedThemeId}/L/${selectedCityId}.json`)
    .then(res =>{
      setDeptTickets(res.data[selectedAreaId]);
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });
  }, [selectedThemeId, selectedCityId, selectedAreaId]);

  return {
    partyColors,
    themeItems,
    cities,
    areas,
    depts,
    selectedAreaId,
    selectedThemeId,
    selectedCityId,
    selectedDeptId,
    setSelectedThemeId,
    setSelectedCityId,
    setSelectedAreaId,
    setSelectedDeptId,
    electionOverview,
    nationTickets,
    cityTickets,
    areaTickets,
    deptTickets,
    nationCandidatePairs,
    cityCandidatePairs,
    areaCandidatePairs,
    deptCandidatePairs,
    cityTicketsMap,
  };
};
