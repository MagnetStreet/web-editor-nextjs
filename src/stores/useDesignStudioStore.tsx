import { create } from 'zustand';

import { DSColor } from '@/types/ColorDSTypes';
import DesignStudioItem from '@/types/DesignStudioItem';
import { CONTEXTUAL_MENU_OPTION } from '@/types/enum';
import View from '@/types/View';

export interface DesignStudioState {
  documentInfo?: DesignStudioItem;
  activeView?: View;
  viewBlob?: Blob;
  customColors: DSColor[];
  activeLayoutName: CONTEXTUAL_MENU_OPTION;
  setDocumentInfo: (val: DesignStudioItem) => void;
  setActiveView: (val: View) => void;
  setViewBlob: (val: Blob) => void;
  setActiveLayoutName: (newLayoutName: CONTEXTUAL_MENU_OPTION) => void;
  addCustomColor: (val: DSColor) => void;
}

export const useDesignStudioStore = create<DesignStudioState>((set) => ({
  documentInfo: undefined,
  activeView: undefined,
  viewBlob: undefined,
  customColors: [],
  activeLayoutName: CONTEXTUAL_MENU_OPTION.COLOR,
  setDocumentInfo: (val: DesignStudioItem) => set({ documentInfo: val }),
  setActiveView: (val: View) => set({ activeView: val }),
  setViewBlob: (val: Blob) => set({ viewBlob: val }),
  setActiveLayoutName: (newLayoutName: CONTEXTUAL_MENU_OPTION) =>
    set({ activeLayoutName: newLayoutName }),
  addCustomColor: (newColor: DSColor) =>
    set((state) => ({
      customColors: [...state.customColors, newColor],
    })),
}));
