export interface TransparentColor {
  name: string;
  infoFile: null;
  addCost: string;
  addCostValue: null;
  swatches: DSColor[];
}

export interface FoilColor {
  name: string;
  infoFile: string;
  addCost: string;
  addCostValue: null;
  swatches: DSColor[];
}

export interface StandardColors {
  name: string;
  swatches: DSColor[];
}

export interface DSColor {
  name: string;
  type: string;
  cmyk: number[];
  rgb: number[];
  family?: string;
  category?: string;
  spot?: string;
  foilColor?: string;
  gradientColors?: string;
  availableInDS?: boolean;
}
