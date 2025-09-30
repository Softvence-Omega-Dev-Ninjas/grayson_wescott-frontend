'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Bell, Mail, CreditCard, Shield } from 'lucide-react';

const adminAlertSettings = [
  {
    id: 'new-purchase',
    label: 'New Purchase',
    defaultChecked: true,
  },
  {
    id: 'refund-issued',
    label: 'Refund Issued',
    defaultChecked: true,
  },
  {
    id: 'new-client',
    label: 'New Client Joined',
    defaultChecked: true,
  },
];

const recentNotifications = [
  {
    id: 1,
    icon: Mail,
    title: 'Welcome Email',
    description: 'Sent to john.doe@example.com',
    time: '2 hours ago',
    status: 'delivered',
    color: 'text-blue-500',
  },
  {
    id: 2,
    icon: CreditCard,
    title: 'Payment Success',
    description: 'Sent to john.doe@example.com',
    time: '4 hours ago',
    status: 'delivered',
    color: 'text-green-500',
  },
  {
    id: 3,
    icon: Shield,
    title: 'Module Unlock',
    description: 'Sent to john.doe@example.com',
    time: '6 hours ago',
    status: 'delivered',
    color: 'text-purple-500',
  },
];

const autoRenewalSetting = {
  title: 'Enable Auto Renewal',
  description: 'Automatically renew subscriptions when they expire',
  defaultChecked: true,
};

export function NotificationsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admin Alerts */}
        <Card className="bg-black text-white border-gray-900">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Admin Alerts</CardTitle>
            </div>
            <p className="text-sm text-gray-400">
              Choose which events trigger admin notifications
            </p>
          </CardHeader>
          <CardContent className="space-y-4 border-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{autoRenewalSetting.title}</p>
                <p className="text-sm text-gray-400">
                  {autoRenewalSetting.description}
                </p>
              </div>
              <Switch defaultChecked={autoRenewalSetting.defaultChecked} />
            </div>
          </CardContent>
        </Card>

        {/* Admin Alert Settings */}
        <Card className="bg-black text-white border-gray-900">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Admin Alerts</CardTitle>
            </div>
            <p className="text-sm text-gray-400">
              Choose which events trigger admin notifications
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {adminAlertSettings.map((setting) => (
                <div key={setting.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={setting.id}
                    defaultChecked={setting.defaultChecked}
                    className="text-white border-gray-700"
                  />
                  <label htmlFor={setting.id} className="text-sm font-medium">
                    {setting.label}
                  </label>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent text-white border-gray-700 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              Save Alert Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card className="bg-black text-white border-gray-900">
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <p className="text-sm text-gray-400">
            View recently sent notifications
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 bg-white/20 rounded-lg ${notification.color}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-400">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        {notification.time}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-green-500 border-green-500 text-xs"
                      >
                        {notification.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
