import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ConnectedProps } from 'react-redux';
import { POCKET_TO_SYMBOL } from '../utils/constants';
import { Button } from './Button';
import { styled } from '../Theme';
import { Noop } from '../utils/utils';
import { exchangeRateConnector } from '../connectors/ExchangeRateConnector';

const StyledExchangeRate = styled(Button)`
  padding: 6px 12px;
`;

const StyledRate = styled.span`
  margin-left: 10px;
`;

export type ExchangeRateProps = ConnectedProps<typeof exchangeRateConnector>;

export const ExchangeRate = ({ rates }: ExchangeRateProps) => {
  const {
    data: { fromPocket, toPocket, rate },
    status,
  } = rates;
  const rateText = `${POCKET_TO_SYMBOL[fromPocket]}1 = ${POCKET_TO_SYMBOL[toPocket]}${rate}`;
  return (
    <StyledExchangeRate type="button" onClick={Noop} secondary>
      <FontAwesomeIcon icon={faChartLine} />
      {status !== 'failed' && <StyledRate>{rateText}</StyledRate>}
    </StyledExchangeRate>
  );
};

export const ExchangeRateContainer = exchangeRateConnector(ExchangeRate);
