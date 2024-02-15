import Discounts from '@/types/Discounts';
import { VisitorImprint } from '@/types/VisitorImprints';

export interface VisitorInfo {
  visitorImprints?: VisitorImprint;
  currentDiscounts?: Discounts[];
}
