import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import styles from './StyleStepper.module.scss';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 27,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      width: '50%',
      position: 'relative',
      background: 'linear-gradient(90deg, #618DE6 55.17%, #5471A8 100%)',
      '&::before': {
        content: '""',
        height: '4px',
        width: '100%',
        left: '100%',
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
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  color: '#CCCDCD',
  backgroundColor: '#fff',
  zIndex: 1,
  width: 25,
  height: 25,
  display: 'flex',
  fontSize: '12px',
  borderRadius: '50%',
  marginTop: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #CCCDCD',
  ...(ownerState.completed && {
    color: '#fff',
    border: 'none',
    backgroundColor: '#618DE6',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-6px',
      left: '-6px',
      width: 'calc(100% + 12px)',
      height: 'calc(100% + 12px)',
      borderRadius: '100%',
      border: '4px solid rgba(97, 141, 230, 0.50)',
      boxSizing: 'border-box',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      width: 'calc(100% + 4px)',
      height: 'calc(100% + 4px)',
      borderRadius: '100%',
      backgroundColor: 'transparent',
      border: '4px solid #fff',
      boxSizing: 'border-box',
    },
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <i className='fa-cart-shopping'></i>,
    2: <i className='fa-cart-shopping'></i>,
    3: <i className='fa-truck-fast-sharp-light'></i>,
    4: <i className='fa-cart-shopping'></i>,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Products', 'Additionals', 'Shipping', 'Review'];

export default function StyleStepper() {
  return (
    <Stack
      sx={{ width: '100%' }}
      spacing={4}
      height={98}
      marginLeft='110px'
      marginBottom='13px'
      width='calc(100% - 110px)'
      borderBottom='1px solid #CCCDCD'
    >
      <Stepper
        className={styles.styles}
        alternativeLabel
        activeStep={2}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              sx={{
                '& .MuiStepLabel-label': {
                  marginTop: '9px',
                },
              }}
            >
              <Typography variant='h3'>Step {index + 1}</Typography>
              <Typography variant='h2'>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
