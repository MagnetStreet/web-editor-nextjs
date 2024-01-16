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
  activeStep: 0,
  activeSubStep: 0,
  steps: [
    {
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
      displayName: 'Additionals',
      icon: 'fa-cart-plus-sharp-light',
      substeps: ['Additionals Invitation', 'Some Other steps'],
    },
    {
      displayName: 'Shipping',
      icon: 'fa-truck-fast-sharp-light',
      substeps: [
        'Additionals Invitation',
        'Some Other steps',
        'Some Other steps2',
      ],
    },
    {
      displayName: 'Review',
      icon: 'fa-clipboard-check-sharp-light',
      substeps: ['Final Review'],
    },
  ],
  setActiveStep: (newActive: number) => set({ activeStep: newActive }),
  setActiveSubStep: (newActive: number) => set({ activeSubStep: newActive }),
  handleNextStepClick: () => {
    set((state: StepperState) => {
      const { activeStep, activeSubStep, steps } = state;
      if (activeStep < steps.length - 1) {
        if (activeSubStep < steps[activeStep].substeps.length - 1) {
          return { activeSubStep: activeSubStep + 1 };
        } else {
          return { activeStep: activeStep + 1, activeSubStep: 0 };
        }
      }

      return state;
    });
  },
  handleBackStepClick: () => {
    set((state: StepperState) => {
      const { activeStep, activeSubStep, steps } = state;
      if (activeSubStep === 0) {
        if (activeStep !== 0) {
          const prevStepLastSubStep =
            state.steps[activeStep - 1].substeps.length - 1;
          return {
            activeStep: activeStep - 1,
            activeSubStep: prevStepLastSubStep,
          };
        }
        return state;
      } else {
        return {
          activeSubStep: activeSubStep - 1,
        };
      }
    });
  },
}));

export default useStepperStore;
