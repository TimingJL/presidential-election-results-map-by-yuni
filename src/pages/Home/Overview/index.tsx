import * as React from 'react';
import styled from 'styled-components';
import Collpase from 'src/components/Collapse';
import Nationwide from './Nationwide';
import PoliticalParty from './PoliticalParty';

const Container = styled.div`
  padding: 20px;
`;

const Overview = () => {
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
          <PoliticalParty />
        </Container>
      }
    />
  );
};

export default Overview;
