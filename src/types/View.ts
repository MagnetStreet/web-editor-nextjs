interface PointCoordinates {
  x: number;
  y: number;
}

export default interface View {
  viewData: {
    viewBounds: PointCoordinates[];
    documentCenterPoint: PointCoordinates;
    perspectiveTransformRotationAngle: number;
    name: string;
    unclippedViewBounds: PointCoordinates[];
    page: number;
    place: number;
    centerPoint: PointCoordinates;
  }[];
  sceneName: string;
  sceneCanvasWidth: number;
  sceneCanvasHeight: number;
}
