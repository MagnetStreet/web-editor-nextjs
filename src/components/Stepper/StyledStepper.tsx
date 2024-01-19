import { Box, Typography } from '@mui/material';
import Step from '@mui/material/Step';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';

import styles from './Stepper.module.scss';

import { StepperStep } from '@/types';

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.root}`]: {
    top: 30,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
    width: '100%',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: `linear-gradient(90deg, #618DE6 55.17%, #5471A8 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#618DE6',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor: '#E5EEFE',
    borderRadius: 1,
  },
}));

function ColorlibStepIcon(props: StepIconProps & { iconClass: string }) {
  const { active, completed, className, iconClass } = props;
  const rootClass = `
  ${styles.colorlibStepIconRoot} 
  ${active ? styles.active : ''}
  ${completed ? styles.completed : ''}
  ${className || ''}
  `;

  return (
    <Box className={rootClass}>{!active && <i className={iconClass}></i>}</Box>
  );
}

interface StyleadStepperProps {
  steps: StepperStep[];
  activeStep: number;
  activeSubStep: number;
  isDesktop: boolean;
}

export const StyledStepper: React.FC<StyleadStepperProps> = ({
  steps,
  activeStep,
  isDesktop,
}) => {
  const theme = useTheme();
  return (
    <Stepper
      sx={{
        paddingX: '24px',
      }}
      alternativeLabel
      activeStep={activeStep}
      className={styles.stepper}
      connector={<ColorlibConnector />}
    >
      {steps.map(({ displayName, icon }, index) => {
        const isActiveClass = `${
          activeStep === index ? styles.isStepActive : ''
        }`;

        return (
          <Step key={displayName}>
            <StepLabel
              StepIconComponent={(props) => (
                <ColorlibStepIcon {...props} iconClass={icon} />
              )}
            >
              {isDesktop && (
                <Box
                  className={`
                  ${styles.stepperLabel}
                  ${isActiveClass}
                `}
                >
                  <Box className={`{styles.stepperLabelContainer} `}>
                    <Typography
                      variant='h3'
                      sx={{
                        color:
                          activeStep === index
                            ? theme.palette.secondary.light
                            : 'black',
                      }}
                    >
                      Step {index}
                    </Typography>
                    <Typography variant='h2'>{displayName}</Typography>
                  </Box>
                </Box>
              )}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
