import React from 'react';
import Flag from 'react-flagkit';
import { Pocket, PocketData } from '../types';
import { styled } from '../Theme';
import { toFixedCurrency } from '../utils/utils';

const StyledPocketItem = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 5px;
  grid-template-areas:
    'flag balance'
    'flag title';
  padding: 1em;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.light1Color};
  }
`;

const StyledFlag = styled(Flag)`
  grid-area: flag;
  clip-path: circle(35%);
  transform: scale(1.4);
  margin-right: 10px;
`;

const StyledBalance = styled.div`
  grid-area: balance;
  align-self: end;
`;

const StyledTitle = styled.div`
  grid-area: title;
  color: ${({ theme }) => theme.colors.light2Color};
  font-size: ${({ theme }) => theme.fonts.fontSizeMedium};
`;

export interface PocketItemProps {
  pocket: PocketData;
  onClick?: (pocket: Pocket) => void;
}

export const PocketItem = (props: PocketItemProps) => {
  const { pocket, onClick } = props;

  function onClickWrapper() {
    if (onClick) onClick(pocket.name);
  }

  return (
    <StyledPocketItem key={pocket.name} onClick={onClickWrapper}>
      <StyledFlag country={pocket.countryCode} size={45} />
      <StyledBalance>
        {pocket.name} • {pocket.symbol}
        {toFixedCurrency(pocket.balance)}
      </StyledBalance>
      <StyledTitle>{pocket.title}</StyledTitle>
    </StyledPocketItem>
  );
};
