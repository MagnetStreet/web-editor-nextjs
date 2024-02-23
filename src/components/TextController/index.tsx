import * as React from 'react';

import TextController from '@/components/TextController/TextController';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

const TextControllerWrapper: React.FC = () => {
  const { activeTextBox, setIsolatedMode } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);

  const handleSaveClick = () => {
    //TODO Implement Back and Apply logic
    setIsolatedMode(false);
  };
  const handleBackClick = () => {
    //TODO Implement Back and Apply logic
    setIsolatedMode(false);
  };

  return (
    <>
      {activeTextBox ? (
        <TextController
          activeTextBox={activeTextBox}
          handleSave={handleSaveClick}
          handleBack={handleBackClick}
        />
      ) : null}
    </>
  );
};

export default TextControllerWrapper;
