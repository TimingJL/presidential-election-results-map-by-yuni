/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styled from 'styled-components';
import Collpase from 'src/components/Collapse';
import VoteCountAndChart from './VoteCountAndChart';
import Nationwide from './Nationwide';

interface IProps {
  nationCandidatePairs: any[];
}

const Container = styled.div`
  padding: 20px;
  & > *:not(:first-child) {
    margin-top: 20px;
  }
`;

const Overview = (props: IProps) => {
  const { nationCandidatePairs } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Collpase
      open={open}
      title="投票概況"
      onToggle={() => setOpen(!open)}
      style={{ marginTop: '20px', width: '100%' }}
      content={
        <Container>
          <Nationwide />
          <VoteCountAndChart candidatePairs={nationCandidatePairs} />
        </Container>
      }
    />
  );
};

export default Overview;
