import { Box, Divider, Stack, Typography } from '@mui/material';

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
        <Stack
          paddingX='16px'
          direction='row'
          justifyContent='space-between'
          alignContent='center'
        >
          <Stack
            alignContent='center'
            justifyContent='center'
            direction='row'
            gap={1}
            divider={<Divider orientation='vertical' flexItem />}
          >
            <Stack
              gap={1}
              direction='row'
              justifyContent='center'
              alignContent='center'
            >
              <Typography>STEP {activeIndex + 1}</Typography>
              <Typography>
                <b>{activeStepObj.displayName}</b>
              </Typography>
            </Stack>
            <Box>{activeIndex + 1 / total}</Box>
          </Stack>
          <Typography>{activeScreen}</Typography>
        </Stack>
      )}
    </>
  );
};
