import React, { MouseEvent, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { styled } from '../Theme';

const StyledIconButton = styled.button`
  display: flex;
  color: ${({ theme }) => theme.colors.foregroundColor};
  font-weight: ${({ theme }) => theme.fonts.fontWeightNormal};
  font-size: ${({ theme }) => theme.fonts.fontSizeHuge};
  border: 0;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
  align-items: center;

  > svg {
    font-weight: ${({ theme }) => theme.fonts.fontWeightThin};
    font-size: ${({ theme }) => theme.fonts.fontSizeSmall};
    margin-left: 10px;
  }
`;

export interface IconButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  icon: IconProp;
}

export const IconButton = (props: IconButtonProps) => {
  const { children, className = '', icon, onClick } = props;
  return (
    <StyledIconButton type="button" className={className} onClick={onClick}>
      <span>{children}</span>
      <FontAwesomeIcon icon={icon} />
    </StyledIconButton>
  );
};
