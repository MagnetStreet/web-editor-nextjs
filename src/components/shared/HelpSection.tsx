import { List, useTheme } from '@mui/material';
import * as React from 'react';

import { CustomIcon } from '@/components/shared/CustomIcon';
import ListItemWithIcon from '@/components/shared/ListItemWithIcon';

const HelpSection: React.FC = () => {
  const theme = useTheme();
  return (
    <List>
      <ListItemWithIcon
        label='Leave a Design Request'
        icon={
          <CustomIcon
            color={theme.palette.primary.main}
            iconClass='fa-bell-light'
            fontSizeOverWrite='16px'
          />
        }
        onClick={() => {
          //TODO Implement
        }}
      />
      <ListItemWithIcon
        label='Chat'
        icon={
          <CustomIcon
            color={theme.palette.primary.main}
            iconClass='fa-comment-light'
            fontSizeOverWrite='16px'
          />
        }
        onClick={() => {
          //TODO Implement
        }}
      />
    </List>
  );
};

export default HelpSection;
