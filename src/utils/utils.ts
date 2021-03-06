import { useEffect, useRef } from 'react';
import numeral from 'numeral';

export function toFixedDecimals(
  num: number,
  round: boolean = true,
  numDecimals: number = 2
): number {
  if (!round) {
    const numText = num.toString();
    if (numText.indexOf('.') > 0) {
      return Number(numText.slice(0, numText.indexOf('.') + numDecimals + 1));
    }
  }
  return Number(num.toFixed(numDecimals));
}

export function toFixedCurrency(num: number, numDecimals: number = 2) {
  return numeral(num).format(`0[.]${'0'.repeat(numDecimals)}`);
}

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function Noop() {}
