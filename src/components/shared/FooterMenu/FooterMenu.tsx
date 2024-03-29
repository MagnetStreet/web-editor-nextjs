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
import { ChangeEvent } from 'react';

import useGeneralControlsStore, {
  GeneralControlsState,
} from '@/stores/useGeneralControlsStore';
import useStepperStore, { StepperState } from '@/stores/useStepperStore';

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
  const { zoom, setZoom } = useGeneralControlsStore<GeneralControlsState>(
    (state) => state
  );

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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setZoom(Number(e.target.value))
            }
          />
          <Typography>{zoom}%</Typography>
        </Stack>
      </Grid>
      <Grid item>
        <Item>
          <Typography>Total</Typography>
          <Typography>$200.00</Typography>
          <Stack direction='row' spacing={1}>
            <Divider orientation='vertical' flexItem />
            <Typography
              sx={{
                cursor: 'pointer',
                color: theme.palette.primary.main,
              }}
            >
              View
            </Typography>
          </Stack>
        </Item>
      </Grid>
      <Grid item>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Button
            variant='outlined'
            startIcon={<i className='fa-arrow-left'></i>}
            onClick={handleBackStepClick}
          >
            Back
          </Button>
          <Button
            variant='contained'
            endIcon={<i className='fa-arrow-right'></i>}
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
