import { Stack } from '@mui/material';

import styles from './Stepper.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import { StyledStepper } from '@/components/Stepper/StyledStepper';
import { SubProgressSteps } from '@/components/Stepper/SubProgressSteps';

import useNavigationStore, {
  NavigationState,
} from '@/stores/useNavigationStore';

export default function StepperWrapper() {
  const { isDesktop } = useScreenSize();
  const { steps, activeStep, activeSubStep } =
    useNavigationStore<NavigationState>((state) => state);

  return (
    <Stack className={styles.wrapper} spacing={4}>
      {/* {steps && (
        <StyledStepper
          steps={steps}
          activeStep={activeStep}
          activeSubStep={activeSubStep}
          isDesktop={isDesktop}
        />
      )}
      {steps && (
        <SubProgressSteps
          total={steps.length}
          activeIndex={activeStep}
          activeStepObj={steps[activeStep]}
          activeSubStep={activeSubStep}
          isDesktop={isDesktop}
          activeScreen='Pocket Invitation'
        />
      )} */}
    </Stack>
  );
}
