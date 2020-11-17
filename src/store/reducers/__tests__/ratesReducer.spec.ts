import { Pocket } from '../../../types';
import ratesReducer, { initialStateRate, fetchRate } from '../ratesReducer';

describe('ratesReducer', () => {
  it('should return the initial state', () => {
    expect(ratesReducer(undefined, { type: '' })).toMatchSnapshot();
  });

  it('should have correct state on successful rate', () => {
    const fromPocket = Pocket.EUR;
    const toPocket = Pocket.GBP;

    const action = fetchRate.fulfilled(
      {
        fromPocket,
        rate: 1.123123,
        toPocket,
      },
      '',
      { fromPocket, toPocket }
    );
    expect(ratesReducer(initialStateRate, action)).toMatchSnapshot();
  });

  it('should have correct state on failed rate', () => {
    const fromPocket = Pocket.EUR;
    const toPocket = Pocket.GBP;

    const action = fetchRate.rejected(new Error('failed!'), '', { fromPocket, toPocket });
    expect(ratesReducer(initialStateRate, action)).toMatchSnapshot();
  });

  it('should have correct state on loading rate', () => {
    const fromPocket = Pocket.EUR;
    const toPocket = Pocket.GBP;

    const action = fetchRate.pending('', { fromPocket, toPocket });
    expect(ratesReducer(initialStateRate, action)).toMatchSnapshot();
  });
});
