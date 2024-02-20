import DSItemViewData from '@/types/DSItemViewData';

export default interface View {
  viewData: DSItemViewData[];
  sceneName: string;
  sceneCanvasWidth: number;
  sceneCanvasHeight: number;
}
