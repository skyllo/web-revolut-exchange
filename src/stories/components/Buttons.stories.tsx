import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ThemeWrapper } from '../../ThemeWrapper';
import { Button, ButtonProps } from '../../components/Button';
import { ThemeButton, ThemeButtonProps } from '../../components/ThemeButton';
import {
  ExchangeRate as ExchangeRateButton,
  ExchangeRateProps,
} from '../../components/ExchangeRate';
import { Pocket } from '../../types';
import { SwapButton, SwapButtonProps } from '../../components/SwapButton';
import { IconButton, IconButtonProps } from '../../components/IconButton';

export default {
  title: 'Components/Buttons',
  component: Button,
  decorators: [
    (StoryTest) => (
      <ThemeWrapper>
        <StoryTest />
      </ThemeWrapper>
    ),
  ],
} as Meta;

export const Primary: Story<ButtonProps> = () => <Button>Primary</Button>;

export const Secondary: Story<ButtonProps> = () => <Button secondary>Secondary</Button>;

export const Icon: Story<IconButtonProps> = () => <IconButton icon={faHeart}>heart</IconButton>;

export const Swap: Story<SwapButtonProps> = () => <SwapButton />;

export const Theme: Story<ThemeButtonProps> = () => <ThemeButton />;

export const ExchangeRate: Story<ExchangeRateProps> = () => (
  <ExchangeRateButton
    rates={{
      error: undefined,
      status: 'succeeded',
      data: { fromPocket: Pocket.GBP, toPocket: Pocket.EUR, rate: 1.1234 },
    }}
  />
);
