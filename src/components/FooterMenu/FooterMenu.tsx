import {
  Button,
  Divider,
  Grid,
  Paper,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/system';

import { CustomIcon } from '@/components/shared/CustomIcon';

import {
  GeneralControlsState,
  useGeneralControlsStore,
} from '@/stores/useGeneralControlsStore';
import useStepperStore, { StepperState } from '@/stores/useStepperStore';
import OrderSummaryButton from '@/components/shared/OrderSummary/OrderSummaryButton';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  ...theme.typography.body2,
  padding: '10px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  borderRadius: '8px',
  border: '1px solid rgba(204, 204, 204, 0.80)',
}));

const FooterMenu = () => {
  const theme = useTheme();
  const { handleNextStepClick, handleBackStepClick } =
    useStepperStore<StepperState>((state) => state);
  const { zoom, isBottomFrameOpen, setZoom, setIsBottomFrameOpen } =
    useGeneralControlsStore<GeneralControlsState>((state) => state);

  return (
    <Grid
      container
      direction='row'
      justifyContent='flex-end'
      alignItems='center'
      padding='16px 0'
      gap='32px'
      sx={{
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingRight: '32px',
        backgroundColor: '#fff',
        borderTop: `1px solid rgba(204, 204, 204, 0.80)`,
      }}
    >
      <Grid item xs={3}>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Typography>Zoom</Typography>
          <Slider
            size='small'
            aria-label='Zoom'
            value={zoom}
            valueLabelDisplay='auto'
            sx={{
              width: '80%',
            }}
            onChange={(
              event: Event,
              value: number | number[],
              activeThumb: number
            ) => setZoom(activeThumb)}
          />
          <Typography>{zoom}%</Typography>
        </Stack>
      </Grid>
      <Grid item>
        <OrderSummaryButton
          total='$2000.00'
          isOpen={false}
          onClick={() => setIsBottomFrameOpen(!isBottomFrameOpen)}
        />
      </Grid>
      <Grid item>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Button
            variant='outlined'
            startIcon={
              <CustomIcon iconClass='fa-arrow-left' fontSizeOverWrite='18px' />
            }
            onClick={handleBackStepClick}
          >
            Back
          </Button>
          <Button
            variant='contained'
            endIcon={
              <CustomIcon iconClass='fa-arrow-right' fontSizeOverWrite='18px' />
            }
            onClick={handleNextStepClick}
          >
            Next
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default FooterMenu;
