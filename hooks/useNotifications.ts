// hooks/useNotifications.ts
'use client';

import { useState, useEffect } from 'react';
import { getFirebase } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'assignment' | 'achievement' | 'reminder' | 'lesson';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  icon?: string;
  priority: 'low' | 'medium' | 'high';
  category: 'system' | 'learning' | 'social' | 'achievement';
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load notifications from Firebase
  useEffect(() => {
    const loadNotifications = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { db } = getFirebase();
      if (!db) {
        setLoading(false);
        return;
      }

      try {
        const snapshot = await db
          .collection('notifications')
          .where('userId', '==', user.uid)
          .orderBy('createdAt', 'desc')
          .limit(50)
          .get();

        const notifs: Notification[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        })) as Notification[];

        setNotifications(notifs);
        setUnreadCount(notifs.filter(n => !n.read).length);

      } catch (error) {
        console.error('Error loading notifications:', error);
        // Create some default notifications for new users
        const defaultNotifications: Notification[] = [
          {
            id: 'welcome',
            title: 'Welcome to EduMath GH! 🎉',
            message: 'Start your mathematics journey with Ella, your AI tutor!',
            type: 'info',
            read: false,
            createdAt: new Date(),
            priority: 'high',
            category: 'system',
            actionUrl: '/dashboard/lessons'
          }
        ];
        setNotifications(defaultNotifications);
        setUnreadCount(1);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [user]);

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    if (!user) return;

    const { db } = getFirebase();
    if (!db) {
      // Update local state even if Firebase is not available
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      return;
    }

    try {
      await db
        .collection('notifications')
        .doc(notificationId)
        .update({ read: true });

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));

    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Still update local state
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user) return;

    const { db } = getFirebase();
    if (!db) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      return;
    }

    try {
      const batch = db.batch();
      const unreadNotifications = notifications.filter(n => !n.read);
      
      unreadNotifications.forEach(notification => {
        const notifRef = db.collection('notifications').doc(notification.id);
        batch.update(notifRef, { read: true });
      });

      await batch.commit();

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);

    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  // Add new notification
  const addNotification = async (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    if (!user) return;

    const newNotification: Notification = {
      id: Date.now().toString(),
      ...notification,
      read: false,
      createdAt: new Date()
    };

    // Add to local state immediately
    setNotifications(prev => [newNotification, ...prev.slice(0, 49)]);
    setUnreadCount(prev => prev + 1);

    // Show browser notification if enabled
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.id
      });
    }

    const { db } = getFirebase();
    if (!db) return;

    try {
      await db.collection('notifications').add({
        ...notification,
        userId: user.uid,
        read: false,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId: string) => {
    if (!user) return;

    const notification = notifications.find(n => n.id === notificationId);
    
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }

    const { db } = getFirebase();
    if (!db) return;

    try {
      await db.collection('notifications').doc(notificationId).delete();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Clear all notifications
  const clearAllNotifications = async () => {
    if (!user) return;

    setNotifications([]);
    setUnreadCount(0);

    const { db } = getFirebase();
    if (!db) return;

    try {
      const batch = db.batch();
      notifications.forEach(notification => {
        const notifRef = db.collection('notifications').doc(notification.id);
        batch.delete(notifRef);
      });
      await batch.commit();
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  // Get notifications by category
  const getNotificationsByCategory = (category: string) => {
    return notifications.filter(n => n.category === category);
  };

  // Get notifications by type
  const getNotificationsByType = (type: string) => {
    return notifications.filter(n => n.type === type);
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    addNotification,
    deleteNotification,
    clearAllNotifications,
    getNotificationsByCategory,
    getNotificationsByType
  };
};