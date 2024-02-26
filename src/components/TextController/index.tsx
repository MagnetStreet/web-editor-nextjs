import * as React from 'react';

import TextController from '@/components/TextController/TextController';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

import { TextBox } from '@/types/TextBox';

const TextControllerWrapper: React.FC = () => {
  const { activeTextBox, setIsolatedMode, setActiveTextBox } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);

  const handleSaveClick = () => {
    //TODO Implement Back and Apply logic
    setIsolatedMode(false);
  };
  const handleBackClick = () => {
    //TODO Implement Back and Apply logic
    setIsolatedMode(false);
  };
  const handleUpdate = (updated: TextBox) => {
    setActiveTextBox(updated);
  };

  return (
    <>
      {activeTextBox ? (
        <TextController
          activeTextBox={activeTextBox}
          handleSave={handleSaveClick}
          handleBack={handleBackClick}
          handleUpdate={handleUpdate}
        />
      ) : null}
    </>
  );
};

export default TextControllerWrapper;
