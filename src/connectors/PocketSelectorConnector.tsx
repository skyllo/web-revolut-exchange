import { connect } from 'react-redux';
import { RootState } from '../store';
import { setFromPocket, setToPocket } from '../store/reducers/exchangeReducer';
import { Pocket } from '../types';

const mapState = (state: RootState) => ({
  pockets: state.pockets,
});

const mapDispatch = (dispatch: any) => ({
  setFromPocket: (fromPocket: Pocket) => dispatch(setFromPocket(fromPocket)),
  setToPocket: (toPocket: Pocket) => dispatch(setToPocket(toPocket)),
});

export const pocketSelectorConnector = connect(mapState, mapDispatch);
