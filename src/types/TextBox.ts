interface TextStyleRange {
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

export default interface TextBox {
  textStyleRanges: TextStyleRange[];
  rawContents: string;
  clearContents: string;
  justification: string;
}
