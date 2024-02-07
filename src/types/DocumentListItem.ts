import { Attribute } from '@/types/Attribute';
import ProductViewSet from '@/types/ProductViewSet';
import SubState from '@/types/Substate';

export default interface DocumentListItem {
  isSample: boolean;
  isWrapper: boolean;
  productSize: string;
  userDesignNotes: string;
  collectionTypeCategoryId: string;
  productAnimatedViewSet: any[]; //TODO Type should be defined or any if it can be anything
  focus: boolean;
  variationAttribute: any; //TODO Type should be defined or any if it can be anything
  isShippingService: boolean;
  productName: string;
  responsiveIceUrl: string;
  mailWithoutEnvelope: boolean;
  substrateAttribute: SubState;
  productViewSet: ProductViewSet[];
  previewSmallImageURL: string;
  product3DPattern: string;
  productDSViewSet: ProductViewSet[];
  unitPrice: number;
  isParent: boolean;
  productId: number;
  productImprintData: string;
  iceUrl: string;
  designFamilyCategoryId: number;
  discountedUnitPrice: number;
  canHaveShippingService: boolean;
  productStylecode: string;
  typeId: number;
  productPrice: number;
  canHaveMailingList: boolean;
  itemType: string;
  productColorArray: string;
  marketId: number;
  discountPercentage: number;
  productWebDescription: string;
  productSubstrateId: string;
  previewBackSmallImageURL: string;
  isLetterpress: boolean;
  quantity: number;
  selectedAttributes: SubState[];
  itemsPerBox: number;
  orderItemId: string;
  sessionId: string;
  availableAttributes: {
    other: Attribute[];
    substrates: SubState[];
    varnish: any[]; //TODO Type should be defined or any if it can be anything
    foil: SubState[];
  };
  threeDModelDescriptor: string;
  parentId: number;
  typeCode: string;
  previewImageURL: string;
  templateStylecode: string;
  documentId: string;
  exclusiveDiscountProduct: boolean;
  colorPalette: string;
  allowImprints: boolean;
}
