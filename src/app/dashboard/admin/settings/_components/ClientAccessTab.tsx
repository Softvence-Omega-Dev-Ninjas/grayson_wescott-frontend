"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Settings, Star, Crown, Shield } from "lucide-react";

const tierStatsData = [
  {
    id: 1,
    name: "Core Tier",
    description: "Basic Access",
    total: 1247,
    active: 1190,
    inactive: 57,
    icon: Shield,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/20",
  },
  {
    id: 2,
    name: "Elite Tier",
    description: "Premium Access",
    total: 89,
    active: 78,
    inactive: 11,
    icon: Star,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
  },
  {
    id: 3,
    name: "Private Tier",
    description: "Full Access",
    total: 89,
    active: 87,
    inactive: 2,
    icon: Crown,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/20",
  },
];

const permissionsData = [
  { id: 1, feature: "Basic Modules", core: false, elite: true, private: true },
  {
    id: 2,
    feature: "Community Access",
    core: true,
    elite: true,
    private: true,
  },
  {
    id: 3,
    feature: "1-on-1 Coaching",
    core: false,
    elite: true,
    private: true,
  },
  {
    id: 4,
    feature: "Advanced Analytics",
    core: true,
    elite: false,
    private: true,
  },
  {
    id: 5,
    feature: "Priority Support",
    core: true,
    elite: true,
    private: false,
  },
];

const accountStatusData = [
  {
    id: 1,
    status: "Active",
    description: "Full access granted",
    count: 1658,
    color: "green",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    dotColor: "bg-green-500",
    textColor: "text-green-500",
  },
  {
    id: 2,
    status: "Inactive",
    description: "Limited Access",
    count: 70,
    color: "yellow",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    dotColor: "bg-yellow-500",
    textColor: "text-yellow-500",
  },
  {
    id: 3,
    status: "Banned",
    description: "No Access",
    count: 12,
    color: "red",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    dotColor: "bg-red-500",
    textColor: "text-red-500",
  },
];

export function ClientsAccessTab() {
  return (
    <div className="space-y-6">
      {/* Tier Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tierStatsData.map((tier) => {
          const IconComponent = tier.icon;
          return (
            <Card key={tier.id} className="bg-[#151519]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <div className={`p-2 ${tier.bgColor} rounded-lg`}>
                          <IconComponent
                            className={`h-5 w-5 ${tier.iconColor}`}
                          />
                        </div>
                        <div className="flex flex-col  ">
                          <p className="font-medium text-white">{tier.name}</p>
                          <Badge variant="secondary" className="text-white/80">
                            {tier.description}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-2xl font-bold text-white">
                          {tier.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col text-sm text-muted-foreground mt-1">
                      <div className="flex justify-between text-white/70">
                        <p>Active Clients:</p>
                        <p>{tier.active.toLocaleString()}</p>
                      </div>

                      <div className="flex justify-between text-white/70">
                        <p>In-Active Clients:</p>
                        <p>{tier.active.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Default Role Permissions */}
      <Card className="bg-black border-gray-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">
              Default Role Permissions
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className=" bg-secondary text-white border-transparent cursor-pointer hover:bg-secondary hover:text-white rounded-none"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto border">
            <table className="w-full text-white bg-black">
              <thead className="bg-secondary">
                <tr className=" border-secondary">
                  <th className="text-left py-3 px-4 font-medium">Feature</th>
                  <th className="text-center py-3 px-4 font-medium">Core</th>
                  <th className="text-center py-3 px-4 font-medium">Elite</th>
                  <th className="text-center py-3 px-4 font-medium">Private</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {permissionsData.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/20 border-b-gray-900">
                    <td className="py-3 px-4 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {row.core ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.elite ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.private ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Account Status Rules */}
      <Card className="bg-black border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Account Status Rules</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage user account states and access control
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accountStatusData.map((status) => (
              <div
                key={status.id}
                className={`flex items-center justify-between p-4 ${status.bgColor} border ${status.borderColor} rounded-lg`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 ${status.dotColor} rounded-full`}
                  ></div>
                  <div>
                    <p className="font-medium text-white">{status.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {status.description}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${status.textColor} border-${status.color}-500`}
                >
                  {status.count.toLocaleString()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
