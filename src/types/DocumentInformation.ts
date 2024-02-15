import SwatchColor from '@/types/SwatchColor';
import TextBox from '@/types/TextBox';
import TextTag from '@/types/TextTag';
import View from '@/types/View';

export default interface DocumentInformation {
  appliedVariation: string;
  docBleed: number;
  envgProps: null | any; // TODO You can replace `any`
  hasBaselineDoc: boolean;
  imageBoxes: any[]; // TODO You can replace `any`
  pageCount: number;
  pageHeight: number;
  pageWidth: number;
  supportsVarnish: boolean;
  swatches: SwatchColor[];
  templateVariations: null | any; // TODO You can replace `any`
  textBoxes: TextBox[];
  textTags: TextTag[];
  views: View[];
}
