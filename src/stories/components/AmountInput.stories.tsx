import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { AmountInput, AmountInputProps } from '../../components/AmountInput';
import { ThemeWrapper } from '../../ThemeWrapper';

export default {
  title: 'Components/AmountInput',
  component: AmountInput,
  decorators: [
    (StoryTest) => (
      <ThemeWrapper>
        <StoryTest />
      </ThemeWrapper>
    ),
  ],
} as Meta;

export const Default: Story<AmountInputProps> = () => <AmountInput placeholder="0" />;

export const LimitTenNumbers: Story<AmountInputProps> = () => (
  <AmountInput placeholder="0" maxLength={10} />
);

export const LimitZeroNumbers: Story<AmountInputProps> = () => (
  <AmountInput placeholder="0" maxLength={0} />
);

export const NoDecimalPlaces: Story<AmountInputProps> = () => (
  <AmountInput placeholder="0" maxDecimalPlaces={0} />
);
