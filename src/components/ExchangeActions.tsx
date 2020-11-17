import React from 'react';
import { styled } from '../Theme';
import { ExchangeRateContainer } from './ExchangeRate';
import { SwapButton } from './SwapButton';

const StyledExchangeActions = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
`;

const StyledSwapButtonWrapper = styled.div`
  position: absolute;
  left: 0;
`;

export interface ExchangeActionsProps {
  className?: string;
  onSwap: any;
}

export const ExchangeActions = ({ className = '', onSwap }: ExchangeActionsProps) => (
  <StyledExchangeActions className={className}>
    <StyledSwapButtonWrapper>
      <SwapButton onClick={onSwap} />
    </StyledSwapButtonWrapper>
    <ExchangeRateContainer />
  </StyledExchangeActions>
);
