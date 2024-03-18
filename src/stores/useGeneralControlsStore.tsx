import { create } from 'zustand';

import SwatchColor from '@/types/SwatchColor';
import { TextBox } from '@/types/TextBox';

export interface GeneralControlsState {
  resetCount: number;
  zoom: number | number[];
  isNextStepEnable: boolean;
  isBottomFrameOpen: boolean;
  isLoading: boolean;
  isInitialLoad: boolean;
  isIsolatedModeActive: boolean;
  bottomFrameComponent?: React.ReactNode;
  topFrameComponent?: React.ReactNode;
  activeTextBox?: TextBox;
  activeSwatchColor?: SwatchColor;
  fitImage: () => void;
  setZoom: (val: number | number[]) => void;
  setNextStepEnable: (val: boolean) => void;
  toggleBottomFrame: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;
  setInitialLoading: (val: boolean) => void;
  setIsolatedMode: (val: boolean) => void;
  setTopFrameComponent: (component: React.ReactNode) => void;
  setActiveTextBox: (val: TextBox, component?: React.ReactNode) => void;
  setActiveColorSwatch: (
    val?: SwatchColor,
    component?: React.ReactNode
  ) => void;
  updateActiveTextBox: (val: TextBox) => void;
  // Other properties and functions in your state For handling general navigations or controls
}

export const useGeneralControlsStore = create<GeneralControlsState>((set) => ({
  zoom: 50,
  resetCount: 0,
  isNextStepEnable: false,
  isBottomFrameOpen: false,
  isInitialModalOpen: true,
  isInitialLoad: true,
  isLoading: false,
  isIsolatedModeActive: false,
  toggleBottomFrame: (val: boolean) => set({ isBottomFrameOpen: val }),
  setNextStepEnable: (val: boolean) => set({ isNextStepEnable: val }),
  setZoom: (newVal: number | number[]) => set({ zoom: newVal }),
  fitImage: () => set((state) => ({ resetCount: state.resetCount + 1 })),
  setIsLoading: (val: boolean) => set({ isLoading: val }),
  setInitialLoading: (val: boolean) => set({ isInitialLoad: val }),
  setTopFrameComponent: (component: React.ReactNode) =>
    set({ topFrameComponent: component }),
  setIsolatedMode: (val: boolean) => {
    if (!val) {
      //TODO Add any Cleanup here for active elements when leaving the isolated mode
      set({
        activeTextBox: undefined,
        topFrameComponent: null,
      });
    }
    set({ isIsolatedModeActive: val });
  },
  updateActiveTextBox: (val: TextBox) => set({ activeTextBox: val }),
  setActiveTextBox: (val: TextBox, component?: React.ReactNode) =>
    set({ activeTextBox: val, topFrameComponent: component }),
  setActiveColorSwatch: (val?: SwatchColor, component?: React.ReactNode) =>
    set({ activeSwatchColor: val, topFrameComponent: component }),
}));
