import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Button } from './Button';
import { darkTheme, styled } from '../Theme';
import { ThemeContext } from '../ThemeWrapper';

const StyledThemeButton = styled(Button)`
  outline: 0;
`;

export interface ThemeButtonProps {
  className?: string;
}

export const ThemeButton = (props: ThemeButtonProps) => {
  const { className = '' } = props;
  const { toggleTheme, theme } = useContext(ThemeContext);
  const [icon, setIcon] = useState<IconDefinition>(faToggleOff);

  useEffect(() => {
    const newIcon = theme === darkTheme ? faToggleOn : faToggleOff;
    setIcon(newIcon);
  }, [setIcon, theme]);

  return (
    <StyledThemeButton type="button" onClick={toggleTheme} className={className} secondary>
      <FontAwesomeIcon icon={icon} />
    </StyledThemeButton>
  );
};
