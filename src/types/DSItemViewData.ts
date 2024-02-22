import { PointCoordinates } from '@/types';

export default interface DSItemViewData {
  viewBounds: PointCoordinates[];
  documentCenterPoint: PointCoordinates;
  perspectiveTransformRotationAngle: number;
  name: string;
  unclippedViewBounds: PointCoordinates[];
  page: number;
  place: number;
  centerPoint: PointCoordinates;
}
