'use client';
import useSideMenuStore, { SideMenuState } from '@/stores/useSideMenuStore';

export default function HomePage() {
  const { activeLayoutName, setActiveLayoutName } =
    useSideMenuStore<SideMenuState>((state) => ({
      activeLayoutName: state.activeLayoutName,
      setActiveLayoutName: state.setActiveLayoutName,
    }));

  return <main>Hello World the active layout is {activeLayoutName}</main>;
}
