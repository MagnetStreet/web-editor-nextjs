import { create } from 'zustand';

export interface GeneralControlsState {
  zoom: number;
  isNextStepEnable: boolean;
  setZoom: (val: number) => void;
  setNextStepEnable: (val: boolean) => void;
  // Other properties and functions in your state For handling general navigations or controls
}

const useGeneralControlsStore = create<GeneralControlsState>((set) => ({
  zoom: 100,
  isNextStepEnable: false,
  setNextStepEnable: (val: boolean) => set({ isNextStepEnable: val }),
  setZoom: (newVal: number) => set({ zoom: newVal }),
}));

export default useGeneralControlsStore;
