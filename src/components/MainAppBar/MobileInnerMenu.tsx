import { Box, Divider, List, ListItem, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import styles from './MainAppBar.module.scss';

import { CustomIcon } from '@/components/shared/CustomIcon';
import ListItemWithIcon from '@/components/shared/ListItemWithIcon';
import OrderSummaryButton from '@/components/shared/OrderSummary/OrderSummaryButton';

import { MenuItem } from '@/types';

interface MobileInnerMenuProps {
  menuItems: MenuItem[];
  typeOfProduct?: string;
  productName?: string;
  toggleOrderSummary: (val: boolean, val2: boolean) => void;
  toggleMobileDrawer: (val: boolean) => void;
}

const MobileInnerMenu: React.FC<MobileInnerMenuProps> = ({
  menuItems,
  productName,
  typeOfProduct,
  toggleOrderSummary,
  toggleMobileDrawer,
}) => {
  const [filtered, setFilteredItems] = useState<MenuItem[]>([]);
  const [highlightedItem, setHighlightedItem] = useState<MenuItem>();

  useEffect(() => {
    // Filter menu items without isHighlight property
    const filtered = menuItems.filter((item) => !item.isHighlight);
    setFilteredItems(filtered);

    const firstHighlightedItem = menuItems.find((item) => item.isHighlight);
    if (firstHighlightedItem) {
      setHighlightedItem(firstHighlightedItem);
    }
  }, [menuItems]);

  return (
    <List className={styles.innerMenu} role='presentation'>
      <Box
        className={styles.innerMenu__icon_exit}
        onClick={() => toggleMobileDrawer(false)}
      >
        <CustomIcon iconClass='fa-xmark-large' fontSizeOverWrite='16px' />
      </Box>
      <Stack className={styles.innerMenu__wrapper}>
        <Box>
          <ListItem disablePadding className={styles.innerMenu__list_item}>
            <Stack>
              <Typography variant='h3' fontFamily='var(--font-lato)'>
                Type of Product
              </Typography>
              <Typography variant='h4'>{productName}</Typography>
            </Stack>
          </ListItem>
          <Divider
            className={styles.innerMenu__divider}
            sx={{ margin: { xs: '16px auto', md: '0 auto 32px' } }}
          />
          <ListItem>
            <OrderSummaryButton
              total='$200'
              isOpen={false}
              onClick={() => {
                toggleOrderSummary(true, false);
              }}
            />
          </ListItem>
          <List>
            {filtered.map((item) => (
              <ListItemWithIcon
                key={`menu--mobile-item-${item.label}`}
                className={styles.innerMenu__list_item}
                label={item.label}
                icon={item.icon}
                onClick={() => item.onClick()}
              />
            ))}
          </List>
        </Box>
        {highlightedItem && (
          <ListItemWithIcon
            className={`${styles.innerMenu__list_item} ${styles.innerMenu__list_item__highlight}`}
            label={highlightedItem.label}
            icon={highlightedItem.icon}
            onClick={() => highlightedItem.onClick()}
          />
        )}
      </Stack>
    </List>
  );
};

export default MobileInnerMenu;
