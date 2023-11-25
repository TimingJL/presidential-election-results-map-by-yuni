import * as React from 'react';
import styled, { css } from 'styled-components';
import ChevronDownSrc from 'src/assets/images/chevron-down.svg';

interface IProps {
  options: {
    name: string;
    id: string;
  }[];
  disabled?: boolean;
  selectedOptionId?: string;
  onChange?: (optionId: string) => void;
  className?: string;
}

const disabledStyle = css`
  &:hover, &:active, &:focus {
    border-color: #E6E6E6;
  }
  cursor: not-allowed;
  opacity: 0.5;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const SelectButton = styled.div<{
  $open: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  height: 36px;
  box-sizing: border-box;
  padding: 0 12px;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  border: 1px solid ${props => props.$open ? '#262E49' : '#E6E6E6'};
  cursor: pointer;
  &:hover {
    border: 1px solid ${props => props.$open ? '#262E49' : '#BFBFBF'};
  }
  &:active, &:focus {
    border-color: #262E49;
  }
  ${props => props.$disabled && disabledStyle}
`;

const SelectDropdown = styled.div<{
  $open: boolean;
}>`
  margin-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border: ${props => props.$open ? 1 : 0}px solid #262E49;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 1;
  max-height: ${props => props.$open ? '200px' : '0'};
  overflow: auto;
`;

const Option = styled.div<{
  $selected: boolean;
}>`
  padding: 4px 20px;
  cursor: pointer;
  background: ${props => props.$selected ? '#DEE0E4' : '#fff'};
  &:hover {
    background: #DEE0E4;
  }
`;

const Select = (props: IProps) => {
  const selectRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const { options = [], selectedOptionId, className, disabled = false, onChange = () => null } = props;
  const selectedOption = options.find((option) => option.id === selectedOptionId);
  const hasOptions = options.length > 0;

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // 檢查點擊事件的目標是否在下拉選單以外
      if (selectRef?.current && !selectRef?.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    // 添加點擊事件監聽器
    document.addEventListener('mousedown', handleOutsideClick);

    // 在組件卸載時清除監聽器
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []); // 空的依賴列表表示僅在組件卸載時清除監聽器

  return (
    <SelectWrapper ref={selectRef} className={className}>
      <SelectButton
        $open={open}
        $disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setOpen(true);
        }}
      >
        <div>{selectedOption?.name || '請選擇'}</div>
        <img src={ChevronDownSrc} />
      </SelectButton>
      {hasOptions && (
        <SelectDropdown
          $open={open}
        >
          {options.map((option) => {
            return (
              <Option
                key={option.id}
                $selected={option.id === selectedOptionId}
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
              >
                {option.name}
              </Option>
            );
          })}
        </SelectDropdown>
      )}
    </SelectWrapper>
  );
};

export default Select;
