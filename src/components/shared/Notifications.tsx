import { Alert, Box, Fade } from '@mui/material';
import * as React from 'react';
import { CustomIcon } from '@/components/shared/CustomIcon';
import { Notification } from '@/types';
import {
  useNotificationStore,
  useNotificationsState,
} from '@/stores/useNotificationStore';

const Notifications: React.FC = () => {
  const { activeNotifications } = useNotificationStore<useNotificationsState>(
    (state) => state
  );
  console.log('activeNotifications', activeNotifications);
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
                />
              }
              severity={notification.severity}
              sx={{
                borderRadius: '22px',
                border:
                  '1px solid var(--System-Messaging-900---Warning-Yellow, #E07A1F)',
                background:
                  'linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #E07A1F',
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
