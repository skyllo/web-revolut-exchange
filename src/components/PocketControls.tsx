import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { styled } from '../Theme';
import { PocketData } from '../types';
import { toFixedCurrency } from '../utils/utils';
import { AmountInput } from './AmountInput';
import { IconButton } from './IconButton';

const PocketControlsStyled = styled.div<{ hasEnoughBalance: boolean }>`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 10px;
  grid-template-areas:
    'title amount'
    'balance balance';
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  color: ${({ theme }) => theme.colors.foregroundColor};
`;

const StyledIconButton = styled(IconButton)`
  grid-area: title;
  align-self: end;
`;

const StyledBalance = styled.div<{ hasEnoughBalance: boolean }>`
  grid-area: balance;
  align-self: start;
  color: ${({ hasEnoughBalance, theme }) =>
    hasEnoughBalance ? theme.colors.light2Color : theme.colors.errorColor};
  font-size: ${({ theme }) => theme.fonts.fontSizeMedium};
`;

const StyledAmount = styled.div`
  display: grid;
  grid-area: amount;
  justify-items: end;
  align-self: end;
  align-items: center;
  font-weight: ${({ theme }) => theme.fonts.fontWeightNormal};
  font-size: ${({ theme }) => theme.fonts.fontSizeHuge};
  grid-template-columns: 1fr max-content;

  > input {
    width: 3ch;
    font-weight: inherit;
    font-size: inherit;
  }
`;

export interface PocketControlsProps {
  className?: string;
  amount: string;
  name: 'fromAmount' | 'toAmount';
  onChange?: any;
  onPocketClick?: any;
  onFocus?: any;
  pocket: PocketData;
  prefix: string;
}

export const PocketControls = React.forwardRef<HTMLInputElement, PocketControlsProps>(
  (props: PocketControlsProps, ref) => {
    const {
      className = '',
      amount = '',
      name,
      pocket,
      onChange,
      onFocus,
      prefix,
      onPocketClick,
    } = props;
    const [inputWidthStyle, setInputWidthStyle] = useState<string>('3ch');
    const [hasEnoughBalance, setHasEnoughBalance] = useState<boolean>(true);
    const amountValue = Number(amount);

    useEffect(() => {
      if (name === 'fromAmount') {
        setHasEnoughBalance(amountValue === 0 || amountValue <= pocket.balance);
      }
    }, [name, pocket.balance, amountValue]);

    // resize input amount based on content
    useLayoutEffect(() => {
      const numbers = amount.replace('.', '').length;
      const cssWidth = `calc(${numbers}ch + 10px)`;
      setInputWidthStyle(amount === '' ? '3ch' : cssWidth);
    }, [amount]);

    return (
      <PocketControlsStyled className={className} hasEnoughBalance={hasEnoughBalance}>
        <StyledIconButton icon={faAngleDown} onClick={onPocketClick}>
          {pocket.name}
        </StyledIconButton>
        <StyledBalance data-testid={`${name}Balance`} hasEnoughBalance={hasEnoughBalance}>
          Balance: {pocket.symbol}
          {toFixedCurrency(pocket.balance)}
        </StyledBalance>
        <StyledAmount>
          {amount !== '' && amountValue !== 0 && <div>{prefix}</div>}
          <AmountInput
            name={name}
            aria-label={name}
            min="0.01"
            step="0.01"
            autoComplete="off"
            placeholder="0"
            style={{ width: inputWidthStyle, textAlign: 'right' }}
            onChange={onChange}
            onFocus={onFocus}
            maxLength={6}
            maxDecimalPlaces={2}
            ref={ref}
          />
        </StyledAmount>
      </PocketControlsStyled>
    );
  }
);
