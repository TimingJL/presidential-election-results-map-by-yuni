import styled from 'styled-components';
import Tooltip from 'rc-tooltip';

const G = styled.g`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

interface IData {
  name: string;
  code: string;
  partyColor: string;
}


interface IProps {
  data?: IData;
  content: React.ReactNode;
  onClick?: (cityId: string) => void;
}

const City = (props: IProps) => {
  const { data = {} as IData, content, onClick = () => null } = props;
  return (
    <Tooltip
      placement="top"
      trigger={['hover']}
      overlay={data?.name}
      transitionName={'rc-tooltip-zoom'}
    >
      <G
        id={data?.code}
        data-city={data?.name}
        fill={`#${data?.partyColor}`}
        onClick={() => onClick(data.code)}
      >
        {content}
      </G>
    </Tooltip>
  );
};

export default City;
