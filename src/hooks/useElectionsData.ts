/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import axios from 'axios';
import { uniq } from 'lodash';
import partyColors from 'src/assets/data/party_colors.json';
import areaThemes from 'src/assets/data/area_themes.json';
import cities from 'src/assets/data/cities.json';

const defaultCity = cities['00_000_00_000_0000'][0];

const getCandidatePairs = (nationTickets: any = []) => {
  const candidateNoList = uniq(nationTickets.map((item: any) => item.cand_no)) as number[];
  return candidateNoList.map((candidateNo: number) => {
    const president = nationTickets.find((item: any) => item.cand_no === candidateNo && item.is_vice !== 'Y');
    const vicePresident = nationTickets.find((item: any) => item.cand_no === candidateNo && item.is_vice === 'Y');
    return {
      candidateNo,
      presidentName: president.cand_name,
      vicePresidentName: vicePresident.cand_name,
      partyName: president.party_name,
      partyCode: president.party_code,
      partyColor: (partyColors as any)?.find((item: any) => item.party_code.toString() === president.party_code.toString()).color_code,
      ticketNum: president.ticket_num,
      ticketPercent: president.ticket_percent,
    };
  });
};

export const useElectionData = () => {
  const [selectedThemeId, setSelectedThemeId] = React.useState(areaThemes[0].theme_items[0].theme_id);
  const [selectedCityId, setSelectedCityId] = React.useState<string>(`${defaultCity.prv_code}_${defaultCity.city_code}_${defaultCity.area_code}_${defaultCity.dept_code}_${defaultCity.li_code}`);
  const [selectedAreaId, setSelectedAreaId] = React.useState<string>('');
  const [selectedDeptId, setSelectedDeptId] = React.useState<string>('');
  const [nationTickets, setNationTickets] = React.useState([]);
  const [cityTickets, setCityTickets] = React.useState<any>([]);
  const [areas, setAreas] = React.useState([]);
  const [depts, setDepts] = React.useState<any>([]);
  const themeItems = areaThemes[0].theme_items;
  const candidatePairs = getCandidatePairs(nationTickets);

  React.useEffect(() => {
    // 年度，全國
    axios.get(`https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${selectedThemeId}/N/00_000_00_000_0000.json`)
    .then(res =>{
      setNationTickets(res.data['00_000_00_000_0000']);
    }).catch(err => {
      console.log(err);
    });

    axios.get(`https://db.cec.gov.tw/static/elections/data/tickets/ELC/P0/00/${selectedThemeId}/C/00_000_00_000_0000.json`)
    .then(res =>{
      setCityTickets(res.data['00_000_00_000_0000']);
    }).catch(err => {
      console.log(err);
    });
  }, [selectedThemeId]);

  React.useEffect(() => {
    // 區、鄉、鎮
    axios.get(`https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${selectedThemeId}/D/${selectedCityId}.json`)
    .then(res =>{
      const updatedAreas = res.data[selectedCityId];
      const defaultArea = updatedAreas?.[0];
      setAreas(updatedAreas);
      setSelectedAreaId(`${defaultArea.prv_code}_${defaultArea.city_code}_${defaultArea.area_code}_${defaultArea.dept_code}_${defaultArea.li_code}`);
    }).catch(err => {
      console.log(err);
    });
  }, [selectedThemeId, selectedCityId]);

  React.useEffect(() => {
    // 里、村
    axios.get(`https://db.cec.gov.tw/static/elections/data/areas/ELC/P0/00/${selectedThemeId}/L/${selectedCityId}.json`)
    .then(res =>{
      const updatedDept = res.data[selectedAreaId];
      const defaultDept = updatedDept?.[0];
      setDepts(updatedDept);
      setSelectedDeptId(`${defaultDept?.prv_code}_${defaultDept?.city_code}_${defaultDept?.area_code}_${defaultDept?.dept_code}_${defaultDept?.li_code}`);
    }).catch(err => {
      console.log(err);
    });
  }, [selectedThemeId, selectedCityId, selectedAreaId]);

  return {
    partyColors,
    themeItems,
    cities: cities['00_000_00_000_0000'],
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
    nationTickets,
    cityTickets,
    candidatePairs,
  };
};
