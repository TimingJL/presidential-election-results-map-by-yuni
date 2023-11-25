import styled from 'styled-components';
import { PieChart, Pie, Cell } from 'recharts';
import { TTicket } from 'src/types';

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

interface IProps {
  electionOverview: TTicket;
}

const Nationwide = (props: IProps) => {
  const { electionOverview } = props;
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
          <div className="voting-rate__percentage">{electionOverview.vote_to_elect}%</div>
          <div className="voting-rate__label">投票率</div>
        </VotingRate>
      </Row>
      <Tickets>
        <div>投票數<span>{electionOverview.vote_ticket?.toLocaleString()} 票</span></div>
        <div>無效票數<span>{electionOverview.invalid_ticket?.toLocaleString()} 票</span></div>
        <div>有效票數<span>{electionOverview.valid_ticket?.toLocaleString()} 票</span></div>
      </Tickets>
    </Flex>
  );
};

export default Nationwide;
