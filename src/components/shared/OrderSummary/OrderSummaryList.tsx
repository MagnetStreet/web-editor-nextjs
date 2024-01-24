import { CustomIcon } from '@/components/shared/CustomIcon';
import useOrderSummaryStore, {
  OrderSummaryState,
} from '@/stores/useOrderStore';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import styles from './orderSummary.module.scss';
import * as React from 'react';
import useScreenSize from '@/hooks/useScreenSize';

interface OrderSummaryListProps {
  onClose: () => void;
}

const OrderSummaryList: React.FC<OrderSummaryListProps> = ({ onClose }) => {
  const theme = useTheme();
  const { isDesktop } = useScreenSize();
  const { orderItems, total, base, taxes } =
    useOrderSummaryStore<OrderSummaryState>((state) => state);

  return (
    <Stack className={styles.orderSummaryList}>
      <Box className={styles.orderSummaryList__header}>
        <Typography variant='h1' fontSize={isDesktop ? '20px' : '24px'}>
          Order Summary
        </Typography>
        <Box onClick={() => onClose()}>
          <CustomIcon iconClass='fa-xmark-large' fontSizeOverWrite='16px' />
        </Box>
      </Box>
      <Stack>
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ marginTop: '16px' }}
        >
          <Typography fontWeight='bold'>Base</Typography>
          <Stack direction='row' gap='6px'>
            <Typography color={theme.palette.grey[400]}>$</Typography>
            <Typography>{base}</Typography>
          </Stack>
        </Stack>
        {orderItems.map((item, index) => {
          return (
            <Stack
              key={`order-summary-item-${item.label}-${index}`}
              className={styles.orderSummaryList__list__item}
            >
              <Stack direction='row' gap='16px'>
                <CustomIcon
                  iconClass='fa-pen-light'
                  fontSizeOverWrite='16px'
                  color={theme.palette.primary.main}
                />
                <Stack>
                  <Typography
                    fontSize='12px'
                    color={theme.palette.grey[400]}
                    lineHeight='normal'
                  >{`${item.categroy} x${item.quantity}`}</Typography>
                  <Typography>{item.label}</Typography>
                </Stack>
              </Stack>
              <Stack direction='row' gap='6px'>
                <Typography color={theme.palette.grey[400]}>$</Typography>
                <Typography>{item.value}</Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
      <Stack gap='8px' sx={{ marginTop: '24px' }}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography fontSize='14px' color={theme.palette.grey[400]}>
            Subtotal
          </Typography>
          <Typography fontSize='14px' color={theme.palette.grey[400]}>
            ${total}
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Typography fontSize='14px' color={theme.palette.grey[400]}>
            Taxes
          </Typography>
          <Typography fontSize='14px' color={theme.palette.grey[400]}>
            ${taxes}
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Typography fontWeight='bold'>Total</Typography>
          <Typography fontWeight='bold'>{total}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OrderSummaryList;
