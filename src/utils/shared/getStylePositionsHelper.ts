import { Coordinates } from '@/types';

export const getStylePositionsHelper = (
  position?: string,
  coordinates?: Coordinates
) => {
  return {
    position,
    ...(position === 'absolute' && coordinates
      ? {
          top: coordinates.top,
          left: coordinates.left,
          right: coordinates.right,
          bottom: coordinates.bottom,
        }
      : {}),
  };
};
