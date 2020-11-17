import { connect } from 'react-redux';
import { RootState } from '../store';
import { fetchRate } from '../store/reducers/ratesReducer';
import { setBalance } from '../store/reducers/pocketsReducer';
import { Pocket } from '../types';
import { swapPockets } from '../store/reducers/exchangeReducer';

const mapState = (state: RootState) => ({
  exchange: state.exchange,
  rates: state.rates,
  pockets: state.pockets,
});

const mapDispatch = (dispatch: any) => ({
  fetchRate: (fromPocket: Pocket, toPocket: Pocket) =>
    dispatch(fetchRate({ fromPocket, toPocket })),
  setBalance: (pocket: Pocket, balance: number) => dispatch(setBalance({ pocket, balance })),
  swapPockets: () => dispatch(swapPockets()),
});

export const exchangeConnector = connect(mapState, mapDispatch);
