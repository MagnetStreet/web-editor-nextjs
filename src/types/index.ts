export interface PageParams {
  params?: { id?: string };
  searchParams?: { [key: string]: string | undefined };
}

export interface StepperStep {
  index: number;
  displayName: string;
  icon: string;
  substeps: string[];
}
