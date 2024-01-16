export interface PageParams {
  params?: { id?: string };
  searchParams?: { [key: string]: string | undefined };
}

export interface StepperStep {
  displayName: string;
  icon: string;
  substeps: string[];
}
