import { orderBy } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import VoteCount from 'src/components/VoteCount';
import infoSrc from 'src/assets/images/info.svg';
import infoSelectSrc from 'src/assets/images/info-select.svg';
import infoClickAreaSrc from 'src/assets/images/info-click-area.svg';
import { TCandidatePair } from 'src/types';

const Container = styled.div`
  .vote-count-info__desktop {
    display: none;
  }
  @media ${({ theme }) => theme.desktop} {
    height: 620px;
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

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Description = styled.div`
  margin-top: 8px;
  height: 74px;
`;

const Diagram = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  selectedCityId?: string;
  selectedAreaId?: string;
  selectedDeptId?: string;
  cityCandidatePairs: TCandidatePair[];
  areaCandidatePairs: TCandidatePair[];
  deptCandidatePairs: TCandidatePair[];
}

const VoteCountInfo = (props: IProps) => {
  const {
    selectedCityId, selectedAreaId, selectedDeptId,
    cityCandidatePairs = [], areaCandidatePairs = [], deptCandidatePairs = []
  } = props;
  const voteComponents = [
    <OuterBox $color={`#${orderBy(cityCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
      <InnerBox $color={`#${orderBy(cityCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
        <Title>{cityCandidatePairs[0]?.areaName}</Title>
        <VoteCount candidatePairs={cityCandidatePairs} />
      </InnerBox>
    </OuterBox>,
    <OuterBox $color={`#${orderBy(areaCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
      <InnerBox $color={`#${orderBy(areaCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
        <Title>{areaCandidatePairs[0]?.areaName}</Title>
        <VoteCount candidatePairs={areaCandidatePairs} />
      </InnerBox>
    </OuterBox>,
    <OuterBox $color={`#${orderBy(deptCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
      <InnerBox $color={`#${orderBy(deptCandidatePairs, 'ticketNum', 'desc')[0]?.partyColor}`}>
        <Title>{deptCandidatePairs[0]?.areaName}</Title>
        <VoteCount candidatePairs={deptCandidatePairs} />
      </InnerBox>
    </OuterBox>
  ];
  const hintComponents = [
    <OuterBox style={{ background: '#DEE0E4' }} data-aos="fade-up" data-aos-delay="700">
      <InnerBox style={{ filter: 'none' }}>
        <Title>
          <img src={infoSrc} />
          小提示
        </Title>
        <Description>點擊選擇縣市、區、村里，可查看選舉結果</Description>
        <Diagram>
          <img src={infoSelectSrc} />
        </Diagram>
      </InnerBox>
    </OuterBox>,
    <OuterBox style={{ background: '#DEE0E4' }} data-aos="fade-up" data-aos-delay="900">
      <InnerBox style={{ filter: 'none' }}>
        <Title>
          <img src={infoSrc} />
          小提示
        </Title>
        <Description>點擊地圖查看縣市的選舉結果</Description>
        <Diagram>
          <img src={infoClickAreaSrc} />
        </Diagram>
      </InnerBox>
    </OuterBox>,
  ];
  const boxComponents = (!selectedCityId && !selectedAreaId && !selectedDeptId) ? hintComponents : voteComponents;

  return (
    <Container>
      <div className="vote-count-info__swipe">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.3}
          breakpoints={{
            // when window width is >= 0px
            0: {
              slidesPerView: 1.3,
            },
            600: {
              slidesPerView: 2,
            },
            // when window width is >= 595px
            800: {
              slidesPerView: 3,
            },
          }}
        >
          {boxComponents.map((boxComponent, index) => (
            <SwiperSlide key={index}>{boxComponent}</SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="vote-count-info__desktop">
        {boxComponents.map((boxComponent, index) => (
          <div key={index} data-aos="fade-up">{boxComponent}</div>
        ))}
      </div>
    </Container>
  );
};

export default VoteCountInfo;
