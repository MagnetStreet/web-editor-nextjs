import { create } from 'zustand';

import { StepperStep } from '@/types';

export interface StepperState {
  steps: StepperStep[];
  activeStep: number;
  activeSubStep: number;
  setActiveStep?: (index: number) => void;
  setActiveSubStep?: (index: number) => void;
  handleNextStepClick?: () => void;
  handleBackStepClick?: () => void;
}

const useStepperStore = create<StepperState>((set) => ({
  activeStep: 1,
  activeSubStep: 1,
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
      substeps: [
        'Additionals Invitation',
        'Some Other steps',
        'Some Other steps2',
      ],
    },
    {
      index: 4,
      displayName: 'Review',
      icon: 'fa-clipboard-check-sharp-light',
      substeps: ['Final Review'],
    },
  ],
  setActiveStep: (newActive: number) => set({ activeStep: newActive }),
  setActiveSubStep: (newActive: number) => set({ activeSubStep: newActive }),
  handleNextStepClick: () => {
    set((state) => {
      const { activeStep, activeSubStep, steps } = state;
      if (activeStep < steps.length) {
        if (activeSubStep < steps[activeStep - 1].substeps.length) {
          return { activeSubStep: activeSubStep + 1 };
        } else {
          return { activeStep: activeStep + 1, activeSubStep: 1 };
        }
      }

      return state;
    });
  },
  handleBackStepClick: () => {
    set((state) => {
      const { activeStep, activeSubStep } = state;

      if (activeStep > 1) {
        if (activeSubStep > 1) {
          return { activeSubStep: activeSubStep - 1 };
        } else {
          const prevStepLastSubStep =
            state.steps[activeStep - 2].substeps.length;
          return {
            activeStep: activeStep - 1,
            activeSubStep: prevStepLastSubStep,
          };
        }
      }

      return state;
    });
  },
}));

export default useStepperStore;
