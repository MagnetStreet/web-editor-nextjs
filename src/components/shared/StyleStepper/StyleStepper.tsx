import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
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

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  color: '#70777F',
  backgroundColor: '#fff',
  zIndex: 1,
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #CCCDCD',
  ...(ownerState.completed && {
    color: '#fff',
    border: 'none',
    backgroundColor: '#618DE6',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-4px',
      left: '-4px',
      width: 'calc(100% + 8px)',
      height: 'calc(100% + 8px)',
      borderRadius: '100%',
      border: '4px solid rgba(97, 141, 230, 0.50)',
      boxSizing: 'border-box',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: 'calc(100%)',
      height: 'calc(100%)',
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
    1: <ContentCopyOutlinedIcon />,
    2: <AddShoppingCartIcon />,
    3: <LocalShippingOutlinedIcon />,
    4: <InventoryOutlinedIcon />,
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
      marginTop='20px'
      borderBottom='1px solid '
    >
      <Stepper
        alternativeLabel
        activeStep={1}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <p>Step 1</p>
              <b>{label}</b>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
