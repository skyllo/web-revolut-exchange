/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRate } from '../../api/client';
import { Pocket, Rate } from '../../types';

interface RateAction {
  fromPocket: Pocket;
  toPocket: Pocket;
}

export interface RateState {
  status: 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  data: Rate;
}

export const initialStateRate: RateState = {
  status: 'loading',
  error: undefined,
  data: {
    rate: 0,
    fromPocket: Pocket.GBP,
    toPocket: Pocket.EUR,
  },
};

export const fetchRate = createAsyncThunk<Rate, RateAction>(
  'rates/fetchRates',
  async ({ fromPocket, toPocket }) => getRate(fromPocket, toPocket)
);

export const ratesSlice = createSlice({
  name: 'rates',
  initialState: initialStateRate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRate.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchRate.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchRate.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default ratesSlice.reducer;
