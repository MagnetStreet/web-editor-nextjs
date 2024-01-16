import { create } from 'zustand';

export interface LateralContextualMenuState {
  activeLayoutName: string;
  setActiveLayoutName: (name: string) => void;
  // Other properties and functions in your state
}

const useLateralContextualMenuStore = create<LateralContextualMenuState>(
  (set) => ({
    activeLayoutName: 'Layout',
    setActiveLayoutName: (newLayoutName: string) =>
      set({ activeLayoutName: newLayoutName }),
  })
);

export default useLateralContextualMenuStore;
