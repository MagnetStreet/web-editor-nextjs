import { create } from 'zustand';

import { EditorView } from '@/types';

export interface GeneralControlsState {
  zoom: number;
  views: EditorView[];
  openView: EditorView;
  isNextStepEnable: boolean;
  setOpenView: (val: EditorView) => void;
  setZoom: (val: number) => void;
  setNextStepEnable: (val: boolean) => void;
  // Other properties and functions in your state For handling general navigations or controls
}

export const useGeneralControlsStore = create<GeneralControlsState>((set) => ({
  zoom: 100,
  isNextStepEnable: false,
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
  setNextStepEnable: (val: boolean) => set({ isNextStepEnable: val }),
  setZoom: (newVal: number) => set({ zoom: newVal }),
}));
