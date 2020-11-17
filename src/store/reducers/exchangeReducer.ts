/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pocket } from '../../types';

export interface ExhangeState {
  fromPocket: Pocket;
  toPocket: Pocket;
}

const initialState: ExhangeState = {
  fromPocket: Pocket.GBP,
  toPocket: Pocket.EUR,
};

function switchPockets(state: ExhangeState) {
  const { fromPocket, toPocket } = state;
  state.fromPocket = toPocket;
  state.toPocket = fromPocket;
}

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    swapPockets(state) {
      switchPockets(state);
    },
    setFromPocket(state, action: PayloadAction<Pocket>) {
      const { fromPocket, toPocket } = state;
      const { payload: pocket } = action;
      // swap or switch to a new pocket when selected
      if (fromPocket === pocket || toPocket === pocket) {
        switchPockets(state);
      } else {
        state.fromPocket = action.payload;
      }
    },
    setToPocket(state, action: PayloadAction<Pocket>) {
      const { fromPocket, toPocket } = state;
      const { payload: pocket } = action;
      // swap or switch to a new pocket when selected
      if (fromPocket === pocket || toPocket === pocket) {
        switchPockets(state);
      } else {
        state.toPocket = action.payload;
      }
    },
  },
});

export const { setFromPocket, setToPocket, swapPockets } = exchangeSlice.actions;

export default exchangeSlice.reducer;
