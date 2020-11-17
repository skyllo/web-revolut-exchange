import { Pocket } from '../types';

export const POCKET_TO_SYMBOL: Record<Pocket, string> = {
  EUR: '€',
  GBP: '£',
  USD: '$',
};

export const FETCH_RATE_INTERVAL_MS = 10000;
