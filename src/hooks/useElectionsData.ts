/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import axios from 'axios';
import areaThemes from 'src/assets/data/area_themes.json';
import cities from 'src/assets/data/cities.json';

const defaultCity = cities['00_000_00_000_0000'][0];

export const useElectionData = () => {
  const [selectedThemeId, setSelectedThemeId] = React.useState(areaThemes[0].theme_items[0].theme_id);
  const [selectedCityId, setSelectedCityId] = React.useState(`${defaultCity.prv_code}_${defaultCity.city_code}_${defaultCity.area_code}_${defaultCity.dept_code}_${defaultCity.li_code}`);
  const [nationTickets, setNationTickets] = React.useState<any>([]);
  const [cityTickets, setCityTickets] = React.useState<any>([]);
  const themeItems = areaThemes[0].theme_items;
  console.log({cities})
  React.useEffect(() => {
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

  return {
    cities: cities['00_000_00_000_0000'],
    selectedThemeId,
    selectedCityId,
    setSelectedThemeId,
    setSelectedCityId,
    themeItems,
    nationTickets,
    cityTickets,
  };
};
