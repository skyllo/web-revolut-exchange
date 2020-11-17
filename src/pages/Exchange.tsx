import React, { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ConnectedProps } from 'react-redux';
import { PocketControls } from '../components/PocketControls';
import { ExchangeActions } from '../components/ExchangeActions';
import { exchangeConnector } from '../connectors/ExchangeConnector';
import { Button } from '../components/Button';
import { toFixedDecimals, usePrevious } from '../utils/utils';
import { styled } from '../Theme';
import { Header } from '../components/Header';
import { postExchange } from '../api/client';
import { FETCH_RATE_INTERVAL_MS } from '../utils/constants';
import { InputDirection } from '../types';

const ExchangeFormStyled = styled.form`
  display: grid;
  grid-template-rows: max-content 1fr 0px 1fr max-content;
  width: 100%;
  height: 100%;

  .top {
    padding: 1.5em 1em;
  }

  .actions-wrapper {
    position: relative;
    top: -16px;
  }

  .actions {
    margin: 0 1em;
  }

  .bottom {
    background-color: ${({ theme }) => theme.colors.secondaryColor};
    padding: 1.5em 1em;

    button {
      width: 100%;
    }
  }
`;

type Inputs = {
  fromAmount: string;
  toAmount: string;
};

type ExchangePropsExtra = {
  onClick?: (inputDirection: InputDirection) => void;
};

export type ExchangeProps = ConnectedProps<typeof exchangeConnector> & ExchangePropsExtra;

export const Exchange = (props: ExchangeProps) => {
  const { fetchRate, rates, pockets, setBalance, exchange, swapPockets, onClick } = props;
  const { fromPocket, toPocket } = exchange;
  const {
    data: { rate },
    status,
  } = rates;
  const rateInterval = useRef<number>(-1);
  const { register, handleSubmit, setValue, watch } = useForm<Inputs>({
    defaultValues: {
      fromAmount: '',
      toAmount: '',
    },
  });
  const [canTransfer, setCanTransfer] = useState<boolean>(false);
  const [inputFocused, setInputFocused] = useState<InputDirection>('from');
  const prevInputFocused = usePrevious(inputFocused);
  const { fromAmount, toAmount } = watch();
  const fromAmountValue = Number(fromAmount);
  const toAmountValue = Number(toAmount);

  const onSubmit = async () => {
    try {
      // fake exchange API call
      const { fromBalance, toBalance } = await postExchange(
        pockets[fromPocket],
        pockets[toPocket],
        fromAmountValue,
        rate
      );
      // update pockets state with new values
      setBalance(fromPocket, fromBalance);
      setBalance(toPocket, toBalance);
      // reset form amounts
      setValue('fromAmount', '');
      setValue('toAmount', '');
    } catch (err) {
      console.error(err);
    }
  };

  // prevent enter button from submitting form
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  // changes currency conversion direction on amount input focus
  const onAmountFocus = (direction: InputDirection) => () => {
    setInputFocused(direction);
  };

  // updates from and to amount values on changes
  const fromAmountChange = useCallback(() => {
    const newToAmount = fromAmount !== '' ? toFixedDecimals(fromAmountValue * rate).toString() : '';
    setValue('toAmount', newToAmount);
  }, [fromAmount, fromAmountValue, rate, setValue]);

  const toAmountChange = useCallback(() => {
    const newFromAmount = toAmount !== '' ? toFixedDecimals(toAmountValue / rate).toString() : '';
    setValue('fromAmount', newFromAmount);
  }, [toAmount, toAmountValue, rate, setValue]);

  // fetch new exchange rate on interval
  useEffect(() => {
    clearInterval(rateInterval.current);
    fetchRate(fromPocket, toPocket);
    rateInterval.current = setInterval(() => {
      fetchRate(fromPocket, toPocket);
    }, FETCH_RATE_INTERVAL_MS);
    return () => clearInterval(rateInterval.current);
  }, [fromPocket, toPocket, fetchRate]);

  // update state to see if a transfer can be made
  useEffect(() => {
    const hasEnoughBalance = fromAmountValue > 0 && fromAmountValue <= pockets[fromPocket].balance;
    setCanTransfer(hasEnoughBalance && status !== 'failed');
  }, [fromPocket, fromAmount, pockets, fromAmountValue, status]);

  // swap pocket amount values
  useEffect(() => {
    if (inputFocused === prevInputFocused) {
      if (inputFocused === 'from') {
        fromAmountChange();
      } else {
        toAmountChange();
      }
    }
  }, [inputFocused, prevInputFocused, fromAmountChange, toAmountChange]);

  function onSwap() {
    // swap pockets
    swapPockets();
    // swap pocket values
    const oldFromAmount = fromAmount;
    const oldToAmount = toAmount;
    setInputFocused(inputFocused === 'to' ? 'from' : 'to');
    setValue('fromAmount', oldToAmount);
    setValue('toAmount', oldFromAmount);
  }

  return (
    <ExchangeFormStyled onSubmit={handleSubmit(onSubmit)} onKeyPress={onKeyPress}>
      <Header>
        <h1>Exchange</h1>
      </Header>
      <PocketControls
        className="top"
        name="fromAmount"
        ref={register}
        pocket={pockets[fromPocket]}
        amount={fromAmount}
        onPocketClick={onClick?.bind(this, 'from')}
        onChange={fromAmountChange}
        onFocus={onAmountFocus('from')}
        prefix="-"
      />
      <div className="actions-wrapper">
        <ExchangeActions className="actions" onSwap={onSwap} />
      </div>
      <PocketControls
        className="bottom"
        name="toAmount"
        ref={register}
        pocket={pockets[toPocket]}
        amount={toAmount}
        onPocketClick={onClick?.bind(this, 'to')}
        onChange={toAmountChange}
        onFocus={onAmountFocus('to')}
        prefix="+"
      />
      <div className="bottom">
        <Button data-testid="submit-exchange" disabled={!canTransfer} type="submit">
          Exchange
        </Button>
      </div>
    </ExchangeFormStyled>
  );
};

export const ExchangeContainer = exchangeConnector(Exchange);
