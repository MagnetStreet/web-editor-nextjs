import { PointCoordinates } from '@/types';

export const getScaledCoordinates = (
  coordinates: PointCoordinates[],
  scale: number
): PointCoordinates[] => {
  return coordinates.map((coord) => ({
    x: coord.x * scale,
    y: coord.y * scale,
  }));
};
