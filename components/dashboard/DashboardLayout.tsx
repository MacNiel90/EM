'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  ClipboardCheck, 
  TrendingUp, 
  HelpCircle, 
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Sun,
  Moon,
  Monitor,
  Trash2,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Info,
  Award,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { useSettings } from '@/hooks/useSettings';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, userData, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications } = useNotifications();
  const { settings, updateSettings } = useSettings();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : settings.theme === 'dark' ? 'system' : 'light';
    updateSettings({ theme: newTheme });
  };

  const getThemeIcon = () => {
    return settings.theme === 'light' ? Sun : settings.theme === 'dark' ? Moon : Monitor;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Award className="w-4 h-4 text-yellow-500" />;
      case 'assignment': return <ClipboardCheck className="w-4 h-4 text-blue-500" />;
      case 'reminder': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-yellow-50 border-l-yellow-500';
      case 'assignment': return 'bg-blue-50 border-l-blue-500';
      case 'reminder': return 'bg-orange-50 border-l-orange-500';
      case 'success': return 'bg-green-50 border-l-green-500';
      case 'warning': return 'bg-yellow-50 border-l-yellow-500';
      case 'error': return 'bg-red-50 border-l-red-500';
      default: return 'bg-blue-50 border-l-blue-500';
    }
  };

  const formatNotificationTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/dashboard'
    },
    {
      name: 'My Lessons',
      href: '/dashboard/lessons',
      icon: BookOpen,
      current: pathname.startsWith('/dashboard/lessons')
    },
    {
      name: 'Assignments',
      href: '/dashboard/assignments',
      icon: ClipboardCheck,
      current: pathname.startsWith('/dashboard/assignments')
    },
    {
      name: 'Progress Reports',
      href: '/dashboard/progress',
      icon: TrendingUp,
      current: pathname.startsWith('/dashboard/progress')
    },
    {
      name: 'WAEC Prep',
      href: '/dashboard/waec-prep',
      icon: HelpCircle,
      current: pathname.startsWith('/dashboard/waec-prep')
    },
    {
      name: 'Account Settings',
      href: '/dashboard/settings',
      icon: Settings,
      current: pathname.startsWith('/dashboard/settings')
    }
  ];

  // Filter notifications based on search
  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Ghana Flag Bar */}
      <div className="h-2 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"></div>

      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-modern border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gradient">EduMath GH</span>
              </Link>
            </div>
            
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search lessons, topics..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:bg-white dark:focus:bg-gray-700 transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 font-medium transition-colors">Home</Link>
              <Link href="/courses" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 font-medium transition-colors">Courses</Link>
              <Link href="/resources" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 font-medium transition-colors">Resources</Link>
              
              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-xl">
                {(() => {
                  const ThemeIcon = getThemeIcon();
                  return <ThemeIcon className="w-5 h-5" />;
                })()}
              </Button>
              
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative" onClick={() => setNotificationsOpen(!notificationsOpen)}>
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center rounded-full animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-medium text-white">
                    {userData?.firstName?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{userData?.firstName || 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userData?.role || 'Student'}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notifications Dropdown */}
      {notificationsOpen && (
        <div className="fixed top-20 right-6 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg dark:text-white">Notifications</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setNotificationsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {notifications.length > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {unreadCount} unread of {notifications.length} total
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllNotifications}
                  className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Clear all
                </Button>
              </div>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{notifications.length === 0 ? 'No notifications yet' : 'No matching notifications'}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredNotifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-l-4 ${
                      !notification.read ? getNotificationBgColor(notification.type) : 'border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-medium text-sm truncate ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-2 ml-2">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {formatNotificationTime(notification.createdAt)}
                            </span>
                            {notification.priority === 'high' && (
                              <Badge variant="destructive" className="text-xs">High</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="text-xs"
                          >
                            Mark as read
                          </Button>
                        )}
                        {notification.actionUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                              router.push(notification.actionUrl!);
                              setNotificationsOpen(false);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-700"
                          >
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-72 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-modern border-r border-gray-200/50 dark:border-gray-700/50 min-h-screen`}>
          <div className="p-6 space-y-6">
            {/* User Profile */}
            <div className="flex items-center pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-semibold">
                  {userData?.firstName?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {userData?.fullName || 'User'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{userData?.grade || 'Student'}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                      item.current
                        ? 'gradient-primary text-white shadow-lg transform scale-105'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:transform hover:scale-105'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className={`w-5 h-5 mr-3 transition-transform duration-300 ${item.current ? '' : 'group-hover:scale-110'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            
            {/* Quick Stats in Sidebar */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
              <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-3">Quick Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Lessons Completed</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">0</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Study Streak</span>
                  <span className="font-medium text-green-600 dark:text-green-400">1 day</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Next Goal</span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">Complete 1st lesson</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
      
      {/* Click outside to close notifications */}
      {notificationsOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setNotificationsOpen(false)}
        ></div>
      )}
    </div>
  );
}