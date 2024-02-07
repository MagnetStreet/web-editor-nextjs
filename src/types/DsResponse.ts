import Discounts from '@/types/Discounts';
import DocumentListItem from '@/types/DocumentListItem';

export default interface DSResponse {
  gmaps_apiKey_listBuilder?: string;
  isEmpty: boolean;
  originalProductIds: number[];
  productsThatHaveAlternativesInDS: string[];
  status: string;
  userSignIn: boolean;
  discounts: Discounts[];
  documentList: DocumentListItem[];
}
