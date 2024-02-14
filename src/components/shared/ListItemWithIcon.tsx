import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import * as React from 'react';

interface ListItemWithIconProps {
  label?: string;
  className?: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const ListItemWithIcon: React.FC<ListItemWithIconProps> = ({
  icon,
  label,
  className,
  onClick,
}) => {
  return (
    <ListItem disablePadding className={className} onClick={() => onClick()}>
      <ListItemButton sx={{ padding: '8px 4px' }}>
        <ListItemIcon sx={{ minWidth: '26px' }}>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemWithIcon;
