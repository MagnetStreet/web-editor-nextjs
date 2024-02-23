import * as React from 'react';

import TextController from '@/components/TextController/TextController';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

const TextControllerWrapper: React.FC = () => {
  const { activeTextBox } = useGeneralControlsStore<GeneralControlsState>(
    (state) => state
  );

  return (
    <>
      {activeTextBox ? <TextController activeTextBox={activeTextBox} /> : null}
    </>
  );
};

export default TextControllerWrapper;
