import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

import styles from './Navigation.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import MobileStepper from '@/components/Navigation/MobileStepper';
import { CustomIcon } from '@/components/shared/CustomIcon';

import {
  BottomDrawerState,
  useBottomDrawerStore,
} from '@/stores/useBottomDrawerStore';
import useNavigationStore, {
  NavigationState,
} from '@/stores/useNavigationStore';

const Navigation: React.FC = () => {
  const theme = useTheme();
  const { isDesktop } = useScreenSize();
  const [mobileTotal, setMobileTotal] = useState<number>(0);
  const { isBottomDrawerOpen, setBottomDrawerComponent, toggleBottomDrawer } =
    useBottomDrawerStore<BottomDrawerState>((state) => state);
  const {
    steps,
    activeStep,
    activeSubStep,
    handleNextStepClick,
    handleBackStepClick,
  } = useNavigationStore<NavigationState>((state) => state);

  const prevStepText = React.useMemo(() => {
    if (activeStep === 0 && activeSubStep === 0) {
      // first substep of the steps
      return '';
    } else if (activeSubStep === 0) {
      const prevStepLastSubStep = steps[activeStep - 1].substeps.length - 1;
      return steps[activeStep - 1].substeps[prevStepLastSubStep];
    }
    return steps[activeStep].substeps[activeSubStep - 1];
  }, [activeStep, activeSubStep, steps]);

  const nextStepText = React.useMemo(() => {
    const lastSubStepIndex = steps[activeStep].substeps.length - 1;
    if (activeStep === steps.length - 1 && activeSubStep === lastSubStepIndex) {
      return '';
    } else if (activeSubStep === lastSubStepIndex) {
      return steps[activeStep + 1].substeps[0];
    }
    return steps[activeStep].substeps[activeSubStep + 1];
  }, [activeStep, activeSubStep, steps]);

  useEffect(() => {
    if (!isDesktop) {
      const percentage = calculateProgress();
      setMobileTotal(percentage);
    }
  }, [steps, activeStep, activeSubStep]);

  function calculateProgress(): number {
    let completedSubsteps = 0;
    for (let i = 0; i < activeStep; i++) {
      completedSubsteps += steps[i].substeps.length;
    }
    completedSubsteps += activeSubStep + 1; // Adding 1 because indices are zero-based

    let totalSubsteps = 0;
    steps.forEach((step) => {
      totalSubsteps += step.substeps.length;
    });

    return (completedSubsteps / totalSubsteps) * 100;
  }

  const renderBackBtn = () => {
    return (
      <Button
        className={styles.navigation__buttons__btn}
        onClick={handleBackStepClick}
        disabled={activeStep === 0 && activeSubStep === 0}
        color='primary'
        variant='text'
        startIcon={
          <CustomIcon
            iconClass='fa-chevron-left'
            hideTextInMobile
            color={
              activeStep === 0 && activeSubStep === 0
                ? theme.palette.grey[400]
                : theme.palette.primary.main
            }
            fontSizeOverWrite='18px'
          />
        }
      >
        <Stack sx={{ textAlign: 'left' }}>
          <Typography>
            <b>Back</b>
          </Typography>
          <Typography
            className={styles.navigation__buttons__btn__text}
            variant='subtitle2'
            noWrap
          >
            {prevStepText}
          </Typography>
        </Stack>
      </Button>
    );
  };

  const renderMobileDrawer = () => {
    return (
      <Button
        className={styles.navigation__select}
        color='inherit'
        variant='text'
        onClick={() => {
          setBottomDrawerComponent(
            <MobileStepper
              steps={steps}
              activeStep={activeStep}
              activeSubStep={activeSubStep}
            />
          );
          toggleBottomDrawer(true);
        }}
        endIcon={
          <CustomIcon
            iconClass={isBottomDrawerOpen ? 'fa-chevron-up' : 'fa-chevron-down'}
            hideTextInMobile
            color={theme.palette.grey[400]}
            fontSizeOverWrite='18px'
          />
        }
      >
        <Typography>
          <b>{steps[activeStep].substeps[activeSubStep]}</b>
        </Typography>
      </Button>
    );
  };

  const renderNextBtn = () => {
    return (
      <Button
        className={styles.navigation__buttons__btn}
        color='primary'
        variant='contained'
        disabled={
          activeStep === steps.length - 1 &&
          activeSubStep === steps[activeStep].substeps.length - 1
        }
        onClick={handleNextStepClick}
        endIcon={
          <CustomIcon
            iconClass='fa-chevron-right'
            hideTextInMobile
            color={theme.palette.primary.contrastText}
            fontSizeOverWrite='18px'
          />
        }
      >
        <Stack sx={{ textAlign: 'right' }}>
          <Typography>
            <b>Next</b>
          </Typography>
          <Typography
            className={styles.navigation__buttons__btn__text}
            variant='subtitle2'
            noWrap
          >
            {nextStepText}
          </Typography>
        </Stack>
      </Button>
    );
  };

  return (
    <Box>
      {isDesktop ? (
        <Stack className={styles.navigation__desktop}>
          {renderBackBtn()}
          <Stack direction='row' className={styles.navigation__steps}>
            {steps.map((step, index) => {
              let val;
              if (index > activeStep) {
                val = 0;
              } else if (
                index < activeStep ||
                (index === activeStep && step.substeps.length === 1)
              ) {
                val = 100;
              } else {
                val = (activeSubStep / step.substeps.length) * 100;
              }

              return (
                <Stack
                  key={`sub-step-${step.displayName}-${index}`}
                  className={styles.navigation__step}
                >
                  <Typography>{step.displayName}</Typography>
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress variant='determinate' value={val} />
                  </Box>
                </Stack>
              );
            })}
          </Stack>
          {renderNextBtn()}
        </Stack>
      ) : (
        <Stack className={styles.navigation__mobile__wrapper}>
          <Stack className={styles.navigation__mobile__buttons}>
            {renderBackBtn()}
            {renderMobileDrawer()}
            {renderNextBtn()}
          </Stack>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant='determinate' value={mobileTotal} />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default Navigation;
