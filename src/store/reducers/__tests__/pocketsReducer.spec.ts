import { Pocket } from '../../../types';
import pocketsReducer, { initialStatePockets, setBalance } from '../pocketsReducer';

describe('pocketsReducer', () => {
  it('should return the initial state', () => {
    expect(pocketsReducer(undefined, { type: '' })).toMatchSnapshot();
  });

  it('should set balance correctly', () => {
    expect(
      pocketsReducer(
        {
          EUR: {
            ...initialStatePockets.EUR,
            balance: 0,
          },
          GBP: {
            ...initialStatePockets.GBP,
            balance: 0,
          },
          USD: {
            ...initialStatePockets.USD,
            balance: 0,
          },
        },
        setBalance({ balance: 199, pocket: Pocket.EUR })
      )
    ).toMatchSnapshot();
  });
});
