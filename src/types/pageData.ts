import ProductInformation from '@/types/ProductInformation';
import { VisitorInfo } from '@/types/VisitorInfo';

export interface EditorPageServerData {
  productInfo: ProductInformation;
  visitorInfo: VisitorInfo;
}
