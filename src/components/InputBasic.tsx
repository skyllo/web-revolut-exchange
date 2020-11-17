/* eslint-disable react/jsx-props-no-spreading */
import { styled } from '../Theme';

export type InputBasicProps = React.ComponentPropsWithRef<'input'>;

export const InputBasic = styled.input<InputBasicProps>`
  background-color: transparent;
  color: inherit;
  caret-color: ${({ theme }) => theme.colors.primaryColor};
  font-size: ${({ theme }) => theme.fonts.fontSizeExtraLarge};
  overflow: hidden;
  width: 100%;
  border: 0;
  padding: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.light1Color};
  }

  &:focus {
    outline: none;
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:invalid {
    box-shadow: none;
  }
`;
