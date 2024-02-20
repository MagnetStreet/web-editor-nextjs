import { PointCoordinates } from '@/types';

export interface ViewData {
  viewBounds: PointCoordinates[];
  documentCenterPoint: PointCoordinates;
  perspectiveTransformRotationAngle: number;
  name: string;
  unclippedViewBounds: PointCoordinates[];
  page: number;
  place: number;
  centerPoint: PointCoordinates;
}
