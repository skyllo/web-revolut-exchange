import { Pocket } from '../../../types';
import exchangeReducer, { setFromPocket, setToPocket, swapPockets } from '../exchangeReducer';

describe('exchangeReducer', () => {
  it('should return the initial state', () => {
    expect(exchangeReducer(undefined, { type: '' })).toMatchSnapshot();
  });

  it('should update fromPocket if different', () => {
    expect(
      exchangeReducer(
        {
          fromPocket: Pocket.GBP,
          toPocket: Pocket.EUR,
        },
        setFromPocket(Pocket.EUR)
      )
    ).toMatchSnapshot();
  });

  it('should switch fromPocket if same', () => {
    expect(
      exchangeReducer(
        {
          fromPocket: Pocket.GBP,
          toPocket: Pocket.EUR,
        },
        setFromPocket(Pocket.GBP)
      )
    ).toMatchSnapshot();
  });

  it('should update toPocket if different', () => {
    expect(
      exchangeReducer(
        {
          fromPocket: Pocket.USD,
          toPocket: Pocket.EUR,
        },
        setToPocket(Pocket.GBP)
      )
    ).toMatchSnapshot();
  });

  it('should switch toPocket if same', () => {
    expect(
      exchangeReducer(
        {
          fromPocket: Pocket.USD,
          toPocket: Pocket.EUR,
        },
        setToPocket(Pocket.EUR)
      )
    ).toMatchSnapshot();
  });

  it('should swap pockets', () => {
    expect(
      exchangeReducer(
        {
          fromPocket: Pocket.EUR,
          toPocket: Pocket.USD,
        },
        swapPockets()
      )
    ).toMatchSnapshot();
  });
});
