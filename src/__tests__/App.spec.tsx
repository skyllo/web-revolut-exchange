import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';
import App from '../App';
import store from '../store';
import { ThemeWrapper, ThemeWrapperStyle } from '../ThemeWrapper';
import { Pocket } from '../types';
import { fetchRate } from '../store/reducers/ratesReducer';

beforeAll(() => {
  fetchMock.resetMocks();
});

it('should render <App /> and make a simple exchange', async () => {
  render(
    <Provider store={store}>
      <ThemeWrapper>
        <ThemeWrapperStyle>
          <App />
        </ThemeWrapperStyle>
      </ThemeWrapper>
    </Provider>
  );
  // mock rate and update store
  const fromPocket = Pocket.EUR;
  const toPocket = Pocket.GBP;
  const action = fetchRate.fulfilled(
    {
      fromPocket,
      rate: 2,
      toPocket,
    },
    '',
    { fromPocket, toPocket }
  );
  store.dispatch(action);
  // query for elements on the page
  const fromAmountInput = screen.getByLabelText('fromAmount') as HTMLInputElement;
  const fromAmountBalance = screen.getByTestId('fromAmountBalance');
  const toAmountBalance = screen.getByTestId('toAmountBalance');
  const exchangeButton = screen.getByTestId('submit-exchange');
  // update fromAmount input value
  fireEvent.change(fromAmountInput, { target: { value: '200' } });
  expect(fromAmountInput.value).toEqual('200');
  // check amount before exchange
  expect(fromAmountBalance.innerHTML).toEqual('Balance: £200');
  expect(toAmountBalance.innerHTML).toEqual('Balance: €100');
  // make exchange
  await act(async () => {
    fireEvent.click(exchangeButton);
  });
  // check amount after exchange
  expect(fromAmountBalance.innerHTML).toEqual('Balance: £0');
  expect(toAmountBalance.innerHTML).toEqual('Balance: €500');
});
