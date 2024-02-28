import { create } from 'zustand';

import DesignStudioItem from '@/types/DesignStudioItem';
import { CONTEXTUAL_MENU_OPTION } from '@/types/enum';
import View from '@/types/View';

export interface DesignStudioState {
  documentInfo?: DesignStudioItem;
  activeView?: View;
  viewBlob?: Blob;
  activeLayoutName: CONTEXTUAL_MENU_OPTION;
  setDocumentInfo: (val: DesignStudioItem) => void;
  setActiveView: (val: View) => void;
  setViewBlob: (val: Blob) => void;
  setActiveLayoutName: (newLayoutName: CONTEXTUAL_MENU_OPTION) => void;
}

export const useDesignStudioStore = create<DesignStudioState>((set) => ({
  documentInfo: undefined,
  activeView: undefined,
  viewBlob: undefined,
  activeLayoutName: CONTEXTUAL_MENU_OPTION.COLOR,
  setDocumentInfo: (val: DesignStudioItem) => set({ documentInfo: val }),
  setActiveView: (val: View) => set({ activeView: val }),
  setViewBlob: (val: Blob) => set({ viewBlob: val }),
  setActiveLayoutName: (newLayoutName: CONTEXTUAL_MENU_OPTION) =>
    set({ activeLayoutName: newLayoutName }),
}));
