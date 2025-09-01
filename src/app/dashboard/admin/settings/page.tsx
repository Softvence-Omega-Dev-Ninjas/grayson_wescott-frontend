"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminProfileTab } from "./_components/AdminProfileTab"
import { ClientsAccessTab } from "./_components/ClientAccessTab"
import { GeneralTab } from "./_components/GeneralTab"
import { NotificationsTab } from "./_components/NotificationsTab"
import { SecurityTab } from "./_components/SecurityTab"
import { PaymentsTab } from "./_components/PaymentsTab"


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="min-h-screen bg-black p-4 md:p-6 lg:p-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
  <TabsList className="bg-[#151519] grid w-full grid-cols-3 md:grid-cols-6 p-1 h-auto">
    <TabsTrigger
      value="general"
      className="text-xs md:text-sm py-2 text-white "
    >
      General
    </TabsTrigger>
    <TabsTrigger
      value="admin-profile"
      className="text-xs md:text-sm py-2 text-white "
    >
      Admin Profile
    </TabsTrigger>
    <TabsTrigger
      value="clients-access"
      className="text-xs md:text-sm py-2 text-white "
    >
      Clients Access
    </TabsTrigger>
    <TabsTrigger
      value="payments"
      className="text-xs md:text-sm py-2 text-white "
    >
      Payments
    </TabsTrigger>
    <TabsTrigger
      value="notifications"
      className="text-xs md:text-sm py-2 text-white "
    >
      Notifications
    </TabsTrigger>
    <TabsTrigger
      value="security"
      className="text-xs md:text-sm py-2 text-white "
    >
      Security
    </TabsTrigger>
  </TabsList>

  <div className="mt-6">
    <TabsContent value="general" className="space-y-6">
      <GeneralTab />
    </TabsContent>
    <TabsContent value="admin-profile" className="space-y-6">
      <AdminProfileTab />
    </TabsContent>
    <TabsContent value="clients-access" className="space-y-6">
      <ClientsAccessTab />
    </TabsContent>
    <TabsContent value="payments" className="space-y-6">
      <PaymentsTab />
    </TabsContent>
    <TabsContent value="notifications" className="space-y-6">
      <NotificationsTab />
    </TabsContent>
    <TabsContent value="security" className="space-y-6">
      <SecurityTab />
    </TabsContent>
  </div>
</Tabs>

    </div>
  )
}
