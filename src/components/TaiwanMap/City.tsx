/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';

const G = styled.g`
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;


interface IProps {
  data?: any;
  content: React.ReactNode;
  onClick?: ({
    name, code
  }: {
    name: string;
    code: string;
  }) => void;
}

const City = (props: IProps) => {
  const { data = {}, content, onClick = () => null } = props;
  return (
    <G
      id={data?.code}
      data-city={data?.name}
      fill={`#${data?.partyColor}`}
      onClick={() => onClick({ name: data.name, code: data.code })}
    >
      {content}
    </G>
  );
};

export default City;
