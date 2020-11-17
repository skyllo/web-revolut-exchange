import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PocketSelector, PocketSelectorProps } from '../../pages/PocketSelector';
import { ThemeWrapper } from '../../ThemeWrapper';
import { initialStatePockets } from '../../store/reducers/pocketsReducer';
import { Noop } from '../../utils/utils';

export default {
  title: 'Pages/PocketSelector',
  component: PocketSelector,
  decorators: [
    (StoryTest) => (
      <ThemeWrapper>
        <StoryTest />
      </ThemeWrapper>
    ),
  ],
} as Meta;

export const Example: Story<PocketSelectorProps> = () => (
  <PocketSelector
    pockets={initialStatePockets}
    inputDirection="from"
    setFromPocket={Noop}
    setToPocket={Noop}
  />
);
