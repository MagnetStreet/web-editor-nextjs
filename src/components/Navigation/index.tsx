import useScreenSize from '@/hooks/useScreenSize';
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import useNavigationStore, {
  NavigationState,
} from '@/stores/useNavigationStore';
import * as React from 'react';
import { CustomIcon } from '@/components/shared/CustomIcon';
import styles from './Navigation.module.scss';

const Navigation: React.FC = () => {
  const theme = useTheme();
  const { isDesktop } = useScreenSize();
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
      // Last sub steps of the steps
      return '';
    } else if (activeSubStep === lastSubStepIndex) {
      return steps[activeStep + 1].substeps[0];
    }
    return steps[activeStep].substeps[activeSubStep + 1];
  }, [activeStep, activeSubStep, steps]);

  return (
    <Box>
      {isDesktop ? (
        <Stack></Stack>
      ) : (
        <Stack className={styles.navigation__mobile__wrapper}>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant='determinate' value={50} />
          </Box>
          <Stack direction='row' className={styles.navigation__mobile__buttons}>
            <Button
              className={styles.navigation__mobile__buttons__btn}
              onClick={handleBackStepClick}
              disabled={activeStep === 0 && activeSubStep === 0}
              color={'inherit'}
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
                  fontSizeOverWrite='24px'
                />
              }
            >
              <Stack sx={{ textAlign: 'left' }}>
                <Typography>
                  <b>Back</b>
                </Typography>
                <Typography variant='subtitle2'>{prevStepText}</Typography>
              </Stack>
            </Button>
            <Button
              className={styles.navigation__mobile__buttons__btn}
              color={'inherit'}
              variant='text'
              endIcon={
                <CustomIcon
                  iconClass='fa-chevron-down'
                  hideTextInMobile
                  fontSizeOverWrite='18px'
                />
              }
            >
              <Stack sx={{ textAlign: 'center' }}>
                <Typography fontSize='12px'>
                  {steps && steps[activeSubStep]
                    ? steps[activeStep].substeps[activeSubStep]
                    : ''}
                </Typography>
                <Typography variant='subtitle2'>
                  {activeSubStep + 1} / {steps[activeStep].substeps.length}
                </Typography>
              </Stack>
            </Button>
            <Button
              className={styles.navigation__mobile__buttons__btn}
              color='inherit'
              variant='text'
              disabled={
                activeStep === steps.length - 1 &&
                activeSubStep === steps[activeStep].substeps.length - 1
              }
              onClick={handleNextStepClick}
              endIcon={
                <CustomIcon
                  iconClass='fa-chevron-right'
                  hideTextInMobile
                  color={theme.palette.primary.main}
                  fontSizeOverWrite='24px'
                />
              }
            >
              <Stack sx={{ textAlign: 'right' }}>
                <Typography>
                  <b>Next</b>
                </Typography>
                <Typography variant='subtitle2'>{nextStepText}</Typography>
              </Stack>
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default Navigation;
