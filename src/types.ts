export enum Pocket {
  EUR = 'EUR',
  GBP = 'GBP',
  USD = 'USD',
}

export interface PocketData {
  name: Pocket;
  balance: number;
  symbol: string;
  title: string;
  countryCode: string;
}

export type InputDirection = 'from' | 'to';

export interface Rate {
  rate: number;
  fromPocket: Pocket;
  toPocket: Pocket;
}
