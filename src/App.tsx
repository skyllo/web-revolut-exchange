import React, { useState } from 'react';
import { ExchangeContainer } from './pages/Exchange';
import { PocketSelectorContainer } from './pages/PocketSelector';
import { styled } from './Theme';
import { InputDirection } from './types';

const AppStyled = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
`;

const AppOverlayStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

function App() {
  const [overlayIsOpen, setOverlayIsOpen] = useState(false);
  const [overlayDirection, setOverlayDirection] = useState<InputDirection>('from');

  function openOverlay(inputDirection: InputDirection) {
    // tells the pocket selector overlay which direction was clicked
    setOverlayDirection(inputDirection);
    setOverlayIsOpen(true);
  }

  function closeOverlay() {
    setOverlayIsOpen(false);
  }

  return (
    <AppStyled>
      <ExchangeContainer onClick={openOverlay} />
      {overlayIsOpen && (
        <AppOverlayStyled>
          <PocketSelectorContainer inputDirection={overlayDirection} onClose={closeOverlay} />
        </AppOverlayStyled>
      )}
    </AppStyled>
  );
}

export default App;
