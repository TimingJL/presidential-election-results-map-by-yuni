/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { PieChart, Pie, Cell } from 'recharts';

interface IProps {
  candidatePairs: any[];
}

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CandidateRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CandidateNoCircle = styled.div<{
  $color: string;
}>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  font-size: 12px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoldText = styled.div`
  font-weight: 600;
  color: #000;
`;

const PoliticalParty = (props: IProps) => {
  const { candidatePairs } = props;
  const colors = candidatePairs.map((item) => `#${item.partyColor}`);
  const data = candidatePairs.map((item) => {
    return {
      name: item.partyName,
      value: item.ticketPercent,
    };
  });
  return (
    <Flex
      style={{
        alignItems: 'center',
      }}
    >
      <PieChart width={72} height={72}>
        <Pie
          data={data}
          cx={31}
          cy={31}
          startAngle={90}
          endAngle={-270}
          innerRadius={20}
          outerRadius={36}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
      <CandidateRow>
        {candidatePairs.map((item) => {
          return (
            <Row key={item.candidateNo}>
              <Row
                style={{
                  borderRight: `2px solid #${item.partyColor}`,
                }}
              >
                <CandidateNoCircle $color={`#${item.partyColor}`}>
                  <span>{item.candidateNo}</span>
                </CandidateNoCircle>
                <div
                  style={{
                    width: '96px'
                  }}
                >
                  <BoldText>{item.partyName}</BoldText>
                  <div>{`${item.presidentName} | ${item.vicePresidentName}`}</div>
                </div>
              </Row>
              <div>
                <BoldText>{item.ticketPercent}%</BoldText>
                <div>{item.ticketNum.toLocaleString()} 票</div>
              </div>
            </Row>
          );
        })}
      </CandidateRow>
    </Flex>
  );
};

export default PoliticalParty;
