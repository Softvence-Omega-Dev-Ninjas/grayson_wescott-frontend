'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, Trash2 } from 'lucide-react';
import a1 from '../../../../../assets/dashboard/messages/Avatar1.png';
import a2 from '../../../../../assets/dashboard/messages/Avatar2.png';

const profileData = {
  fullName: 'Graysam',
  email: 'graysam@gmail.com',
  twoFactorEnabled: true,
};

const adminsData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Admin',
    avatar: a1,
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Manager',
    avatar: a2,
  },
];

export function AdminProfileTab() {
  return (
    <div className="space-y-6 text-white">
      <div className="grid grid-cols-1  gap-6">
        {/* My Profile */}
        <Card className="bg-black border-secondary border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">My Profile</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="bg-secondary text-white border-transparent cursor-pointer hover:bg-secondary hover:text-white rounded-none"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-white">
                Full Name
              </Label>
              <Input
                id="fullname"
                defaultValue={profileData.fullName}
                className="text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email Address
              </Label>
              <Input
                id="email"
                defaultValue={profileData.email}
                className="text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="flex gap-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="flex-1 text-white"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-secondary text-white border-transparent cursor-pointer hover:bg-secondary hover:text-white rounded-none"
                >
                  Reset Password
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-300">
                  {profileData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <Switch defaultChecked={profileData.twoFactorEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Manage Admins */}
        <Card className="bg-black border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Manage Admins</CardTitle>
              <Button size="sm" className="bg-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add New Admin
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 ">
              {adminsData.map((admin) => (
                <div
                  key={admin.id}
                  className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between p-3 border border-gray-900  rounded-lg"
                >
                  <div className="flex items-center gap-3 border ">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={admin.avatar.src || '/placeholder.svg'}
                        alt={admin.name}
                      />
                      <AvatarFallback>
                        {admin.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{admin.name}</p>
                      <p className="text-sm text-gray-300">{admin.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={admin.role === 'Admin' ? 'default' : 'secondary'}
                      className="text-white px-3 py-2 bg-secondary"
                    >
                      {admin.role}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="  bg-secondary text-white border-transparent cursor-pointer hover:bg-secondary hover:text-white rounded-none"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="  bg-secondary text-white border-transparent cursor-pointer hover:bg-secondary hover:text-white rounded-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
