export interface TParty {
  party_code: string;
  party_name: string;
  color_code: string;
}

export interface TTheme {
  theme_id: string;
  theme_group: string;
  type_id: string;
  subject_id: string;
  legislator_type_id: string;
  data_level: string;
  session: number;
  theme_name: string;
  vote_date: string;
  legislator_desc: string;
  has_data: boolean;
  prv_code: string;
  city_code: string;
  area_code: string;
  dept_code: string;
  li_code: string;
  vote_result: string;
  data_prof_seq: string[];
  data_tckt_seq: string[];
  ris_prv_code: string;
  ris_city_code: string;
  ris_area_code: string;
  ris_dept_code: string;
  print_order: number;
  area_name: string;
}

export interface TLocation {
  prv_code: string;
  city_code: string;
  area_code: string;
  dept_code: string;
  li_code: string;
  area_name: string;
  ris_prv_code: string;
  ris_city_code: string;
  ris_area_code: string;
  ris_dept_code: string;
}

export interface TTicket extends TLocation {
  tbox_no: string;
  cand_no: number;
  ticket_num: number;
  ticket_percent: number;
  is_victor: string;
  cand_id: number;
  cand_name: string;
  cand_sex: string;
  cand_birthyear: string;
  cand_edu: string;
  party_code: number;
  party_name: string;
  is_current: string;
  is_vice: string;
  valid_ticket: number;
  votable_population: number;
  vote_ticket: number;
  vote_to_elect: number;
  invalid_ticket: number;
}

interface TCityTicketsMap {
  code: string;
  name: string;
  partyName: string;
  partyColor: string;
}

export interface TCandidatePair {
  candidateNo: number;
  areaId: string;
  areaName: string;
  presidentName: string;
  vicePresidentName: string;
  partyName: string;
  partyCode: number;
  partyColor: string;
  ticketNum: number;
  ticketPercent: number;
}
