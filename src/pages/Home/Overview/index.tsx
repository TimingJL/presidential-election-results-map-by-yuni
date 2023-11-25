import * as React from 'react';
import styled from 'styled-components';
import Collpase from 'src/components/Collapse';
import { TTicket, TCandidatePair } from 'src/types';

import VoteCountAndChart from './VoteCountAndChart';
import Nationwide from './Nationwide';

interface IProps {
  electionOverview: TTicket;
  nationCandidatePairs: TCandidatePair[];
}

const Container = styled.div`
  .overview__collapse {
    width: 100%;
    margin-top: 20px;
  }
  @media ${({ theme }) => theme.desktop} {
    .overview__collapse, .collapse__header-title {
      width: 270px;
    }
    .collapse__chevron {
      visibility: hidden;
    }
    .collapse__header-content {
      overflow: visible;
      max-height: fit-content;
    }
  }
`;

const Content = styled.div`
  padding: 20px;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const Overview = (props: IProps) => {
  const { nationCandidatePairs, electionOverview } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Container>
      <Collpase
        open={open}
        title="投票概況"
        onToggle={() => setOpen(!open)}
        className="overview__collapse"
        content={
          <Content>
            <Nationwide electionOverview={electionOverview} />
            <VoteCountAndChart candidatePairs={nationCandidatePairs} />
          </Content>
        }
      />
    </Container>
  );
};

export default Overview;
