import LateralContextualMenu from '@/components/LateralContextualMenu/LateralContextualMenu';

import {
  DesignStudioState,
  useDesignStudioStore,
} from '@/stores/useDesignStudioStore';
import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';

import { IconObj } from '@/types';

const LateralContextualMenuWrapper = () => {
  const { activeLayoutName, setActiveLayoutName } =
    useDesignStudioStore<DesignStudioState>((state) => state);
  const { isIsolatedModeActive } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);

  const items: Array<IconObj> = [
    {
      name: 'Layout',
      icon: <i className='fa-grid-2-sharp-light'></i>,
    },
    {
      name: 'Color',
      icon: <i className='fa-palette-light'></i>,
    },
    {
      name: 'Text',
      icon: <i className='fa-case-normal'></i>,
    },
    {
      name: 'Shape',
      icon: <i className='fa-objects-column-light'></i>,
    },
    {
      name: 'Elements',
      icon: <i className='fa-shapes-sharp-light'></i>,
    },
    {
      name: 'Images',
      icon: <i className='fa-image-sharp-light'></i>,
    },
  ];

  return (
    <LateralContextualMenu
      items={items}
      isIsolatedModeActive={isIsolatedModeActive}
      activeLayoutName={activeLayoutName}
      setActiveLayoutName={setActiveLayoutName}
    />
  );
};

export default LateralContextualMenuWrapper;
