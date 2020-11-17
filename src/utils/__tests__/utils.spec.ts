import { toFixedDecimals } from '../utils';

describe('toFixedDecimals()', () => {
  it('should limit to 2 decimal places', () => {
    const result = toFixedDecimals(1000.506, false, 2);
    expect(result).toMatchSnapshot();
  });

  it('should limit to 2 decimal places and round up', () => {
    const result = toFixedDecimals(1000.506, true, 2);
    expect(result).toMatchSnapshot();
  });

  it('should no contain any decimal places', () => {
    const result = toFixedDecimals(1000.506, false, 0);
    expect(result).toMatchSnapshot();
  });

  it('should no contain any decimal places and round up', () => {
    const result = toFixedDecimals(1000.506, true, 0);
    expect(result).toMatchSnapshot();
  });
});
