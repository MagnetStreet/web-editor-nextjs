import { create } from 'zustand';

import { Notification } from '@/types';

export interface useNotificationsState {
  activeNotifications: Notification[];
  addNotification: (newItem: Notification) => void;
}

export const useNotificationStore = create<useNotificationsState>((set) => ({
  activeNotifications: [],
  addNotification: (newItem: Notification) => {
    // Set up a timer to remove the notification after a specified time (e.g., 5000 milliseconds or 5 seconds)
    const timerId = setTimeout(() => {
      set((state) => ({
        activeNotifications: state.activeNotifications.slice(1),
      }));
    }, 5000); // Adjust the time as needed

    set((state) => ({
      activeNotifications: [
        ...state.activeNotifications,
        { ...newItem, timerId },
      ],
    }));

    // Cleanup function to clear the timer if the component unmounts before the timeout
    return () => clearTimeout(timerId);
  },
}));
