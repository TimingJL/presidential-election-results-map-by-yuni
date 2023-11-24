/* eslint-disable @typescript-eslint/no-explicit-any */
import { orderBy } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import VoteCount from 'src/components/VoteCount';

const Container = styled.div`
  .vote-count-info__desktop {
    display: none;
  }
  @media ${({ theme }) => theme.desktop} {
    .vote-count-info__swipe {
      display: none;
    }
    .vote-count-info__desktop {
      width: 260px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
`;

const OuterBox = styled.div<{
  $color?: string;
}>`
  background: #FFF;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${props => props.$color || '#DEE0E4'};
`;

const InnerBox = styled.div<{
  $color?: string;
}>`
  padding: 12px 20px;
  background-color: ${props => `${props.$color}20` || '#DEE0E4'};
  filter: brightness(120%);
`;

const AreaName = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

interface IProps {
  cityCandidatePairs: any[];
  areaCandidatePairs: any[];
  deptCandidatePairs: any[];
}

const VoteCountInfo = (props: IProps) => {
  const { cityCandidatePairs = [], areaCandidatePairs = [], deptCandidatePairs = [] } = props;
  const boxComponents = [
    <OuterBox $color={`#${orderBy(cityCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
      <InnerBox $color={`#${orderBy(cityCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
        <AreaName>{cityCandidatePairs[0]?.areaName}</AreaName>
        <VoteCount candidatePairs={cityCandidatePairs} />
      </InnerBox>
    </OuterBox>,
    <OuterBox $color={`#${orderBy(areaCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
      <InnerBox $color={`#${orderBy(areaCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
        <AreaName>{areaCandidatePairs[0]?.areaName}</AreaName>
        <VoteCount candidatePairs={areaCandidatePairs} />
      </InnerBox>
    </OuterBox>,
    <OuterBox $color={`#${orderBy(deptCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
      <InnerBox $color={`#${orderBy(deptCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
        <AreaName>{deptCandidatePairs[0]?.areaName}</AreaName>
        <VoteCount candidatePairs={deptCandidatePairs} />
      </InnerBox>
    </OuterBox>
  ];
  return (
    <Container>
      <div className="vote-count-info__swipe">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.3}
        >
          <SwiperSlide>{boxComponents[0]}</SwiperSlide>
          <SwiperSlide>{boxComponents[1]}</SwiperSlide>
          <SwiperSlide>{boxComponents[2]}</SwiperSlide>
        </Swiper>
      </div>
      <div className="vote-count-info__desktop">
        {boxComponents[0]}
        {boxComponents[1]}
        {boxComponents[2]}
      </div>
    </Container>
  );
};

export default VoteCountInfo;
