/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { PieChart, Pie, Cell } from 'recharts';
import VoteCount from 'src/components/VoteCount';

interface IProps {
  candidatePairs: any[];
}

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
`;

const VoteCountAndChart = (props: IProps) => {
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
      <VoteCount candidatePairs={candidatePairs} />
    </Flex>
  );
};

export default VoteCountAndChart;
