import { DollarSign, FileText, Users } from "lucide-react";
import React from "react";
import { IStatesCardProps, StatesCard } from "./_components/StatesCard/StatesCard";
import { ActivityTable } from "./_components/ActivityTable/ActivityTable";

const statesData: IStatesCardProps[] = [
  {
    title: "Total Clients",
    value: "247",
    change: "+12% vs last month",
    icon: Users,
  },
  {
    title: "Active Clients",
    value: "189",
    change: "+8% vs last month",
    icon: FileText,
  },
  {
    title: "Monthly Revenue",
    value: "$18,240",
    change: "+5% vs last month",
    icon: DollarSign,
  },
];

const AdminOverviewPage = () => {
  return (
    <div>
      {/* States Cards  */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statesData.map((metric, index) => (
          <StatesCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
          />
        ))}
      </div>

      <ActivityTable />
    </div>
  );
};

export default AdminOverviewPage;
