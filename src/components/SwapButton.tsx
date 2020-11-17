import React, { MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from './Button';
import { styled } from '../Theme';

const StyledSwapButton = styled(Button)`
  > svg {
    transform: scale(0.9) rotate(90deg);
  }
`;

export interface SwapButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const SwapButton = (props: SwapButtonProps) => {
  const { onClick } = props;
  return (
    <StyledSwapButton type="button" onClick={onClick} secondary>
      <FontAwesomeIcon icon={faExchangeAlt} />
    </StyledSwapButton>
  );
};
