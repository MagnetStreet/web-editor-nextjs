export interface TextStyleRange {
  otf: string;
  fillColorY: number;
  leading: string;
  rawContents: string;
  fillSpotValue: string;
  fillColorSpace: string;
  clearContents: string;
  fillColorR: number;
  baselineShift: string;
  tracking: number;
  pointSize: number;
  capitalization: string;
  fillColorK: number;
  contents: string;
  fillColorM: number;
  fillColorB: number;
  fillColorC: number;
  font: string;
  fillColorG: number;
}

export interface TextBoxContentFormat {
  textStyleRanges: TextStyleRange[];
  rawContents: string;
  clearContents: string;
  justification: string;
}

export interface TextBox {
  bottom: number;
  contentFormatted: TextBoxContentFormat[];
  contentType: string;
  foilable: boolean;
  id: number;
  left: number;
  lockColor: boolean;
  lockEditing: boolean;
  lockFontFace: boolean;
  lockFontSize: boolean;
  lockLeading: boolean;
  lockVerticalAlignment: boolean;
  minFontSize: string;
  modified: boolean;
  name: string;
  page: number;
  place: number;
  right: number;
  rotationAngle: number;
  tagName: string;
  top: number;
  verticalAlignment: string;
}
