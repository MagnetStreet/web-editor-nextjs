import { create } from 'zustand';

export interface GeneralControlsState {
  zoom: number | number[];
  isNextStepEnable: boolean;
  isBottomFrameOpen: boolean;
  isLoading: boolean;
  isInitialLoad: boolean;
  bottomFrameComponent?: React.ReactNode;
  setZoom: (val: number | number[]) => void;
  setNextStepEnable: (val: boolean) => void;
  toggleBottomFrame: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;
  setInitialLoading: (val: boolean) => void;
  // Other properties and functions in your state For handling general navigations or controls
}

export const useGeneralControlsStore = create<GeneralControlsState>((set) => ({
  zoom: 50,
  isNextStepEnable: false,
  isBottomFrameOpen: false,
  isInitialModalOpen: true,
  isInitialLoad: true,
  isLoading: false,
  toggleBottomFrame: (val: boolean) => set({ isBottomFrameOpen: val }),
  setNextStepEnable: (val: boolean) => set({ isNextStepEnable: val }),
  setZoom: (newVal: number | number[]) => set({ zoom: newVal }),
  setIsLoading: (val: boolean) => set({ isLoading: val }),
  setInitialLoading: (val: boolean) => set({ isInitialLoad: val }),
}));
