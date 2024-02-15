import { create } from 'zustand';

export interface BottomDrawerState {
  bottomDrawerTitle: string;
  isBottomDrawerOpen: boolean;
  bottomDrawerComponent?: React.ReactNode;
  setBottomDrawerTitle: (component: string) => void;
  setBottomDrawerComponent: (component: React.ReactNode) => void;
  toggleBottomDrawer: (val: boolean) => void;
  // Other properties and functions in your state For handling general navigations or controls
}

export const useBottomDrawerStore = create<BottomDrawerState>((set) => ({
  bottomDrawerTitle: '',
  isBottomDrawerOpen: false,
  bottomDrawerComponent: undefined,
  toggleBottomDrawer: (val: boolean) => {
    set({ isBottomDrawerOpen: val });
    if (!val) {
      set({
        bottomDrawerComponent: undefined,
        bottomDrawerTitle: '',
      });
    }
  },
  setBottomDrawerTitle: (title: string) => set({ bottomDrawerTitle: title }),
  setBottomDrawerComponent: (component: React.ReactNode) =>
    set({ bottomDrawerComponent: component }),
}));
