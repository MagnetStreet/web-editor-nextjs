import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './MainAppBar.module.scss';
import { CustomIcon } from '@/components/shared/CustomIcon';
import { MenuItem } from '@/types';
import OrderSummaryButton from '@/components/shared/OrderSummary/OrderSummaryButton';

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
              total={'$200'}
              isOpen={false}
              onClick={() => {
                toggleOrderSummary(true, false);
              }}
            />
          </ListItem>
          <List>
            {filtered.map((item) => (
              <ListItem
                key={`menu--mobile-item-${item.label}`}
                disablePadding
                className={styles.innerMenu__list_item}
                onClick={() => item.onClick()}
              >
                <ListItemButton sx={{ padding: '8px 4px' }}>
                  <ListItemIcon sx={{ minWidth: '26px' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        {highlightedItem && (
          <ListItem
            disablePadding
            className={`${styles.innerMenu__list_item} ${styles.innerMenu__list_item__highlight}`}
            onClick={() => highlightedItem.onClick()}
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: '26px' }}>
                {highlightedItem.icon}
              </ListItemIcon>
              <ListItemText primary={highlightedItem.label} />
            </ListItemButton>
          </ListItem>
        )}
      </Stack>
    </List>
  );
};

export default MobileInnerMenu;
