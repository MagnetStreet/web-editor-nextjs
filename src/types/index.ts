import { AlertColor } from '@mui/material';

export interface PageParams {
  params?: { id?: string };
  searchParams?: { [key: string]: string | undefined };
}

export interface StepperStep {
  displayName: string;
  icon: string;
  substeps: string[];
}

export interface PointCoordinates {
  x: number;
  y: number;
}

export interface Sizes {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export interface Coordinates {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

export interface MenuItem {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
  isHighlight?: boolean;
}

export interface OrderItem {
  label: string;
  categroy: string;
  quantity: number;
  value: number;
}

export interface Notification {
  icon: string;
  body: React.ReactNode;
  severity: AlertColor | undefined;
}
