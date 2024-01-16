'use client';

import { ChangesController } from '@/components/shared/ChangesController/ChangesController';

import useLateralContextualMenuStore, {
  LateralContextualMenuState,
} from '@/stores/useLateralContextualMenuStore';

export default function HomePage() {
  const { activeLayoutName } =
    useLateralContextualMenuStore<LateralContextualMenuState>((state) => state);

  return (
    <div>
      Hello World the active layout is {activeLayoutName}
      <ChangesController />
    </div>
  );
}
