'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

import ChangePassword from './_components/ChangePassword/ChangePassword';
import ManageAdmin from './_components/ManageAdmin/ManageAdmin';
import { PaymentsTab } from './_components/PaymentsTab';
import UpdateProfile from './_components/UpdateProfile/UpdateProfile';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('admin-profile');

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-primary-100 grid w-full grid-cols-3 p-1 h-auto rounded-none">
          <TabsTrigger
            value="admin-profile"
            className="text-sm md:text-base font-medium py-2"
          >
            Admin Profile
          </TabsTrigger>
          <TabsTrigger
            value="manage-admin"
            className="text-sm md:text-base font-medium py-2"
          >
            Manage Admin
          </TabsTrigger>

          <TabsTrigger
            value="payments"
            className="text-sm md:text-base font-medium py-2"
          >
            Payments
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="admin-profile" className="space-y-6">
            <UpdateProfile />
            <ChangePassword />
          </TabsContent>
          <TabsContent value="manage-admin" className="space-y-6">
            <ManageAdmin />
          </TabsContent>
          <TabsContent value="payments" className="space-y-6">
            <PaymentsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
