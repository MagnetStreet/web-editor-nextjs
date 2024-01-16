'use client';

import useLateralContextualMenuStore, {
  LateralContextualMenuState,
} from '@/stores/useLateralContextualMenuStore';

export default function HomePage() {
  const { activeLayoutName } =
    useLateralContextualMenuStore<LateralContextualMenuState>((state) => state);

  return <div>Hello World the active layout is {activeLayoutName}</div>;
}
