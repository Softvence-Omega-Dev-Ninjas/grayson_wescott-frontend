'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Smartphone } from 'lucide-react';

const notificationSettings = [
  {
    id: 1,
    title: 'Direct messages',
    description: 'Messages from people you follow',
    defaultChecked: true,
  },
  {
    id: 2,
    title: 'Show desktop notifications',
    description: 'Create desktop alerts when you work on default setting',
    defaultChecked: true,
  },
  {
    id: 3,
    title: 'Show email notifications',
    description: 'Daily Settings, these Notifications',
    defaultChecked: false,
  },
  {
    id: 4,
    title: 'Show chat notifications',
    description: 'To prevent duplicate mobile notifications',
    defaultChecked: false,
  },
];

const twoFactorData = {
  enabled: true,
  title: 'Two-Factor Authentication',
  description: 'Add an extra layer of security to your account',
  authenticatorApp: {
    name: 'Authenticator App',
    description: 'Use an app like Google Authenticator or Authy',
    icon: Smartphone,
  },
};

export function SecurityTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1  gap-6">
        {/* Two-Factor Authentication */}
        <Card className="bg-black text-white border-gray-900">
          <CardHeader>
            <CardTitle>{twoFactorData.title}</CardTitle>
            <p className="text-sm text-gray-400">{twoFactorData.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{twoFactorData.title}</p>
                <p className="text-sm text-gray-400">
                  {twoFactorData.description}
                </p>
              </div>
              <Switch defaultChecked={twoFactorData.enabled} />
            </div>

            <div className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <twoFactorData.authenticatorApp.icon className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">
                    {twoFactorData.authenticatorApp.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {twoFactorData.authenticatorApp.description}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-black text-white border-gray-900">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {notificationSettings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{setting.title}</p>
                  <p className="text-sm text-gray-400">{setting.description}</p>
                </div>
                <Switch
                  defaultChecked={setting.defaultChecked}
                  className="text-white"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
