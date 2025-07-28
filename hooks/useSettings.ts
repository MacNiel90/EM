// hooks/useSettings.ts
'use client';

import { useState, useEffect } from 'react';
import { getFirebase } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'tw' | 'ga'; // English, Twi, Ga
  notifications: {
    email: boolean;
    push: boolean;
    assignments: boolean;
    achievements: boolean;
    reminders: boolean;
    sound: boolean;
  };
  privacy: {
    profileVisible: boolean;
    progressVisible: boolean;
    allowDataCollection: boolean;
  };
  learning: {
    difficultyLevel: 'easy' | 'medium' | 'hard';
    studyReminders: boolean;
    reminderTime: string; // HH:MM format
    weeklyGoal: number; // minutes per week
    autoPlay: boolean;
    showHints: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    reduceMotion: boolean;
    screenReader: boolean;
    keyboardNavigation: boolean;
  };
  display: {
    compactMode: boolean;
    showAnimations: boolean;
    colorBlindMode: boolean;
  };
}

const defaultSettings: UserSettings = {
  theme: 'light',
  language: 'en',
  notifications: {
    email: true,
    push: true,
    assignments: true,
    achievements: true,
    reminders: true,
    sound: true
  },
  privacy: {
    profileVisible: true,
    progressVisible: true,
    allowDataCollection: true
  },
  learning: {
    difficultyLevel: 'medium',
    studyReminders: true,
    reminderTime: '18:00',
    weeklyGoal: 300, // 5 hours per week
    autoPlay: false,
    showHints: true
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false,
    screenReader: false,
    keyboardNavigation: false
  },
  display: {
    compactMode: false,
    showAnimations: true,
    colorBlindMode: false
  }
};

export const useSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  // Load settings from Firebase
  useEffect(() => {
    const loadSettings = async () => {
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
        const doc = await db.collection('settings').doc(user.uid).get();
        
        if (doc.exists) {
          const data = doc.data() as UserSettings;
          const mergedSettings = { ...defaultSettings, ...data };
          setSettings(mergedSettings);
          applySettings(mergedSettings);
        } else {
          // Create default settings for new user
          await db.collection('settings').doc(user.uid).set(defaultSettings);
          applySettings(defaultSettings);
        }

      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user]);

  // Update settings
  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    if (!user) return;

    const { db } = getFirebase();
    if (!db) return;

    try {
      const updatedSettings = { ...settings, ...newSettings };
      
      // Deep merge nested objects
      if (newSettings.notifications) {
        updatedSettings.notifications = { ...settings.notifications, ...newSettings.notifications };
      }
      if (newSettings.privacy) {
        updatedSettings.privacy = { ...settings.privacy, ...newSettings.privacy };
      }
      if (newSettings.learning) {
        updatedSettings.learning = { ...settings.learning, ...newSettings.learning };
      }
      if (newSettings.accessibility) {
        updatedSettings.accessibility = { ...settings.accessibility, ...newSettings.accessibility };
      }
      if (newSettings.display) {
        updatedSettings.display = { ...settings.display, ...newSettings.display };
      }
      
      await db.collection('settings').doc(user.uid).set(updatedSettings, { merge: true });
      setSettings(updatedSettings);
      applySettings(updatedSettings);

    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  // Apply settings to the DOM and browser
  const applySettings = (settingsToApply: UserSettings) => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    // Apply theme
    applyTheme(settingsToApply.theme);
    
    // Apply accessibility settings
    root.style.fontSize = settingsToApply.accessibility.fontSize === 'small' ? '14px' : 
                         settingsToApply.accessibility.fontSize === 'large' ? '18px' : '16px';
    
    // High contrast mode
    if (settingsToApply.accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (settingsToApply.accessibility.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Compact mode
    if (settingsToApply.display.compactMode) {
      root.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
    }

    // Color blind mode
    if (settingsToApply.display.colorBlindMode) {
      root.classList.add('color-blind-mode');
    } else {
      root.classList.remove('color-blind-mode');
    }

    // Animations
    if (!settingsToApply.display.showAnimations) {
      root.classList.add('no-animations');
    } else {
      root.classList.remove('no-animations');
    }

    // Store theme preference
    localStorage.setItem('theme', settingsToApply.theme);
    localStorage.setItem('settings', JSON.stringify(settingsToApply));
  };

  // Apply theme to document
  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#1f2937' : '#ffffff');
    }
  };

  // Schedule study reminders
  const scheduleReminder = (time: string) => {
    if (!settings.learning.studyReminders || !('Notification' in window)) return;

    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('EduMath GH Study Reminder', {
          body: 'Time for your daily math practice! 📚',
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
      }
      
      // Schedule next day's reminder
      scheduleReminder(time);
    }, timeUntilReminder);
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  };

  // Initialize notifications and reminders
  useEffect(() => {
    if (!loading && settings.notifications.push) {
      requestNotificationPermission();
    }

    if (!loading && settings.learning.studyReminders) {
      scheduleReminder(settings.learning.reminderTime);
    }
  }, [loading, settings.notifications.push, settings.learning.studyReminders, settings.learning.reminderTime]);

  // Listen for system theme changes
  useEffect(() => {
    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [settings.theme]);

  return {
    settings,
    loading,
    updateSettings,
    applyTheme,
    requestNotificationPermission
  };
};