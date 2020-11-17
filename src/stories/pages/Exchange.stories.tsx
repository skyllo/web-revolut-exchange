import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Provider } from 'react-redux';
import { Exchange, ExchangeProps } from '../../pages/Exchange';
import { ThemeWrapper } from '../../ThemeWrapper';
import { initialStatePockets } from '../../store/reducers/pocketsReducer';
import { Pocket } from '../../types';
import store from '../../store';
import { Noop } from '../../utils/utils';

export default {
  title: 'Pages/Exchange',
  component: Exchange,
  decorators: [
    (StoryTest) => (
      <Provider store={store}>
        <ThemeWrapper>
          <StoryTest />
        </ThemeWrapper>
      </Provider>
    ),
  ],
} as Meta;

export const Example: Story<ExchangeProps> = () => (
  <Exchange
    exchange={{
      fromPocket: Pocket.GBP,
      toPocket: Pocket.EUR,
    }}
    setBalance={Noop}
    fetchRate={Noop}
    swapPockets={Noop}
    pockets={initialStatePockets}
    rates={{
      error: undefined,
      status: 'succeeded',
      data: { fromPocket: Pocket.GBP, toPocket: Pocket.EUR, rate: 1.1234 },
    }}
  />
);
