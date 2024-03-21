import { Alert, Box, Fade, Theme, useTheme } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';

import { CustomIcon } from '@/components/shared/CustomIcon';

import {
  useNotificationsState,
  useNotificationStore,
} from '@/stores/useNotificationStore';
import { AlertColor } from '@mui/material';
import { Notification } from '@/types';

const Notifications: React.FC = () => {
  const theme = useTheme();
  const [key, setKey] = React.useState(0); // Key to force a re-render

  const { activeNotifications } = useNotificationStore<useNotificationsState>(
    (state) => state
  );

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [activeNotifications.length]);

  return (
    <Box
      position='absolute'
      sx={{
        zIndex: 9999,
        top: '15px',
        left: '10px',
        right: '10px',
      }}
      key={key} // Use the key to trigger a re-render
    >
      {activeNotifications.map((notification: Notification, index: number) => {
        const { color, textColor } = switchSeverity(
          notification.severity,
          theme
        );
        return (
          <Fade in={true} key={`notification-${index}`}>
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
                    backgroundColor: { textColor },
                  }}
                />
              }
              severity={notification.severity}
              sx={{
                padding: '0 16px',
                borderRadius: '22px',
                border: `1px solid ${textColor}`,
                background: color,
                color: textColor,
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

function switchSeverity(severity: AlertColor | undefined, theme: Theme) {
  switch (severity) {
    case 'success':
      return {
        color: theme.palette.success.main,
        textColor: theme.palette.success.dark,
      };
    case 'info':
      return {
        color: theme.palette.info.main,
        textColor: theme.palette.info.dark,
      };
    case 'warning':
      return {
        color: theme.palette.warning.main,
        textColor: theme.palette.warning.dark,
      };
    case 'error':
    default:
      return {
        color: theme.palette.error.main,
        textColor: theme.palette.error.dark,
      };
  }
}

export default Notifications;
