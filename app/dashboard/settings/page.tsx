// app/dashboard/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';
import { useNotifications } from '@/hooks/useNotifications';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import LoadingSpinner from '@/app/dashboard/LoadingSpinner/page';
import { 
  User, 
  Palette, 
  Bell, 
  Shield, 
  BookOpen, 
  Accessibility, 
  Globe, 
  Moon, 
  Sun, 
  Monitor,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  Clock,
  Target,
  Zap,
  Settings as SettingsIcon,
  Trash2,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Info,
  Sliders,
  Layout,
  Gamepad2
} from 'lucide-react';

export default function SettingsPage() {
  const { user, userData, loading: authLoading, updateUserProfile } = useAuth();
  const { settings, loading: settingsLoading, updateSettings, requestNotificationPermission } = useSettings();
  const { clearAllNotifications, notifications } = useNotifications();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
      });
    }
  }, [userData]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    try {
      if (updateUserProfile) {
        await updateUserProfile(formData);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingsChange = async (key: string, value: any) => {
    const keys = key.split('.');
    let updatedSettings = { ...settings };
    
    if (keys.length === 2) {
      updatedSettings = {
        ...updatedSettings,
        [keys[0]]: {
          ...updatedSettings[keys[0] as keyof typeof updatedSettings],
          [keys[1]]: value
        }
      };
    } else {
      updatedSettings = { ...updatedSettings, [key]: value };
    }
    
    await updateSettings(updatedSettings);
  };

  const handleNotificationPermission = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      await handleSettingsChange('notifications.push', true);
    }
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'edumath-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string);
        updateSettings(importedSettings);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } catch (error) {
        console.error('Error importing settings:', error);
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    };
    reader.readAsText(file);
  };

  if (authLoading || settingsLoading || !userData) return <LoadingSpinner />;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Settings</h1>
            <p className="text-xl text-gray-600">Customize your learning experience</p>
          </div>
          
          {saveStatus !== 'idle' && (
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
              saveStatus === 'saving' ? 'bg-blue-100 text-blue-700' :
              saveStatus === 'saved' ? 'bg-green-100 text-green-700' :
              'bg-red-100 text-red-700'
            }`}>
              {saveStatus === 'saving' && <RefreshCw className="w-4 h-4 animate-spin" />}
              {saveStatus === 'saved' && <CheckCircle className="w-4 h-4" />}
              {saveStatus === 'error' && <AlertTriangle className="w-4 h-4" />}
              <span className="text-sm font-medium">
                {saveStatus === 'saving' ? 'Saving...' :
                 saveStatus === 'saved' ? 'Settings saved!' :
                 'Error saving settings'}
              </span>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white shadow-modern rounded-xl p-2">
            <TabsTrigger value="profile" className="flex items-center space-x-2 rounded-lg">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2 rounded-lg">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2 rounded-lg">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2 rounded-lg">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center space-x-2 rounded-lg">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Learning</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center space-x-2 rounded-lg">
              <Accessibility className="w-4 h-4" />
              <span className="hidden sm:inline">Access</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center space-x-2 rounded-lg">
              <Sliders className="w-4 h-4" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <User className="w-6 h-6 mr-3 text-blue-500" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={formData.firstName} 
                      onChange={e => setFormData({...formData, firstName: e.target.value})}
                      className="mt-2 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={formData.lastName} 
                      onChange={e => setFormData({...formData, lastName: e.target.value})}
                      className="mt-2 rounded-xl"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="mt-2 rounded-xl"
                  />
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium">Email Address</Label>
                    <div className="mt-2 p-3 bg-gray-100 rounded-xl text-gray-700 font-medium">
                      {user?.email}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Current Grade</Label>
                    <div className="mt-2 p-3 bg-blue-100 rounded-xl">
                      <Badge className="bg-blue-500 text-white font-semibold">{userData.grade}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Contact support to change grade</p>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleSaveProfile} 
                    disabled={isSaving}
                    className="btn-modern gradient-primary text-white rounded-xl px-8"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="border-0 shadow-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Palette className="w-6 h-6 mr-3 text-purple-500" />
                  Appearance & Theme
                </CardTitle>
                <CardDescription>Customize how EduMath GH looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Label className="text-sm font-medium mb-4 block">Theme Preference</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'light', label: 'Light', icon: Sun, desc: 'Clean and bright' },
                      { value: 'dark', label: 'Dark', icon: Moon, desc: 'Easy on the eyes' },
                      { value: 'system', label: 'System', icon: Monitor, desc: 'Matches your device' }
                    ].map((theme) => (
                      <Card 
                        key={theme.value}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          settings.theme === theme.value 
                            ? 'ring-2 ring-blue-500 bg-blue-50' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleSettingsChange('theme', theme.value)}
                      >
                        <CardContent className="p-6 text-center">
                          <theme.icon className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                          <h3 className="font-semibold mb-1">{theme.label}</h3>
                          <p className="text-sm text-gray-500">{theme.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium mb-4 block">Language</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingsChange('language', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4" />
                          <span>English</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="tw">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4" />
                          <span>Twi</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ga">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4" />
                          <span>Ga</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium mb-4 block">Display Options</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Layout className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Compact Mode</h4>
                          <p className="text-sm text-gray-500">Reduce spacing and padding</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.display.compactMode}
                        onCheckedChange={(checked) => handleSettingsChange('display.compactMode', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Zap className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Show Animations</h4>
                          <p className="text-sm text-gray-500">Enable smooth transitions and effects</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.display.showAnimations}
                        onCheckedChange={(checked) => handleSettingsChange('display.showAnimations', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Eye className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Color Blind Mode</h4>
                          <p className="text-sm text-gray-500">Adjust colors for better visibility</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.display.colorBlindMode}
                        onCheckedChange={(checked) => handleSettingsChange('display.colorBlindMode', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Bell className="w-6 h-6 mr-3 text-orange-500" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how and when you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email', icon: Mail },
                    { key: 'push', label: 'Push Notifications', desc: 'Browser and mobile notifications', icon: Smartphone },
                    { key: 'assignments', label: 'Assignment Reminders', desc: 'Get notified about due assignments', icon: Clock },
                    { key: 'achievements', label: 'Achievement Alerts', desc: 'Celebrate your progress milestones', icon: Target },
                    { key: 'reminders', label: 'Study Reminders', desc: 'Daily learning reminders', icon: Zap },
                    { key: 'sound', label: 'Sound Effects', desc: 'Play sounds for notifications and games', icon: Volume2 }
                  ].map((notification) => (
                    <div key={notification.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <notification.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{notification.label}</h4>
                          <p className="text-sm text-gray-500">{notification.desc}</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.notifications[notification.key as keyof typeof settings.notifications]}
                        onCheckedChange={(checked) => {
                          if (notification.key === 'push' && checked) {
                            handleNotificationPermission();
                          } else {
                            handleSettingsChange(`notifications.${notification.key}`, checked);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <Info className="w-5 h-5 text-blue-500" />
                    <h4 className="font-medium text-blue-900">Notification Management</h4>
                  </div>
                  <p className="text-sm text-blue-700 mb-4">
                    You have {notifications.length} total notifications. Clear old ones to keep your inbox organized.
                  </p>
                  <Button
                    onClick={clearAllNotifications}
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-0 shadow-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Shield className="w-6 h-6 mr-3 text-green-500" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control your privacy and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  {[
                    { key: 'profileVisible', label: 'Public Profile', desc: 'Allow others to see your profile', icon: Eye },
                    { key: 'progressVisible', label: 'Progress Sharing', desc: 'Share your learning progress', icon: Target },
                    { key: 'allowDataCollection', label: 'Analytics', desc: 'Help improve EduMath GH with usage data', icon: Zap }
                  ].map((privacy) => (
                    <div key={privacy.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <privacy.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{privacy.label}</h4>
                          <p className="text-sm text-gray-500">{privacy.desc}</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.privacy[privacy.key as keyof typeof settings.privacy]}
                        onCheckedChange={(checked) => handleSettingsChange(`privacy.${privacy.key}`, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Settings */}
          <TabsContent value="learning" className="space-y-6">
            <Card className="border-0 shadow-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <BookOpen className="w-6 h-6 mr-3 text-blue-500" />
                  Learning Preferences
                </CardTitle>
                <CardDescription>Customize your learning experience and goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-4 block">Difficulty Level</Label>
                  <Select value={settings.learning.difficultyLevel} onValueChange={(value) => handleSettingsChange('learning.difficultyLevel', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy - Take your time</SelectItem>
                      <SelectItem value="medium">Medium - Balanced pace</SelectItem>
                      <SelectItem value="hard">Hard - Challenge yourself</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Study Reminders</h4>
                      <p className="text-sm text-gray-500">Get daily reminders to study</p>
                    </div>
                    <Switch
                      checked={settings.learning.studyReminders}
                      onCheckedChange={(checked) => handleSettingsChange('learning.studyReminders', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Auto-play Lessons</h4>
                      <p className="text-sm text-gray-500">Automatically start next lesson</p>
                    </div>
                    <Switch
                      checked={settings.learning.autoPlay}
                      onCheckedChange={(checked) => handleSettingsChange('learning.autoPlay', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Show Hints</h4>
                      <p className="text-sm text-gray-500">Display helpful hints during lessons</p>
                    </div>
                    <Switch
                      checked={settings.learning.showHints}
                      onCheckedChange={(checked) => handleSettingsChange('learning.showHints', checked)}
                    />
                  </div>
                </div>

                {settings.learning.studyReminders && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Reminder Time</Label>
                    <Input
                      type="time"
                      value={settings.learning.reminderTime}
                      onChange={(e) => handleSettingsChange('learning.reminderTime', e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium mb-2 block">Weekly Study Goal (minutes)</Label>
                  <Input
                    type="number"
                    min="60"
                    max="2100"
                    step="30"
                    value={settings.learning.weeklyGoal}
                    onChange={(e) => handleSettingsChange('learning.weeklyGoal', parseInt(e.target.value))}
                    className="rounded-xl"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Current goal: {Math.round(settings.learning.weeklyGoal / 60)} hours per week
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility Settings */}
          <TabsContent value="accessibility" className="space-y-6">
            <Card className="border-0 shadow-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Accessibility className="w-6 h-6 mr-3 text-purple-500" />
                  Accessibility Options
                </CardTitle>
                <CardDescription>Make EduMath GH more accessible and comfortable to use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-4 block">Font Size</Label>
                  <Select value={settings.accessibility.fontSize} onValueChange={(value) => handleSettingsChange('accessibility.fontSize', value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium (Default)</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'highContrast', label: 'High Contrast', desc: 'Increase color contrast for better visibility', icon: Eye },
                    { key: 'reduceMotion', label: 'Reduce Motion', desc: 'Minimize animations and transitions', icon: EyeOff },
                    { key: 'screenReader', label: 'Screen Reader Support', desc: 'Optimize for screen reading software', icon: Volume2 },
                    { key: 'keyboardNavigation', label: 'Keyboard Navigation', desc: 'Enhanced keyboard shortcuts and navigation', icon: Gamepad2 }
                  ].map((accessibility) => (
                    <div key={accessibility.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <accessibility.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{accessibility.label}</h4>
                          <p className="text-sm text-gray-500">{accessibility.desc}</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.accessibility[accessibility.key as keyof typeof settings.accessibility]}
                        onCheckedChange={(checked) => handleSettingsChange(`accessibility.${accessibility.key}`, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card className="border-0 shadow-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Sliders className="w-6 h-6 mr-3 text-gray-500" />
                  Advanced Settings
                </CardTitle>
                <CardDescription>Import, export, and manage your settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Settings Management</h4>
                    <div className="space-y-3">
                      <Button
                        onClick={exportSettings}
                        variant="outline"
                        className="w-full justify-start rounded-xl"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Settings
                      </Button>
                      
                      <div>
                        <input
                          type="file"
                          accept=".json"
                          onChange={importSettings}
                          className="hidden"
                          id="import-settings"
                        />
                        <Button
                          onClick={() => document.getElementById('import-settings')?.click()}
                          variant="outline"
                          className="w-full justify-start rounded-xl"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Import Settings
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Reset Options</h4>
                    <div className="space-y-3">
                      <Button
                        onClick={() => updateSettings(defaultSettings)}
                        variant="outline"
                        className="w-full justify-start rounded-xl border-orange-300 text-orange-700 hover:bg-orange-50"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset to Defaults
                      </Button>
                      
                      <Button
                        onClick={clearAllNotifications}
                        variant="outline"
                        className="w-full justify-start rounded-xl border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All Data
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-yellow-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <h4 className="font-medium text-yellow-900">Debug Information</h4>
                  </div>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p>User ID: {user?.uid}</p>
                    <p>Settings Version: 1.0</p>
                    <p>Last Updated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}