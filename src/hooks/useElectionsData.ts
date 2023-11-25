/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import axios from 'axios';
import { uniq, orderBy } from 'lodash';
import partyColors from 'src/assets/data/party_colors.json';
import areaThemes from 'src/assets/data/area_themes.json';

const getCandidatePairs = (nationTickets: any = []) => {
  const candidateNoList = uniq(nationTickets.map((item: any) => item.cand_no)) as number[];
  return candidateNoList.map((candidateNo: number) => {
    const president = nationTickets.find((item: any) => item.cand_no === candidateNo && item.is_vice !== 'Y');
    const vicePresident = nationTickets.find((item: any) => item.cand_no === candidateNo && item.is_vice === 'Y');
    return {
      candidateNo,
      areaId: `${president.prv_code}_${president.city_code}_${president.area_code}_${president.dept_code}_${president.li_code}`,
      areaName: president.area_name,
      presidentName: president.cand_name,
      vicePresidentName: vicePresident.cand_name,
      partyName: president.party_name,
      partyCode: president.party_code,
      partyColor: (partyColors as any)?.find((item: any) => item.party_name === president.party_name)?.color_code,
      ticketNum: president.ticket_num,
      ticketPercent: president.ticket_percent,
    };
  });
};

const getCityTicketsMap = (cities: any = [], cityTickets: any = []): {
  code: string;
  name: string;
  partyColor: string;
  partyName: string;
}[] => {
  const cityTicketsMap = cities.map((city: any) => {
    const code = `${city.prv_code}_${city.city_code}_${city.area_code}_${city.dept_code}_${city.li_code}`;
    const name = city.area_name;
    const tickets = cityTickets.filter((item: any) => item.area_name === name);
    const winnerParty = orderBy(tickets, ['ticket_num'], ['desc'])[0];
    const partyColor = (partyColors as any)?.find((item: any) => item.party_name === winnerParty?.party_name)?.color_code;
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
  const [cities, setCities] = React.useState<any>([]);
  const [selectedCityId, setSelectedCityId] = React.useState<string>('');
  const [selectedAreaId, setSelectedAreaId] = React.useState<string>('');
  const [selectedDeptId, setSelectedDeptId] = React.useState<string>('');
  const [areas, setAreas] = React.useState([]);
  const [depts, setDepts] = React.useState<any>([]);
  const [electionOverview, setElectionOverview] = React.useState<any>([]);
  const [nationTickets, setNationTickets] = React.useState([]);
  const [cityTickets, setCityTickets] = React.useState<any>([]);
  const [areaTickets, setAreaTickets] = React.useState<any>([]);
  const [deptTickets, setDeptTickets] = React.useState<any>([]);
  const themeItems = areaThemes[0].theme_items;
  const nationCandidatePairs = getCandidatePairs(nationTickets);
  const cityCandidatePairs = getCandidatePairs(cityTickets?.filter((item: any) => `${item.prv_code}_${item.city_code}_${item.area_code}_${item.dept_code}_${item.li_code}` === selectedCityId));
  const areaCandidatePairs = getCandidatePairs(areaTickets?.filter((item: any) => `${item.prv_code}_${item.city_code}_${item.area_code}_${item.dept_code}_${item.li_code}` === selectedAreaId));
  const deptCandidatePairs = getCandidatePairs(deptTickets?.filter((item: any) => `${item.prv_code}_${item.city_code}_${item.area_code}_${item.dept_code}_${item.li_code}` === selectedDeptId));
  const cityTicketsMap = getCityTicketsMap(cities, cityTickets);

  const resetSelectedIds = () => {
    setSelectedCityId('');
    setSelectedAreaId('');
    setSelectedDeptId('');
  };
  
  React.useEffect(() => {
    // 縣市行政區
    axios.get(`https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${selectedThemeId}/C/00_000_00_000_0000.json`)
    .then(res =>{
      setCities(res.data['00_000_00_000_0000']);
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });

    // 選舉概況表
    axios.get(`https://db.cec.gov.tw/static/elections/data/profiles/ELC/P0/00/${selectedThemeId}/N/00_000_00_000_0000.json`)
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
    axios.get(`https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${selectedThemeId}/N/00_000_00_000_0000.json`)
    .then(res =>{
      setNationTickets(res.data['00_000_00_000_0000']);
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });

    axios.get(`https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${selectedThemeId}/C/00_000_00_000_0000.json`)
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
    axios.get(`https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${selectedThemeId}/D/${selectedCityId}.json`)
    .then(res =>{
      const updatedAreas = res.data[selectedCityId];
      const defaultArea = updatedAreas?.[0];
      setAreas(updatedAreas);
      setSelectedAreaId(`${defaultArea.prv_code}_${defaultArea.city_code}_${defaultArea.area_code}_${defaultArea.dept_code}_${defaultArea.li_code}`);
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });

    axios.get(`https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${selectedThemeId}/D/${selectedCityId}.json`)
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
    axios.get(`https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${selectedThemeId}/L/${selectedCityId}.json`)
    .then(res =>{
      const updatedDept = res.data[selectedAreaId];
      const defaultDept = updatedDept?.[0];
      setDepts(updatedDept);
      setSelectedDeptId(`${defaultDept?.prv_code}_${defaultDept?.city_code}_${defaultDept?.area_code}_${defaultDept?.dept_code}_${defaultDept?.li_code}`);
    }).catch(err => {
      console.log(err);
      resetSelectedIds();
    });

    axios.get(`https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${selectedThemeId}/L/${selectedCityId}.json`)
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
