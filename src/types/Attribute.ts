export default interface Attribute {
  template: string;
  webDescription: string;
  groupWebDescription: string;
  shortWebDescription: string;
  perPiecePrice: number;
  autoApply: boolean;
  groupId: number;
  notAllowedWith: number[];
  description: string;
  isDefault: boolean;
  additionalProductionTime: number;
  sortOrder: number;
  id: number;
}
