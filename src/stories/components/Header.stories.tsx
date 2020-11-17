import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Header, HeaderProps } from '../../components/Header';
import { ThemeWrapper } from '../../ThemeWrapper';
import { InputBasic } from '../../components/InputBasic';

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (StoryTest) => (
      <ThemeWrapper>
        <StoryTest />
      </ThemeWrapper>
    ),
  ],
} as Meta;

export const Text: Story<HeaderProps> = () => (
  <Header>
    <h1>Example Text</h1>
  </Header>
);

export const TextWithInput: Story<HeaderProps> = () => (
  <Header>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        gridGap: '20px',
      }}
    >
      <h1>Input</h1>
      <InputBasic />
    </div>
  </Header>
);
