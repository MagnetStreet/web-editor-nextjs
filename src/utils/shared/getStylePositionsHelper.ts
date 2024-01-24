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
          top: coordinates.top ? coordinates.top : 'inherit',
          left: coordinates.left ? coordinates.left : 'inherit',
          right: coordinates.right ? coordinates.right : 'inherit',
          bottom: coordinates.bottom ? coordinates.bottom : 'inherit',
        }
      : undefined),
  };
};
