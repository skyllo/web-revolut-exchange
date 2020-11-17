/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POCKET_TO_SYMBOL } from '../../utils/constants';
import { Pocket, PocketData } from '../../types';

type PocketAction = PayloadAction<{
  pocket: Pocket;
  balance: number;
}>;

export const initialStatePockets: Record<Pocket, PocketData> = {
  EUR: {
    name: Pocket.EUR,
    balance: 100,
    symbol: POCKET_TO_SYMBOL[Pocket.EUR],
    title: 'Euro',
    countryCode: 'EU',
  },
  GBP: {
    name: Pocket.GBP,
    balance: 200,
    symbol: POCKET_TO_SYMBOL[Pocket.GBP],
    title: 'British Pound',
    countryCode: 'GB',
  },
  USD: {
    name: Pocket.USD,
    balance: 300,
    symbol: POCKET_TO_SYMBOL[Pocket.USD],
    title: 'US Dollar',
    countryCode: 'US',
  },
};

export const pocketsSlice = createSlice({
  name: 'pockets',
  initialState: initialStatePockets,
  reducers: {
    setBalance: (state, { payload: { balance, pocket } }: PocketAction) => {
      state[pocket].balance = balance;
    },
  },
});

export const { setBalance } = pocketsSlice.actions;

export default pocketsSlice.reducer;
