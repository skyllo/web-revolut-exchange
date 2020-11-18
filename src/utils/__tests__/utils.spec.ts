import { toFixedDecimals, toFixedCurrency } from '../utils';

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

describe('toFixedCurrency()', () => {
  it('should fix to 2 decimal places', () => {
    const result = toFixedCurrency(1000.5);
    expect(result).toMatchSnapshot();
  });

  it('should have no decimal places when decimals are zero', () => {
    const result = toFixedCurrency(1000, 2);
    expect(result).toMatchSnapshot();
  });

  it('should remove all decimal places', () => {
    const result = toFixedCurrency(1000.213, 0);
    expect(result).toMatchSnapshot();
  });
});
