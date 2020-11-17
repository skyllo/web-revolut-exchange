import { rgba } from 'polished';
import { css } from 'styled-components/macro';
import { styled } from '../Theme';

interface ButtonPropsExtra {
  secondary?: boolean;
}

export type ButtonProps = React.ComponentPropsWithRef<'button'> & ButtonPropsExtra;

export const Button = styled.button<ButtonProps>`
  width: fit-content;
  height: fit-content;
  white-space: nowrap;
  border-radius: 1em;
  border: none;
  box-shadow: 0px 2px 2px ${({ theme }) => rgba(theme.colors.primaryColor, 0.2)};
  background-color: ${({ theme }) => theme.colors.primaryColor};
  font-size: ${({ theme }) => theme.fonts.fontSizeMedium};
  font-weight: ${({ theme }) => theme.fonts.fontWeightBold};
  color: white;
  padding: 14px;
  line-height: 1em;
  cursor: pointer;

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  &:hover {
    filter: brightness(120%);
  }

  ${({ secondary }) =>
    secondary &&
    css`
      box-shadow: none;
      border: 2px solid ${({ theme }) => theme.colors.secondaryColor};
      background-color: ${({ theme }) => theme.colors.backgroundColor};
      font-size: ${({ theme }) => theme.fonts.fontSizeLarge};
      font-weight: ${({ theme }) => theme.fonts.fontWeightThin};
      color: ${({ theme }) => theme.colors.primaryColor};
      padding: 6px;
    `}
`;
