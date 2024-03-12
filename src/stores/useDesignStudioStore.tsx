import { create } from 'zustand';

import { DSColor } from '@/types/ColorDSTypes';
import DesignStudioItem from '@/types/DesignStudioItem';
import { CONTEXTUAL_MENU_OPTION } from '@/types/enum';
import ProductInformation from '@/types/ProductInformation';
import SessionInfomation from '@/types/SessionInfomation';
import View from '@/types/View';

export interface DesignStudioState {
  documentInfo?: DesignStudioItem;
  documentId: string;
  sessionId: string;
  templateId: string;
  activeView?: View;
  viewBlob?: Blob;
  visitorInfo?: any;
  sessionInformation?: SessionInfomation;
  productInfo?: ProductInformation;
  customColors: DSColor[];
  activeLayoutName: CONTEXTUAL_MENU_OPTION;
  setDocumentId: (val: string) => void;
  setSessionId: (val: string) => void;
  setTemplateId: (val: string) => void;
  setDocumentInfo: (val: DesignStudioItem) => void;
  setActiveView: (val: View) => void;
  setViewBlob: (val: Blob) => void;
  setProductInfo: (val: ProductInformation) => void;
  setSessionInfo: (val: SessionInfomation) => void;
  setVisitorInfo: (val: any) => void;
  setActiveLayoutName: (newLayoutName: CONTEXTUAL_MENU_OPTION) => void;
  addCustomColor: (val: DSColor) => void;
}

export const useDesignStudioStore = create<DesignStudioState>((set) => ({
  documentInfo: undefined,
  activeView: undefined,
  viewBlob: undefined,
  customColors: [],
  documentId: '',
  sessionId: '',
  templateId: '',
  activeLayoutName: CONTEXTUAL_MENU_OPTION.COLOR,
  setDocumentId: (val: string) => set({ documentId: val }),
  setSessionId: (val: string) => set({ sessionId: val }),
  setTemplateId: (val: string) => set({ templateId: val }),
  setDocumentInfo: (val: DesignStudioItem) => set({ documentInfo: val }),
  setActiveView: (val: View) => set({ activeView: val }),
  setViewBlob: (val: Blob) => set({ viewBlob: val }),
  setSessionInfo: (val: SessionInfomation) => set({ sessionInformation: val }),
  setActiveLayoutName: (newLayoutName: CONTEXTUAL_MENU_OPTION) =>
    set({ activeLayoutName: newLayoutName }),
  addCustomColor: (newColor: DSColor) =>
    set((state) => ({
      customColors: [...state.customColors, newColor],
    })),
  setProductInfo: (val: ProductInformation) => set({ productInfo: val }),
  setVisitorInfo: (val: any) => set({ visitorInfo: val }),
}));
