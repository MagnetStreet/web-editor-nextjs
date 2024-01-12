'use client';

import useSideMenuStore, { SideMenuState } from '@/stores/useSideMenuStore';

export default function HomePage() {
  const { activeLayoutName } = useSideMenuStore<SideMenuState>(
    (state) => state
  );

  return <main>Hello World the active layout is {activeLayoutName}</main>;
}
