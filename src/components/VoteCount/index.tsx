/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';

interface IProps {
  candidatePairs: any[];
}

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
`;

const CandidateRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
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

const NoWrapText = styled.div`
  white-space: nowrap;
`;

const BoldText = styled(NoWrapText)`
  font-weight: 600;
  color: #000;
`;

const VoteCount = (props: IProps) => {
  const { candidatePairs } = props;
  return (
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
                <NoWrapText>{`${item.presidentName} | ${item.vicePresidentName}`}</NoWrapText>
              </div>
            </Row>
            <div>
              <BoldText>{item.ticketPercent}%</BoldText>
              <NoWrapText>{item.ticketNum.toLocaleString()} 票</NoWrapText>
            </div>
          </Row>
        );
      })}
    </CandidateRow>
  );
};

export default VoteCount;
