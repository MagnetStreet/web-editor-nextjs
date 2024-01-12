import { Stack } from '@mui/material';

import styles from './Stepper.module.scss';

import { StyledStepper } from '@/components/shared/Stepper/StyledStepper';
import { SubProgressSteps } from '@/components/shared/Stepper/SubProgressSteps';

import useStepperStore, { StepperState } from '@/stores/useStepperStore';

export default function StepperWrapper() {
  const { steps, activeStep, activeSubStep } = useStepperStore<StepperState>(
    (state) => state
  );

  return (
    <Stack className={styles.wrapper} spacing={4}>
      {steps && (
        <StyledStepper
          steps={steps}
          activeStep={activeStep}
          activeSubStep={activeSubStep}
        />
      )}
      {steps && (
        <SubProgressSteps
          activeStep={steps[activeStep - 1]}
          activeSubStep={activeSubStep}
        />
      )}
    </Stack>
  );
}
