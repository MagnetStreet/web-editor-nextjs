export default interface Discounts {
  discountPercentage: number;
  productTypeIdList: string;
  fixedUnitPrice: number;
  code: string;
  productIdList: string;
  productCategoryIdList: string;
  attributeIdList: string;
  description: string;
  exclusive: boolean;
  productTypeIdExludeList: string;
  marketIdList: string; // TODO ask why this is not a string array
}
