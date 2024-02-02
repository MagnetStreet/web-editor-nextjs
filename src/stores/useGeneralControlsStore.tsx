import { create } from 'zustand';

import { EditorView } from '@/types';

export interface GeneralControlsState {
  zoom: number | number[];
  views: EditorView[];
  openView: EditorView;
  isNextStepEnable: boolean;
  isBottomFrameOpen: boolean;
  isBottomDrawerOpen: boolean;
  isLoading: boolean;
  isInitialLoad: boolean;
  setZoom: (val: number | number[]) => void;
  setOpenView: (val: EditorView) => void;
  setNextStepEnable: (val: boolean) => void;
  toggleBottomFrame: (val: boolean) => void;
  toggleBottomDrawer: (val: boolean) => void;
  setLoading: (val: boolean) => void;
  setInitialLoading: (val: boolean) => void;
  // Other properties and functions in your state For handling general navigations or controls
}

export const useGeneralControlsStore = create<GeneralControlsState>((set) => ({
  zoom: 50,
  isBottomDrawerOpen: false,
  isNextStepEnable: false,
  isBottomFrameOpen: false,
  isInitialModalOpen: true,
  isInitialLoad: true,
  isLoading: false,

  openView: {
    id: 0,
    displayName: 'Front',
    tumbnailSrc: '/images/sample_small.png',
    src: '/images/sample_small.png',
  }, //Todo we need a initializer
  views: [
    {
      id: 0,
      displayName: 'Front',
      tumbnailSrc: '/images/sample_small.png',
      src: '/images/sample_small.png',
    },
    {
      id: 1,
      displayName: 'Back',
      tumbnailSrc: '/images/sample_small.png',
      src: '/images/sample_small.png',
    },
    {
      id: 2,
      displayName: 'View 1',
      tumbnailSrc: '/images/sample_small.png',
      src: '/images/sample_small.png',
    },
    {
      id: 3,
      displayName: 'View 2',
      tumbnailSrc: '/images/sample_small.png',
      src: '/images/sample_small.png',
    },
  ],
  setOpenView: (val: EditorView) => set({ openView: val }),
  toggleBottomDrawer: (val: boolean) => set({ isBottomDrawerOpen: val }),
  toggleBottomFrame: (val: boolean) => set({ isBottomFrameOpen: val }),
  setNextStepEnable: (val: boolean) => set({ isNextStepEnable: val }),
  setZoom: (newVal: number | number[]) => set({ zoom: newVal }),
  setLoading: (val: boolean) => set({ isLoading: val }),
  setInitialLoading: (val: boolean) => set({ isInitialLoad: val }),
}));
