import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeWrapper } from '../../ThemeWrapper';
import { initialStatePockets } from '../../store/reducers/pocketsReducer';
import { PocketItem, PocketItemProps } from '../../components/PocketItem';

export default {
  title: 'Components/PocketItem',
  component: PocketItem,
  decorators: [
    (StoryTest) => (
      <ThemeWrapper>
        <StoryTest />
      </ThemeWrapper>
    ),
  ],
} as Meta;

export const Euro: Story<PocketItemProps> = () => <PocketItem pocket={initialStatePockets.EUR} />;
export const Pound: Story<PocketItemProps> = () => <PocketItem pocket={initialStatePockets.GBP} />;
export const Dollar: Story<PocketItemProps> = () => <PocketItem pocket={initialStatePockets.USD} />;
