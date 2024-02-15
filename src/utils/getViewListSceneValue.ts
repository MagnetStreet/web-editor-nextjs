import DocumentListItem from '@/types/DocumentListItem';
import ProductViewSet from '@/types/ProductViewSet';

export const getViewListSceneValue = (data: DocumentListItem[]): string => {
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
