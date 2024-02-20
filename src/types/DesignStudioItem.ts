import DSItemJSON from '@/types/DSItemJSON';
import { DSItemViewData } from '@/types/DSItemViewData';
import View from '@/types/View';

export class DesignStudioItem implements DesignStudioItem {
  user: any; // Update with the actual type
  productId: number;
  productType: string;
  typeId: number;
  productWebDescription: string;
  typeCode: string;
  productSize: string;
  productStylecode: string;
  collectionTypeCategoryId: string;
  designFamilyCategoryId: number;
  productDSViewSet: any[]; // Update with the actual type
  productViewSet: any[]; // Update with the actual type
  productAnimatedViewSet: any[]; // Update with the actual type
  colorPalette: any; // Update with the actual type
  originalColors: any[]; // Update with the actual type
  itemType: string;
  templateStylecode: string;
  sessionId: string;
  documentId: string;
  previewImageURL: string;
  previewSmallImageURL: string;
  previewBackSmallImageURL: string;
  iceUrl: string;
  responsiveIceUrl: string;
  imprintData: any; // Update with the actual type
  userDesignNotes: string;
  isModified: boolean;
  isViewed: boolean;
  quantity: number;
  originalQuantity: number;
  itemsPerBox: number;
  substrateId: string;
  parentId: number | null;
  isParent: boolean;
  unitPrice: number;
  discountPercentage: number;
  discountedUnitPrice: number;
  price: number;
  orderItemId: string;
  itemErrors: any; // Update with the actual type
  isShippingService: boolean;
  canHaveShippingService: boolean;
  canHaveMailingList: boolean;
  groupId: number;
  approved: boolean;
  mailWithoutEnvelope: boolean;
  extraShippedQuantity: number;
  selectedAttributes: any; // Update with the actual type
  availableAttributes: any; // Update with the actual type
  substrateAttribute: any; // Update with the actual type
  compositeEnvelopes?: any[]; // Update with the actual type
  envelopeAttribute: any; // Update with the actual type
  inkColorAttribute: any; // Update with the actual type
  topLevelItem: boolean;
  originalTemplateStylecode: string;
  productRequiredWithTypeIds?: string[]; // Update with the actual type
  productNotAllowedWithTypeIds?: string[]; // Update with the actual type
  isMultidocument: boolean;
  isSample: boolean;
  mailingServiceKey: string | null;
  mailingListInfo: any; // Update with the actual type
  selectedMailingListServiceKey: string | null;
  selectedMailingListIds: string | null;
  selectedMailingLists: any[]; // Update with the actual type
  viewDimensions: any[]; // Update with the actual type
  views: View[];
  proofingViews: any[]; // Update with the actual type
  isSaved: boolean;
  proofImageGenerated: boolean;
  useLocalStorage: boolean;
  IDSObject: any; // Update with the actual type
  templateVariations: any[]; // Update with the actual type
  selectedVariation: any; // Update with the actual type
  colorSwatches: any[]; // Update with the actual type
  textBoxes: any[]; // Update with the actual type
  imageBoxes: any[]; // Update with the actual type
  trackUneditedElements: boolean;
  isWorking: boolean;
  isInitialized: boolean;
  canBeRemoved: boolean;
  getDocumentCallCount: number;
  imageBoxesToMerge: any[]; // Update with the actual type
  updatedBaselineJSON: any; // Update with the actual type
  applyingImprints: boolean;
  generatingAnimatedImage: boolean;
  generateAnimatedImage: boolean;
  waitingCount: number;
  generateWaitingCount: number;

  constructor(user: any, dsItemJSON: DSItemJSON, useLocalStorage?: boolean) {
    this.user = user;
    this.productId = dsItemJSON.productId;
    this.productType = dsItemJSON.productName;
    this.typeId = dsItemJSON.typeId;
    this.productWebDescription = dsItemJSON.productWebDescription;
    this.typeCode = dsItemJSON.typeCode;
    this.productSize = dsItemJSON.productSize;
    this.productStylecode = dsItemJSON.productStylecode;
    this.collectionTypeCategoryId = dsItemJSON.collectionTypeCategoryId;
    this.designFamilyCategoryId = dsItemJSON.designFamilyCategoryId;
    this.productDSViewSet = dsItemJSON.productDSViewSet;
    this.productViewSet = dsItemJSON.productViewSet;
    this.productAnimatedViewSet = dsItemJSON.productAnimatedViewSet;
    this.colorPalette = dsItemJSON.colorPalette;
    this.originalColors =
      (dsItemJSON.originalColors && dsItemJSON.originalColors.colors) || [];
    this.itemType = dsItemJSON.itemType;
    this.templateStylecode = dsItemJSON.templateStylecode;
    this.sessionId = dsItemJSON.sessionId || user.sessionId;
    this.documentId = dsItemJSON.documentId;
    this.previewImageURL = dsItemJSON.previewImageURL;
    this.previewSmallImageURL = dsItemJSON.previewSmallImageURL;
    this.previewBackSmallImageURL = dsItemJSON.previewBackSmallImageURL;
    this.iceUrl = dsItemJSON.iceUrl;
    this.responsiveIceUrl = dsItemJSON.responsiveIceUrl;
    this.imprintData = dsItemJSON.productImprintData;
    this.userDesignNotes = dsItemJSON.userDesignNotes;
    this.isModified =
      dsItemJSON.itemType.toUpperCase() === 'IMPRINT' &&
      dsItemJSON.productImprintData
        ? true
        : false;
    this.isViewed = dsItemJSON.viewed || false;
    this.quantity = dsItemJSON.quantity;
    this.originalQuantity = this.quantity;
    this.itemsPerBox = dsItemJSON.itemsPerBox;
    this.substrateId = dsItemJSON.productSubstrateId;
    this.parentId =
      dsItemJSON.parentId !== dsItemJSON.productId ? dsItemJSON.parentId : null;
    this.isParent = dsItemJSON.isParent || false;
    this.unitPrice = dsItemJSON.unitPrice;
    this.discountPercentage = dsItemJSON.discountPercentage || 0;
    this.discountedUnitPrice = dsItemJSON.discountedUnitPrice;
    this.price = dsItemJSON.productPrice;
    this.orderItemId = dsItemJSON.orderItemId;
    this.itemErrors = dsItemJSON.itemErrors;
    this.isShippingService = dsItemJSON.isShippingService || false;
    this.canHaveShippingService = dsItemJSON.canHaveShippingService || false;
    this.canHaveMailingList = dsItemJSON.canHaveMailingList || false;
    this.approved =
      dsItemJSON.approved || dsItemJSON.userApprovalInitials == 'yes' || false;
    this.mailWithoutEnvelope = dsItemJSON.mailWithoutEnvelope || false;
    this.extraShippedQuantity = dsItemJSON.extraShippedQuantity || 0;
    this.selectedAttributes = dsItemJSON.selectedAttributes;
    this.availableAttributes = dsItemJSON.availableAttributes;
    this.substrateAttribute = dsItemJSON.substrateAttribute;
    this.compositeEnvelopes = dsItemJSON.compositeEnvelopes;
    this.envelopeAttribute = null;
    this.inkColorAttribute = null;

    this.topLevelItem = true;
    this.originalTemplateStylecode = dsItemJSON.productStylecode;
    this.productRequiredWithTypeIds = dsItemJSON.productRequiredWithTypeIds;
    this.productNotAllowedWithTypeIds = dsItemJSON.productNotAllowedWithTypeIds;

    let isMultiviewItem = false;

    for (let j = 0; j < dsItemJSON.productDSViewSet.length; j = j + 1) {
      if (
        dsItemJSON.productDSViewSet[j].additionalSourceData &&
        dsItemJSON.productDSViewSet[j].scene
          .toLowerCase()
          .indexOf('_scenebuilder') > -1
      ) {
        isMultiviewItem = true;
        break;
      }
    }
    this.isMultidocument = isMultiviewItem;

    this.isSample = dsItemJSON.isSample;

    //TODO Figure out later
    // if (dsItemJSON.groupId) {
    //   this.groupId = dsItemJSON.groupId;
    //   if (!designStudio.groupId) {
    //     designStudio.groupId = dsItemJSON.groupId;
    //   }
    // } else if (designStudio.groupId) {
    //   this.groupId = designStudio.groupId;
    // } else {
    //   designStudio.generateGroupId();
    //   this.groupId = designStudio.groupId;
    // }

    const customerDoApplyImprintsPreference = true;
    //TODO Figure out later
    // this.isLockedForImprintEditing =
    //   (dsItemJSON.allowImprints &&
    //     designStudio.dsJSON.showImprintForm &&
    //     customerDoApplyImprintsPreference) ||
    //   false;
    // if (this.isParent && designStudio.defaultQuantity < 1) {
    //   designStudio.defaultQuantity = this.originalQuantity;
    // }

    this.viewDimensions = [];
    this.views = [];
    this.proofingViews = [];

    this.isSaved = false;
    this.proofImageGenerated = false;
    this.useLocalStorage = useLocalStorage || false;

    this.mailingServiceKey = null;
    this.mailingListInfo = null;
    //TODO Figure out later
    // this.selectedMailingListServiceKey =
    //   dsItemJSON.mailingListServiceKey || null;
    // this.selectedMailingListIds = dsItemJSON.mailingListId || null;
    // this.selectedMailingLists = dsItemJSON.mailingListArray || null;

    // this.envelopeAttribute = this.getSelectedEnvelopeDesign();

    this.IDSObject = {};
    this.templateVariations = [];
    this.selectedVariation = dsItemJSON.variationAttribute || null;
    this.colorSwatches = [];
    this.textBoxes = [];
    this.imageBoxes = [];
    this.trackUneditedElements = false;

    this.isWorking = false;
    this.isInitialized = false;
    this.canBeRemoved = true;
    this.getDocumentCallCount = 0;

    this.imageBoxesToMerge = [];

    this.updatedBaselineJSON = null;

    this.applyingImprints = false;
    this.generatingAnimatedImage = false;
    this.generateAnimatedImage = true;
    this.waitingCount = 0;
    this.generateWaitingCount = 0;
  }

  getFrontView(): View | null {
    const views = this.productViewSet;
    if (!views) return null;

    for (const view of views) {
      if (view.scene.includes('front')) {
        return view;
      }
    }
    return null;
  }

  getBackView(): View | null {
    const views = this.productViewSet;
    if (!views) return null;

    for (const view of views) {
      if (view.scene.includes('back')) {
        return view;
      }
    }
    return null;
  }

  getViewDataByName(
    name: string,
    limitToCurrentView: boolean,
    currentViewIndex: number
  ): DSItemViewData | null {
    let dsItemViewData = null;
    limitToCurrentView = limitToCurrentView || false;

    for (let i = 0, x = this.views.length; i < x; i++) {
      const tempDSItemViewData = this.views[i].viewData;

      if (dsItemViewData === null) {
        for (let j = 0, y = tempDSItemViewData.length; j < y; j++) {
          if (
            (!limitToCurrentView && tempDSItemViewData[j].name === name) ||
            (limitToCurrentView &&
              i === currentViewIndex &&
              tempDSItemViewData[j].name === name)
          ) {
            dsItemViewData = tempDSItemViewData[j];
            break;
          }
        }
      }
    }

    return dsItemViewData;
  }
}
