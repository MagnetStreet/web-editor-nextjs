import { Box, Stack, Typography } from '@mui/material';

import styles from './Stepper.module.scss';

import { StepperStep } from '@/types';

interface SubProgressStepsProps {
  activeStep: StepperStep;
  activeSubStep: number;
}

export const SubProgressSteps: React.FC<SubProgressStepsProps> = ({
  activeStep,
  activeSubStep,
}) => (
  <Stack
    spacing={{ xs: 1, sm: 2 }}
    direction='row'
    className={styles.stepperSubWrapper}
  >
    {activeStep.substeps.map((sub, index) => {
      return (
        <Box
          key={`step-substep-${sub}`}
          sx={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <i
            className={
              index <= activeSubStep - 1
                ? 'fa-circle-check-light'
                : 'fa-circle-minus-sharp-light'
            }
          ></i>
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: index <= activeSubStep - 1 ? 700 : 400,
            }}
          >
            {sub}
          </Typography>
        </Box>
      );
    })}
  </Stack>
);
