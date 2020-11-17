import { Pocket, PocketData, Rate } from '../types';
import { toFixedDecimals } from '../utils/utils';

interface PostExchangeResult {
  fromBalance: number;
  toBalance: number;
}

export async function postExchange(
  fromPocketData: PocketData,
  toPocketData: PocketData,
  amount: number,
  rate: number
): Promise<PostExchangeResult> {
  const { balance: fromBalance, name: fromPocket } = fromPocketData;
  const { balance: toBalance, name: toPocket } = toPocketData;
  console.log('postExchange', fromPocket, toPocket, amount, rate);
  return {
    fromBalance: toFixedDecimals(fromBalance - amount),
    toBalance: toFixedDecimals(toBalance + amount * rate),
  };
}

export async function getRate(fromPocket: Pocket, toPocket: Pocket): Promise<Rate> {
  console.log('getRate', fromPocket, toPocket);
  const res = await fetch(`https://api.exchangeratesapi.io/latest?base=${fromPocket}`);
  const { rates } = await res.json();
  const rate = toFixedDecimals(Number(rates[toPocket]), true, 4);
  return {
    fromPocket,
    toPocket,
    rate,
  };
}
