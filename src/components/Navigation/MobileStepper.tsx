import {
  Box,
  Stack,
  Step,
  StepContent,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from '@mui/material';
import * as React from 'react';

import styles from './Navigation.module.scss';

import { CustomIcon } from '@/components/shared/CustomIcon';

import { StepperStep } from '@/types';

interface MobileStepperProps {
  steps: StepperStep[];
  activeStep: number;
  activeSubStep: number;
}

const MobileStepper: React.FC<MobileStepperProps> = ({
  steps,
  activeStep,
  activeSubStep,
}) => {
  const theme = useTheme();

  const renderSubSteps = (label: string, isDone: boolean) => {
    return (
      <Stack key={label} className={styles.navigation__mobile__subStep}>
        <Box
          className={`
          ${styles.navigation__mobile__icon}
          ${isDone ? '' : styles.is_done}
          ${styles.navigation__mobile__icon__small}`}
        >
          <CustomIcon
            iconClass={
              isDone ? 'fa-circle-minus-sharp-light' : 'fa-circle-check-light'
            }
            color={theme.palette.common.white}
            fontSizeOverWrite='12px'
            sx={{
              top: '5px',
            }}
          />
        </Box>
        <Typography>{label}</Typography>
      </Stack>
    );
  };

  return (
    <Stack spacing='12px' direction='column'>
      <Box>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((step, i) => (
            <Step key={step.displayName}>
              <StepLabel
                StepIconComponent={(props) => (
                  <ColorlibStepIcon {...props} iconClass='fa-check-light' />
                )}
              >
                {i === activeStep ? (
                  <b>{step.displayName}</b>
                ) : (
                  step.displayName
                )}
              </StepLabel>
              <StepContent>
                {step.substeps.map((substep, j) =>
                  renderSubSteps(substep, j > activeSubStep)
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Stack>
  );
};

function ColorlibStepIcon(props: StepIconProps & { iconClass: string }) {
  const theme = useTheme();
  const { active, completed, iconClass, icon } = props;
  return (
    <Box
      className={`
        ${styles.navigation__mobile__icon}
        ${active || completed ? styles.is_done : ''}`}
    >
      {active || completed ? (
        <CustomIcon
          iconClass={iconClass}
          color={theme.palette.common.white}
          fontSizeOverWrite='12px'
          sx={{
            top: '5px',
          }}
        />
      ) : (
        <Typography color={theme.palette.common.white} fontSize='12px'>
          <b>{icon}</b>
        </Typography>
      )}
    </Box>
  );
}

export default MobileStepper;
