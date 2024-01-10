import { create } from 'zustand';

export interface SideMenuState {
  activeLayoutName: string;
  setActiveLayoutName: (name: string) => void;
  // Other properties and functions in your state
}

const useSideMenuStore = create<SideMenuState>((set) => ({
  activeLayoutName: 'Layout',

  setActiveLayoutName: (newLayoutName: string) =>
    set({ activeLayoutName: newLayoutName }),
}));

export default useSideMenuStore;
