import { create } from 'zustand';

import DesignStudioItem from '@/types/DesignStudioItem';
import View from '@/types/View';

export interface DesignStudioState {
  documentInfo?: DesignStudioItem;
  activeView?: View;
  viewBlob?: Blob;
  activeLayoutName: string;
  setDocumentInfo: (val: DesignStudioItem) => void;
  setActiveView: (val: View) => void;
  setViewBlob: (val: Blob) => void;
  setActiveLayoutName: (newLayoutName: string) => void;
}

export const useDesignStudioStore = create<DesignStudioState>((set) => ({
  documentInfo: undefined,
  activeView: undefined,
  viewBlob: undefined,
  activeLayoutName: 'Layout',
  setDocumentInfo: (val: DesignStudioItem) => set({ documentInfo: val }),
  setActiveView: (val: View) => set({ activeView: val }),
  setViewBlob: (val: Blob) => set({ viewBlob: val }),
  setActiveLayoutName: (newLayoutName: string) =>
    set({ activeLayoutName: newLayoutName }),
}));
