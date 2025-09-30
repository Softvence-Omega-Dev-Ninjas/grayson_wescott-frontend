import React from "react";

interface ClientData {
  name: string;
  program: string;
  status: "Successful" | "Pending" | "Processing" | "Rejected" | "On Hold";
  admissionDate: string;
  lastActive: string;
}

const clients: ClientData[] = [
  {
    name: "Alex Johnson",
    program: "Strength Building",
    status: "Successful",
    admissionDate: "12/12/2025",
    lastActive: "View Profile",
  },
  {
    name: "Nico Chamali",
    program: "Strength Building",
    status: "Pending",
    admissionDate: "15/12/2025",
    lastActive: "View Profile",
  },
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    status: "Processing",
    admissionDate: "10/11/2025",
    lastActive: "View Profile",
  },
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    status: "Rejected",
    admissionDate: "01/12/2025",
    lastActive: "View Profile",
  },
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    status: "Successful",
    admissionDate: "01/02/2025",
    lastActive: "View Profile",
  },
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    status: "On Hold",
    admissionDate: "05/08/2025",
    lastActive: "View Profile",
  },
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    status: "Successful",
    admissionDate: "12/04/2025",
    lastActive: "View Profile",
  },
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    status: "Pending",
    admissionDate: "06/09/2025",
    lastActive: "View Profile",
  },
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    status: "Successful",
    admissionDate: "07/01/2024",
    lastActive: "View Profile",
  },
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    status: "Pending",
    admissionDate: "06/02/2025",
    lastActive: "View Profile",
  },
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    status: "Successful",
    admissionDate: "03/03/2025",
    lastActive: "View Profile",
  },
  {
    name: "Sarah Johnson",
    program: "Strength Building",
    status: "Pending",
    admissionDate: "01/01/2025",
    lastActive: "View Profile",
  },
];

export function ActivityTable() {
  const getStatusClasses = (status: ClientData["status"]) => {
    switch (status) {
      case "Successful":
        return "bg-green-900/30 text-green-400 border border-green-800";
      case "Pending":
        return "bg-yellow-900/30 text-yellow-400 border border-yellow-800";
      case "Processing":
        return "bg-blue-900/30 text-blue-400 border border-blue-800";
      case "Rejected":
        return "bg-red-900/30 text-red-400 border border-red-800";
      case "On Hold":
        return "bg-gray-900/30 text-gray-400 border border-gray-800";
      default:
        return "";
    }
  };

  return (
    <div className="mb-8 ">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-4 px-5 pt-4">
        <h1 className="text-white font-bold text-2xl">Recent Active Clients</h1>
        <button className="text-white cursor-pointer text-sm">See More</button>
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto border border-secondary">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-secondary text-white">
              <th className="text-left py-3 px-5 font-semibold">Client Name</th>
              <th className="text-left py-3 px-5 font-semibold">Program</th>
              <th className="text-left py-3 px-5 font-semibold">Status</th>
              <th className="text-left py-3 px-5 font-semibold">Admission Date</th>
              <th className="text-left py-3 px-5 font-semibold">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index} className="border-b border-gray-800/50">
                <td className="py-4 px-5 text-white">{client.name}</td>
                <td className="py-4 px-5 text-gray-300">{client.program}</td>
                <td className="py-4 px-5">
                  <span className={`px-2 py-1 rounded text-sm ${getStatusClasses(client.status)}`}>{client.status}</span>
                </td>
                <td className="py-4 px-5 text-gray-300">{client.admissionDate}</td>
                <td className="py-4 px-5 text-gray-400">{client.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
