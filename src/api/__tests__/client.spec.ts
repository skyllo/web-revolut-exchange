import fetchMock from 'jest-fetch-mock';
import { initialStatePockets } from '../../store/reducers/pocketsReducer';
import { Pocket } from '../../types';
import { getRate, postExchange } from '../client';

beforeAll(() => {
  fetchMock.resetMocks();
});

describe('postExchange()', () => {
  it('should return correct balance after exchange', async () => {
    const newBalances = await postExchange(
      initialStatePockets.GBP,
      initialStatePockets.EUR,
      200,
      1.5
    );
    expect(newBalances).toMatchSnapshot();
  });

  it('should only return 2 decimal places after exchange', async () => {
    const newBalances = await postExchange(
      initialStatePockets.EUR,
      initialStatePockets.USD,
      100,
      1.2345
    );
    expect(newBalances).toMatchSnapshot();
  });
});

describe('getRate()', () => {
  it('should return rate for GBP -> EUR with 4 decimal places', async () => {
    fetchMock.mockOnce(
      JSON.stringify({ rates: { EUR: 1.1162583022, GBP: 1.0 }, base: 'GBP', date: '2020-11-17' })
    );
    const rate = await getRate(Pocket.GBP, Pocket.EUR);
    expect(rate).toMatchSnapshot();
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toMatchSnapshot();
  });
});
