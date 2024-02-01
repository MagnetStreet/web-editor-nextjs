import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import * as React from 'react';
import styles from './orderSummary.module.scss';
import useScreenSize from '@/hooks/useScreenSize';
import { CustomIcon } from '@/components/shared/CustomIcon';

interface SampleProps {
  total: string;
  isOpen: boolean;
  onClick: () => void;
}

const OrderSummaryButton: React.FC<SampleProps> = ({
  total,
  onClick,
  isOpen = false,
}) => {
  const theme = useTheme();
  const { isDesktop } = useScreenSize();
  return (
    <Paper className={styles.orderSummarPaper}>
      <Stack
        className={`${styles.orderSummarWrapper} ${
          isOpen ? styles.orderSummarButton__isOpen : ''
        }`}
      >
        {isDesktop && (
          <>
            <Typography fontWeight='bold'>Total</Typography>
            <Typography>{total}</Typography>
            <Stack direction='row' spacing={1}>
              <Divider orientation='vertical' flexItem />
              <Button
                onClick={() => onClick()}
                className={styles.orderSummarButton}
              >
                View
              </Button>
            </Stack>
          </>
        )}
        {!isDesktop && (
          <Stack spacing={'12px'} sx={{ width: '100%' }}>
            <Button sx={{ padding: 0 }} onClick={() => onClick()}>
              <Stack
                className={styles.orderSummaryStack}
                sx={{ flexDirection: 'row' }}
              >
                <Stack direction={'row'} gap='8px'>
                  <PaidIcon />
                  <Typography color='black' fontWeight='bold'>
                    Project Summary
                  </Typography>
                </Stack>
                <CustomIcon
                  iconClass='fa-chevron-right'
                  fontSizeOverWrite='16px'
                />
              </Stack>
            </Button>
            <Divider sx={{ marginTop: '0 !important' }} />
            <Stack
              className={styles.orderSummaryStack}
              sx={{ flexDirection: 'row' }}
            >
              <Typography fontWeight='bold'>Total</Typography>
              <Typography fontWeight='bold'>{total}</Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default OrderSummaryButton;
