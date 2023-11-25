import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

interface IProps {
  selectedOptionId?: string;
  onChange?: (optionId: string) => void;
  options: {
    name: string;
    id: string;
  }[];
}

const activeOptionStyle = css`
  font-weight: 700;
  color: #000000;
  .option__name {
    border-bottom: 4px solid #262E49;
  }
`;

const Option = styled.div<{
  $isSelected: boolean;
}>`
  width: fit-content;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  color: #BFBFBF;
  transition: all 0.3s ease-in-out;
  .option__name {
    width: fit-content;
    padding-bottom: 12px;
  }
  &:hover {
    color: #262E49;
    .option__name {
      font-weight: 600;
      border-bottom: 4px solid #BFBFBF;
    }
  }
  ${(props) => props.$isSelected && activeOptionStyle}
  @media ${({ theme }) => theme.desktop} {
    font-size: 20px;
  }
`;

const Tabs = (props: IProps) => {
  const { options, selectedOptionId, onChange = () => null } = props;
  return (
    <Swiper
      spaceBetween={4}
      slidesPerView={5}
      breakpoints={{
        // when window width is >= 0px
        0: {
          slidesPerView: 1,
        },
        380: {
          slidesPerView: 2,
        },
        // when window width is >= 595px
        595: {
          slidesPerView: 3,
        },
        // when window width is >= 765px
        765: {
          slidesPerView: 4,
        },
        // when window width is >= 1024px
        1200: {
          slidesPerView: 5,
        },
        // when window width is >= 1200px
        1400: {
          slidesPerView: 6,
        },
        // when window width is >= 1400px
        1600: {
          slidesPerView: 7,
        },
        // when window width is >= 1600px
        1800: {
          slidesPerView: 8,
        }
      }}
    >
      {options.map((option) => {
        const isSelected = option.id === selectedOptionId;
        return (
          <SwiperSlide key={option.id}>
            <Option $isSelected={isSelected} onClick={() => onChange(option.id)}>
              <div className="option__name">
                {option.name}
              </div>
            </Option>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Tabs;
