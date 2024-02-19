import Discounts from '@/types/Discounts';
import DSItemJSON from '@/types/DSItemJSON';

export default interface ProductInformation {
  gmaps_apiKey_listBuilder?: string;
  isEmpty: boolean;
  message: string;
  originalProductIds: number[];
  productEnsembleTitle?: string;
  productsThatHaveAlternativesInDS: string[];
  title: string;
  status: string;
  userSignIn: boolean;
  discounts: Discounts[];
  discountForDisplayCode?: string;
  documentList: DSItemJSON[];
  showImprintForm: boolean;
}
