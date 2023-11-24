import * as React from 'react';
import styled from 'styled-components';
import ChevronDownSrc from 'src/assets/images/chevron-down.svg';

interface IProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onToggle?: () => void;
}

const Container = styled.div`
  background: #fff;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  height: 48px;
  cursor: pointer;
  .collapse__header-title {
    width: 100%;
    font-weight: 700;
  }
`;

const ChevronDown = styled.img<{
  $open: boolean;
}>`
  cursor: pointer;
  transform: ${props => props.$open ? 'rotate(0deg)' : 'rotate(-90deg)'};
  transition: transform 0.1s ease-in-out;
`;

const Content = styled.div<{
  $open: boolean;
  $height?: number;
}>`
  max-height: ${props => props.$open ? props.$height : 0}px;
  overflow: hidden;
  transition: max-height 0.1s ease-in-out;
`;


const Collapse = (props: IProps) => {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const scrollHeight = panelRef.current?.scrollHeight;
  const { open, title, content, onToggle = () => null, ...rest } = props;
  return (
    <Container {...rest}>
      <Header onClick={onToggle}>
        <div className="collapse__header-title">{title}</div>
        <ChevronDown $open={open} src={ChevronDownSrc} className="collapse__chevron" />
      </Header>
      <Content
        ref={panelRef}
        $open={open}
        $height={scrollHeight}
        className="collapse__header-content"
      >
        {content}
      </Content>
    </Container>
  );
};

export default Collapse;
