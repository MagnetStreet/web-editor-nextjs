import { Alert, Box, Fade, useTheme } from '@mui/material';
import * as React from 'react';
import { CustomIcon } from '@/components/shared/CustomIcon';
import { Notification } from '@/types';
import {
  useNotificationStore,
  useNotificationsState,
} from '@/stores/useNotificationStore';

const Notifications: React.FC = () => {
  const theme = useTheme();
  const { activeNotifications } = useNotificationStore<useNotificationsState>(
    (state) => state
  );

  return (
    <Box
      position='absolute'
      sx={{
        zIndex: 9999,
        top: '15px',
        left: '10px',
        right: '10px',
      }}
    >
      {activeNotifications.map((notification: Notification, index: number) => {
        return (
          <Fade in={true} key={`notifiation-${index}`}>
            <Alert
              icon={
                <CustomIcon
                  iconClass={notification.icon}
                  hideTextInMobile
                  fontSizeOverWrite='12px'
                  color='white'
                  sx={{
                    width: '20px',
                    borderRadius: '100px',
                    backgroundColor: theme.palette.warning.dark,
                  }}
                />
              }
              severity={notification.severity}
              sx={{
                padding: '0 16px',
                borderRadius: '22px',
                border: `1px solid ${theme.palette.warning.dark}`,
                background: theme.palette.warning.main,
              }}
            >
              {notification.body}
            </Alert>
          </Fade>
        );
      })}
    </Box>
  );
};

export default Notifications;
