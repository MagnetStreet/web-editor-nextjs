import { useEffect } from 'react';

import ColorListSelector from '@/components/ColorController/ColorsListSelector';
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
import { CONTEXTUAL_MENU_OPTION } from '@/types/enum';

const LateralContextualMenuWrapper = () => {
  const { activeLayoutName, setActiveLayoutName } =
    useDesignStudioStore<DesignStudioState>((state) => state);
  const { isIsolatedModeActive, setTopFrameComponent } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);

  const items: Array<IconObj> = [
    {
      name: CONTEXTUAL_MENU_OPTION.LAYOUT,
      icon: <i className='fa-grid-2-sharp-light'></i>,
    },
    {
      name: CONTEXTUAL_MENU_OPTION.COLOR,
      icon: <i className='fa-palette-light'></i>,
    },
    {
      name: CONTEXTUAL_MENU_OPTION.TEXT,
      icon: <i className='fa-case-normal'></i>,
    },
    {
      name: CONTEXTUAL_MENU_OPTION.SHAPE,
      icon: <i className='fa-objects-column-light'></i>,
    },
    {
      name: CONTEXTUAL_MENU_OPTION.ELEMENTS,
      icon: <i className='fa-shapes-sharp-light'></i>,
    },
    {
      name: CONTEXTUAL_MENU_OPTION.IMAGES,
      icon: <i className='fa-image-sharp-light'></i>,
    },
  ];

  useEffect(() => {
    handleChange(activeLayoutName);
  }, []);

  const handleChange = (name: CONTEXTUAL_MENU_OPTION) => {
    setActiveLayoutName(name);
    switch (name) {
      case CONTEXTUAL_MENU_OPTION.COLOR:
        setTopFrameComponent(<ColorListSelector />);
        break;
      case CONTEXTUAL_MENU_OPTION.TEXT:
        setTopFrameComponent(null);
        break;
      default:
        setTopFrameComponent(null);
    }

    // TODO maybe add a react component set up when changing the setActiveLayoutName
    // TODO add on Items a React componet to be set
    // TODO Only if the components on the list are not rendered until set on the top component
  };

  return (
    <LateralContextualMenu
      items={items}
      isIsolatedModeActive={isIsolatedModeActive}
      activeLayoutName={activeLayoutName}
      setActiveLayoutName={handleChange}
    />
  );
};

export default LateralContextualMenuWrapper;
