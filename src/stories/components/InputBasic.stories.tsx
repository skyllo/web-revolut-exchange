import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeWrapper } from '../../ThemeWrapper';
import { InputBasic, InputBasicProps } from '../../components/InputBasic';

export default {
  title: 'Components/InputBasic',
  component: InputBasic,
  decorators: [
    (StoryTest) => (
      <ThemeWrapper>
        <StoryTest />
      </ThemeWrapper>
    ),
  ],
} as Meta;

export const Default: Story<InputBasicProps> = () => <InputBasic placeholder="placeholder" />;
