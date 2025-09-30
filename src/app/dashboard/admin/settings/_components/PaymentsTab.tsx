"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FileText,
  Download,
  BarChart3,
  DollarSign,
  Users,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const statsData = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$47,283",
    icon: DollarSign,
    iconColor: "text-green-500",
    bgColor: "bg-green-500/20",
    change: null,
  },
  {
    id: 2,
    title: "Active Subscriptions",
    value: "1,240",
    icon: Users,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/20",
    change: "+8.2%",
    changeColor: "text-green-500",
  },
  {
    id: 3,
    title: "Pending Payments",
    value: "127",
    icon: AlertCircle,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500/20",
    change: "$8,540",
    changeColor: "text-orange-500",
  },
  {
    id: 4,
    title: "Refund Requests",
    value: "18",
    icon: RefreshCw,
    iconColor: "text-red-500",
    bgColor: "bg-red-500/20",
    change: "$520",
    changeColor: "text-red-500",
  },
];

const subscriptionsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@gmail.com",
    plan: "Premium",
    billing: "Monthly",
    nextPayment: "Jan 15, 2024",
    status: "Active",
  },
  {
    id: 2,
    name: "Johnson",
    email: "johnson@gmail.com",
    plan: "Atlantis",
    billing: "Monthly",
    nextPayment: "Jan 15, 2024",
    status: "Active",
  },
  {
    id: 3,
    name: "Jihad",
    email: "jihad@gmail.com",
    plan: "Basic",
    billing: "Monthly",
    nextPayment: "Jan 15, 2024",
    status: "Active",
  },
  {
    id: 4,
    name: "Aminul",
    email: "aminul@gmail.com",
    plan: "Premium",
    billing: "Monthly",
    nextPayment: "Jan 15, 2024",
    status: "Active",
  },
];

const subscriptionTiers = [
  { id: 1, name: "Basic Plan", price: "$29/month" },
  { id: 2, name: "Premium Plan", price: "$79/month" },
  { id: 3, name: "Atlantis Plan", price: "$199/month" },
];

const refundPolicyOptions = [
  { id: "7days", label: "Allow refunds within 7 days" },
  { id: "14days", label: "Allow refunds within 14 days" },
  { id: "30days", label: "Allow refunds within 30 days" },
  { id: "no-refunds", label: "No refunds allowed" },
];

const exportButtons = [
  { id: 1, label: "Generate PDF", icon: FileText },
  { id: 2, label: "Export CSV", icon: Download },
  { id: 3, label: "Weekly Summary", icon: BarChart3 },
];

export function PaymentsTab() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.id} className="bg-[#151519]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                    <IconComponent className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm text-white">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                      {stat.change && (
                        <span className={`text-sm ml-1 ${stat.changeColor}`}>
                          {stat.change}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="">
        {/* Subscriptions Table */}
        <Card className="bg-black text-white border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Subscriptions</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-9 w-48 text-white placeholder-gray-400"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="border-none">
            <div className="space-y-4">
              {subscriptionsData.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{sub.name}</p>
                    <p className="text-sm text-gray-400">{sub.email}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="secondary" className="text-white/70">
                      {sub.plan}
                    </Badge>
                    <span className="text-gray-400">{sub.billing}</span>
                    <span className="text-gray-400">{sub.nextPayment}</span>
                    <Badge
                      variant="outline"
                      className="text-green-500 border-green-500"
                    >
                      {sub.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-500 p-0"
                      >
                        Upgrade
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-red-500 p-0"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admin Settings */}
        <div className="space-y-6 ">
          <Card className="bg-black text-white border-none ">
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 grid md:grid-cols-2 gap-5 p-4">
              <div className="border flex flex-col gap-2 border-gray-900 p-4">
                <h4 className="font-medium mb-3">Subscription Tiers</h4>
                <div className="space-y-3">
                  {subscriptionTiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="flex items-center justify-between p-3 border border-gray-900 rounded-lg"
                    >
                      <span>
                        {tier.name} - {tier.price}
                      </span>
                      <Button variant="link" size="sm" className="text-white">
                        Edit
                      </Button>
                    </div>
                  ))}
                  <Button variant="link" size="sm" className="text-white p-0">
                    + Add New Tier
                  </Button>
                </div>
                <div className="border border-gray-900 flex justify-center items-center p-4 cursor-pointer">
                  <h1>Create Coupon Code</h1>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="border border-gray-900 p-2">
                  <h4 className="font-medium mb-3">Refund Policy</h4>
                  <RadioGroup defaultValue="7days" className="space-y-2">
                    {refundPolicyOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="text-white"
                        />
                        <Label htmlFor={option.id}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="border-gray-900 border p-2">
                  <h4 className="font-medium mb-3">Auto Renewal</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Auto Renewal</p>
                      <p className="text-sm text-white/70">
                        Automatically renew subscriptions when they expire
                      </p>
                    </div>
                    <Switch defaultChecked className="text-white" />
                  </div>
                </div>

                <div className="border-gray-900 border p-2">
                  <h4 className="font-medium mb-3">Payment Logs Visibility</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Enable Payment Logs Visibility
                      </p>
                      <p className="text-sm text-white/70">
                        Show or hide the payment logs section for admins
                      </p>
                    </div>
                    <Switch defaultChecked className="text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-row justify-between bg-black">
            <CardHeader>
              <CardTitle className="text-white">Export & Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {exportButtons.map((button) => {
                  const IconComponent = button.icon;
                  return (
                    <Button
                      key={button.id}
                      variant="outline"
                      size="sm"
                      className="bg-[#2A2D33] text-white border cursor-pointer"
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {button.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
