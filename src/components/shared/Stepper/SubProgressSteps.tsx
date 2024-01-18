import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';

import styles from './Stepper.module.scss';

import { CustomIcon } from '@/components/shared/CustomIcon';

import { StepperStep } from '@/types';

interface SubProgressStepsProps {
  total: number;
  activeIndex: number;
  activeStepObj: StepperStep;
  activeSubStep: number;
  isDesktop: boolean;
  activeScreen: string;
}

export const SubProgressSteps: React.FC<SubProgressStepsProps> = ({
  total,
  activeIndex,
  activeStepObj,
  activeSubStep,
  isDesktop,
  activeScreen,
}) => {
  const theme = useTheme();
  return (
    <>
      {isDesktop && (
        <Stack
          spacing={{ sm: 2 }}
          direction='row'
          className={styles.stepperSubWrapper}
        >
          {activeStepObj.substeps.map((sub, index) => {
            return (
              <Box
                key={`step-substep-${sub}`}
                sx={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <CustomIcon
                  fontSizeOverWrite='16px'
                  iconClass={
                    index <= activeSubStep
                      ? 'fa-circle-check-light'
                      : 'fa-circle-minus-sharp-light'
                  }
                />
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: index <= activeSubStep ? 700 : 400,
                  }}
                >
                  {sub}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      )}
      {!isDesktop && (
        <Stack className={styles.stepperSubWrapperMobile}>
          <Stack
            alignItems='center'
            justifyContent='center'
            direction='row'
            gap={1}
            divider={<Divider orientation='vertical' flexItem />}
          >
            <Stack
              gap={1}
              direction='row'
              justifyContent='center'
              alignItems='center'
            >
              <Typography color={theme.palette.grey[400]} fontSize='12px'>
                STEP {activeIndex + 1}
              </Typography>
              <Typography>
                <b>{activeStepObj.displayName}</b>
              </Typography>
            </Stack>
            <Typography fontSize='12px'>
              {activeIndex + 1} / {total}
            </Typography>
          </Stack>
          <Typography fontSize='12px'>{activeScreen}</Typography>
        </Stack>
      )}
    </>
  );
};
