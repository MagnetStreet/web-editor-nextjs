export interface PageParams {
  params?: { id?: string };
  searchParams?: { [key: string]: string | undefined };
}

export interface StepperStep {
  displayName: string;
  icon: string;
  substeps: string[];
}

export interface EditorView {
  id: number;
  displayName: string;
  tumbnailSrc: string;
  src: string;
}

export interface Sizes {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}
