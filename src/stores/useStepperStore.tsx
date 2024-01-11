import { create } from 'zustand';

import { StepperStep } from '@/types';

export interface StepperState {
  steps: StepperStep[];
  activeStep: number;
  activeSubStep: number;
  setActiveStep?: (index: number) => void;
}

const useStepperStore = create<StepperState>((set) => ({
  activeStep: 1,
  activeSubStep: 2,
  steps: [
    {
      index: 1,
      displayName: 'Products',
      icon: 'fa-cards-blank-sharp-light',
      substeps: [
        'Pocket Invitation',
        'Steps RSVP Postcards',
        'Steps Enclosure Cards',
        'Envelope Liners',
      ],
    },
    {
      index: 2,
      displayName: 'Additionals',
      icon: 'fa-cart-plus-sharp-light',
      substeps: ['Additionals Invitation', 'Some Other steps'],
    },
    {
      index: 3,
      displayName: 'Shipping',
      icon: 'fa-truck-fast-sharp-light',
      substeps: ['Additionals Invitation', 'Some Other steps'],
    },
    {
      index: 4,
      displayName: 'Review',
      icon: 'fa-clipboard-check-sharp-light',
      substeps: ['Final Review', 'Some Other steps', 'Other Review'],
    },
  ],
  setActiveStep: (newActive: number) => set({ activeStep: newActive }),
}));

export default useStepperStore;
