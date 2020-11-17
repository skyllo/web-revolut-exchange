import React, { ChangeEvent, useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ConnectedProps } from 'react-redux';
import { Header } from '../components/Header';
import { PocketItem } from '../components/PocketItem';
import { InputBasic } from '../components/InputBasic';
import { styled } from '../Theme';
import { InputDirection, Pocket } from '../types';
import { IconButton } from '../components/IconButton';
import { pocketSelectorConnector } from '../connectors/PocketSelectorConnector';

const StyledPocketSelector = styled.div`
  display: grid;
  grid-template-rows: max-content 1fr 0px 1fr max-content;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  color: ${({ theme }) => theme.colors.foregroundColor};
  width: 100%;
  height: 100%;
`;

const StyledHeaderInner = styled.span`
  display: flex;
  flex-direction: row;

  > button {
    margin-right: 20px;
  }
`;

const StyledPockets = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

type PocketSelectorPropsExtra = {
  inputDirection: InputDirection;
  onClose?: () => void;
};

export type PocketSelectorProps = ConnectedProps<typeof pocketSelectorConnector> &
  PocketSelectorPropsExtra;

export const PocketSelector = (props: PocketSelectorProps) => {
  const { pockets, setFromPocket, setToPocket, inputDirection, onClose } = props;
  const [searchTerm, setSearchTerm] = useState('');

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function onCloseWrapper() {
    if (onClose) onClose();
  }

  function onPocketItemClick(pocket: Pocket) {
    // swap or switch to a new pocket when selected
    if (inputDirection === 'from') {
      setFromPocket(pocket);
    } else {
      setToPocket(pocket);
    }
    onCloseWrapper();
  }

  return (
    <StyledPocketSelector>
      <Header>
        <StyledHeaderInner>
          <IconButton icon={faArrowLeft} onClick={onCloseWrapper} />
          <InputBasic onChange={onChange} />
        </StyledHeaderInner>
      </Header>
      <StyledPockets>
        {Object.values(pockets)
          .filter(({ name, title }) => {
            // filter pockets based on title or name
            const includesName = name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
            const includesTitle = title
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase());
            return includesName || includesTitle;
          })
          .map((pocket) => (
            <PocketItem key={pocket.name} pocket={pocket} onClick={onPocketItemClick} />
          ))}
      </StyledPockets>
    </StyledPocketSelector>
  );
};

export const PocketSelectorContainer = pocketSelectorConnector(PocketSelector);
