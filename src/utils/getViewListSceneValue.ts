import DSItemJSON from '@/types/DSItemJSON';
import ProductViewSet from '@/types/ProductViewSet';

export const getViewListSceneValue = (data: DSItemJSON[]): string => {
  const { productViewSet } = data[0];
  return productViewSet.reduce(
    (acc: string, item: ProductViewSet, index: number) => {
      acc += item.scene;
      if (index !== productViewSet.length - 1) {
        acc += ',';
      }
      return acc;
    },
    ''
  );
};
