import { Box, Stack, Typography, useTheme } from '@mui/material';
import * as React from 'react';

import styles from './orderSummary.module.scss';

import useScreenSize from '@/hooks/useScreenSize';

import { CustomIcon } from '@/components/shared/CustomIcon';

import useOrderSummaryStore, {
  OrderSummaryState,
} from '@/stores/useOrderStore';

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
        <Typography variant='h4' fontSize={isDesktop ? '20px' : '24px'}>
          Order Summary
        </Typography>
        <Box
          className={styles.orderSummaryList__back}
          onClick={() => onClose()}
        >
          <CustomIcon
            iconClass={isDesktop ? 'fa-xmark-large' : 'fa-chevron-left'}
            fontSizeOverWrite='16px'
          />
        </Box>
      </Box>
      <Stack className={styles.orderSummaryList__list}>
        <Stack className={styles.orderSummaryList__list__item} direction='row'>
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
              direction='row'
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
      <Stack className={styles.orderSummaryList__total_section}>
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
