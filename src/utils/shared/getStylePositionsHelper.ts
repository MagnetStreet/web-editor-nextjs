import { Coordinates } from '@/types';

export const getStylePositionsHelper = (
  position?: string,
  coordinates?: Coordinates
) => {
  if (position !== 'absolute' || !coordinates) {
    return undefined;
  }

  return {
    position,
    ...(position === 'absolute' && coordinates
      ? {
          top: coordinates.top !== undefined ? coordinates.top : 'inherit',
          left: coordinates.left !== undefined ? coordinates.left : 'inherit',
          right:
            coordinates.right !== undefined ? coordinates.right : 'inherit',
          bottom:
            coordinates.bottom !== undefined ? coordinates.bottom : 'inherit',
        }
      : undefined),
  };
};
