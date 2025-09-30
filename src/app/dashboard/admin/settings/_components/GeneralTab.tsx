'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, Settings, Palette } from 'lucide-react';

const platformSettings = {
  platformName: 'Carbon Engines',
  logo: {
    current: null,
    uploadText: 'Upload New',
  },
};

const themeOptions = [
  { id: 'dark', label: 'Dark', value: 'dark' },
  { id: 'light', label: 'Light', value: 'light' },
];

const timezoneOptions = [
  { value: 'utc', label: 'UTC' },
  { value: 'est', label: 'EST' },
  { value: 'pst', label: 'PST' },
  { value: 'cst', label: 'CST' },
];

const themeSettings = {
  defaultTheme: 'dark',
  defaultTimezone: 'utc',
};

export function GeneralTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Settings */}
        <Card className="bg-[#151519]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-white" />
              <CardTitle className="text-white">Platform Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="platform-name" className=" text-white">
                Platform Name
              </Label>
              <Input
                id="platform-name"
                className="text-white"
                defaultValue={platformSettings.platformName}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Dashboard Logo</Label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary cursor-pointer rounded-lg flex items-center justify-center">
                  <Upload className="h-5 w-5 text-muted-foreground " />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-secondary text-white border-none cursor-pointer hover:bg-transparent hover:bg-secondary hover:text-white"
                >
                  {platformSettings.logo.uploadText}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme & Display */}
        <Card className="bg-[#151519]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-white" />
              <CardTitle className="text-white">Theme & Display</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-white">Primary Theme</Label>
              <RadioGroup
                defaultValue={themeSettings.defaultTheme}
                className="flex gap-4"
              >
                {themeOptions.map((theme) => (
                  <div key={theme.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      className="bg-white"
                      value={theme.value}
                      id={theme.id}
                    />
                    <Label className="text-white" htmlFor={theme.id}>
                      {theme.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Default Timezone</Label>
              <Select defaultValue={themeSettings.defaultTimezone}>
                <SelectTrigger className="text-white">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent className="text-white">
                  {timezoneOptions.map((timezone) => (
                    <SelectItem key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
