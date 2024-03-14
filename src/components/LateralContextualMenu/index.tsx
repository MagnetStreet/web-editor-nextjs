import { useEffect } from 'react';

import useScreenSize from '@/hooks/useScreenSize';

import SwatchListSelector from '@/components/ColorController/SwatchListSelector';
import LateralContextualMenu from '@/components/LateralContextualMenu/LateralContextualMenu';

import {
  BottomDrawerState,
  useBottomDrawerStore,
} from '@/stores/useBottomDrawerStore';
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
  const { isDesktop } = useScreenSize();
  const { activeLayoutName, setActiveLayoutName } =
    useDesignStudioStore<DesignStudioState>((state) => state);
  const { isIsolatedModeActive, setTopFrameComponent } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);
  const { setBottomDrawerComponent, toggleBottomDrawer, setBottomDrawerTitle } =
    useBottomDrawerStore<BottomDrawerState>((state) => state);
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

  useEffect(() => {
    if (!isDesktop) {
      toggleBottomDrawer(false);
    }
  }, [isDesktop]);

  const handleChange = (name: CONTEXTUAL_MENU_OPTION) => {
    setActiveLayoutName(name);
    switch (name) {
      case CONTEXTUAL_MENU_OPTION.COLOR:
        if (!isDesktop) {
          setBottomDrawerTitle('Color Options');
          setBottomDrawerComponent(<SwatchListSelector />);
          toggleBottomDrawer(true);
        } else {
          setTopFrameComponent(<SwatchListSelector />);
        }
        break;
      case CONTEXTUAL_MENU_OPTION.TEXT:
        setTopFrameComponent(null);
        break;
      default:
        setTopFrameComponent(null);
    }
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
