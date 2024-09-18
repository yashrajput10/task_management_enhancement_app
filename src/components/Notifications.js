// frontend/src/components/Notifications.js
import React, { useEffect } from 'react';
import { requestNotificationPermission } from '../services/firebase';

const Notifications = () => {
  useEffect(() => {
    requestNotificationPermission().then(token => {
      if (token) {
        // Send the token to the server
        saveTokenToServer(token);
      }
    });
  }, []);

  const saveTokenToServer = async (token) => {
    try {
      const response = await fetch('/api/save-fcm-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        throw new Error('Failed to save token');
      }
      console.log('Token saved to server successfully');
    } catch (error) {
      console.error('Error saving token to server:', error);
    }
  };

  return <div></div>;
};

export default Notifications;
