import React, { ReactNode } from 'react';
import { styled } from '../Theme';
import { ThemeButton } from './ThemeButton';

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  color: ${({ theme }) => theme.colors.foregroundColor};
  align-items: center;
  padding: 1em;
`;

export interface HeaderProps {
  children: ReactNode;
}

export const Header = (props: HeaderProps) => {
  const { children } = props;
  return (
    <StyledHeader>
      <span>{children}</span>
      <ThemeButton />
    </StyledHeader>
  );
};
