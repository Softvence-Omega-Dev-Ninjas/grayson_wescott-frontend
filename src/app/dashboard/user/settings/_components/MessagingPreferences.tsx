'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useUser from '@/hooks/useUser';
import { updateMessagingPreferences } from '@/services/auth';
import { MessageSquare } from 'lucide-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const MessagingPreferences = () => {
  const { user, setUser } = useUser();
  console.log(user);

  // ✅ Controlled local state
  const [directMessages, setDirectMessages] = useState<boolean>(
    user?.allowDirectMessages ?? false,
  );
  const [emailReminders, setEmailReminders] = useState<boolean>(
    user?.allowEmailMessages ?? false,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  console.log('direeeeeeeeeeeeeeee', directMessages);

  useEffect(() => {
    setDirectMessages(user?.allowDirectMessages ?? false);
    setEmailReminders(user?.allowEmailMessages ?? false);
  }, [user?.allowDirectMessages, user?.allowEmailMessages]);

  // ✅ Track changes
  const handleToggle = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean,
  ) => {
    setter(value);
    setIsChanged(true);
  };

  const handleSave = async () => {
    const userTimeZone = DateTime.local().zoneName;
    console.log(userTimeZone);

    const preferences = {
      timezone: userTimeZone,
      allowDirectMessages: directMessages,
      allowEmailMessages: emailReminders,
    };

    console.log('🧩 Preferences to save:', preferences);

    try {
      setIsLoading(true);
      // 🚀 Call API
      const res = await updateMessagingPreferences(preferences);
      console.log('++++++++++++++++++', res);

      if (res?.success) {
        toast.success('Preferences updated successfully!');
        setUser(res?.data);
        setIsChanged(false);
      } else {
        toast.error(res?.message || 'Failed to update preferences.');
      }
    } catch {
      toast.error('Something went wrong while saving preferences.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-primary-200 border-2 border-secondary rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Messaging Preferences
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ✅ Direct Messages */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm">Direct Messages</p>
            <p className="text-gray-400 text-xs">
              Allow direct messages with your coach
            </p>
          </div>
          <Switch
            className="cursor-pointer bg-secondary"
            checked={directMessages}
            onCheckedChange={(value) => handleToggle(setDirectMessages, value)}
          />
        </div>

        {/* ✅ Email Reminders */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm">Email Reminders</p>
            <p className="text-gray-400 text-xs">
              Get reminders about missed messages
            </p>
          </div>
          <Switch
            className="cursor-pointer"
            checked={emailReminders}
            onCheckedChange={(value) => handleToggle(setEmailReminders, value)}
          />
        </div>

        {/* ✅ Save Button */}
        <Button
          onClick={handleSave}
          disabled={!isChanged || isLoading}
          className="w-full border-0 cursor-pointer bg-[#2A2D33] hover:bg-gray-600 text-white"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MessagingPreferences;
