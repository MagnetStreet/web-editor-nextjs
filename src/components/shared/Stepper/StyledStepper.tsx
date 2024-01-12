import { Box, Typography } from '@mui/material';
import Step from '@mui/material/Step';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import styles from './Stepper.module.scss';

import { StepperStep } from '@/types';

interface ColorlibConnectorProps {
  percentage: number;
}

const ColorlibConnector = styled(StepConnector)<ColorlibConnectorProps>(
  ({ percentage }) => ({
    [`&.${stepConnectorClasses.root}`]: {
      top: 27,
      left: 'calc(-50% + 20px)',
      right: 'calc(0% + 20px)',
      overflow: 'hidden',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        width: `${percentage}%`,
        position: 'relative',
        background: `linear-gradient(90deg, #618DE6 55.17%, #5471A8 100%)`,
        '&::before': {
          content: '""',
          height: '4px',
          zIndex: -1,
          width: `${400}%`,
          left: `100%`,
          position: 'absolute',
          backgroundColor: '#E5EEFE',
        },
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
  })
);

function ColorlibStepIcon(
  props: StepIconProps & { iconClass: string } & { isFirst: string } & {
    isLast: string;
  }
) {
  const { active, completed, className, iconClass, isFirst, isLast } = props;
  const rootClass = `
  ${styles.colorlibStepIconRoot} 
  ${completed ? styles.completed : ''}
  ${isFirst ? styles.first : ''}
  ${isLast ? styles.last : ''}
  ${className || ''}
  `;

  return (
    <Box className={rootClass}>
      <i className={iconClass}></i>
    </Box>
  );
}

interface StyleadStepperProps {
  steps: StepperStep[];
  activeStep: number;
  activeSubStep: number;
}

export const StyledStepper: React.FC<StyleadStepperProps> = ({
  steps,
  activeStep,
  activeSubStep,
}) => {
  // Get the percentage for the bar according to the current sub steps active value
  const totalSubSteps = steps[activeStep - 1].substeps.length;
  const completedPercentage = ((activeSubStep - 1) / totalSubSteps) * 60 + 20;

  return (
    <Stepper
      sx={{
        height: '98px',
        paddingX: '24px',
      }}
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector percentage={completedPercentage} />}
    >
      {steps.map(({ index, displayName, icon }) => {
        const isFirst = index === 1 ? styles.first : '';
        const isLast = index === steps.length ? styles.last : '';
        return (
          <Step key={displayName} className={styles.stepperStep}>
            <StepLabel
              className={`
              ${styles.stepperLabel} 
              ${isFirst}
              ${isLast}
            `}
              StepIconComponent={(props) => (
                <ColorlibStepIcon
                  {...props}
                  iconClass={icon}
                  isFirst={isFirst}
                  isLast={isLast}
                />
              )}
            >
              <Box
                className={`
                ${styles.stepperLabel} 
                ${isFirst}
                ${isLast}
              `}
              >
                <Box className={`{styles.stepperLabelContainer} `}>
                  <Typography variant='h3'>Step {index}</Typography>
                  <Typography variant='h2'>{displayName}</Typography>
                </Box>
              </Box>
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
