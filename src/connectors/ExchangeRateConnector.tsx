import { connect } from 'react-redux';
import { RootState } from '../store';

const mapState = (state: RootState) => ({
  rates: state.rates,
});

const mapDispatch = () => ({});

export const exchangeRateConnector = connect(mapState, mapDispatch);
