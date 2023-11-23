import styled from 'styled-components';
import { PieChart, Pie, Cell } from 'recharts';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
`;

const Tickets = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    font-weight: 700;
    margin-left: 8px;
  }
`;

const VotingRate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .voting-rate__percentage {
    font-size: 16px;
    font-weight: 700;
  }
  .voting-rate__label {
    font-size: 12px;
  }
`;

const data = [
  { name: 'Group B', value: 360*0.749 },
  { name: 'Group B', value: 360*(1-0.749) },
];
const COLORS = ['#262E49', '#D9D9D9'];

const Nationwide = () => {
  return (
    <Flex>
      <Row>
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <VotingRate>
          <div className="voting-rate__percentage">74.9%</div>
          <div className="voting-rate__label">投票率</div>
        </VotingRate>
      </Row>
      <Tickets>
        <div>投票數<span>14,464,571票</span></div>
        <div>無效票數<span>163,631 票</span></div>
        <div>有效票數<span>14,300,940 票</span></div>
      </Tickets>
    </Flex>
  );
};

export default Nationwide;
