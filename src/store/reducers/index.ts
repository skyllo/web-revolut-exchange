import { combineReducers } from '@reduxjs/toolkit';
import exchangeReducer from './exchangeReducer';
import pocketsReducer from './pocketsReducer';
import ratesReducer from './ratesReducer';

export default combineReducers({
  exchange: exchangeReducer,
  pockets: pocketsReducer,
  rates: ratesReducer,
});
