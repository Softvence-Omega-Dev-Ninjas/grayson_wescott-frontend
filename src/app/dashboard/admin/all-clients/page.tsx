"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { ClientCard } from "./_components/ClientCard/ClientCard";
import { Pagination } from "@/components/shared/dashboard/Pagination/Pagination";
import usePagination from "@/hooks/usePagination";
import Link from "next/link";

// Sample client data
const sampleClients = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active" as const,
    program: "Weight Loss Pro",
    progress: 85,
    lastActive: "2 hours ago",
    range: "Morning",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Inactive" as const,
    program: "Weight Loss Pro",
    progress: 65,
    lastActive: "2 hours ago",
    range: "Evening",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "On Hold" as const,
    program: "Weight Loss Pro",
    progress: 45,
    lastActive: "2 hours ago",
    range: "Afternoon",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Inactive" as const,
    program: "Weight Loss Pro",
    progress: 75,
    lastActive: "2 hours ago",
    range: "Morning",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Active" as const,
    program: "Weight Loss Pro",
    progress: 90,
    lastActive: "2 hours ago",
    range: "Evening",
  },
  {
    id: "6",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "On Hold" as const,
    program: "Weight Loss Pro",
    progress: 55,
    lastActive: "2 hours ago",
    range: "Afternoon",
  },
];

const AllClientPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { currentPage, handlePageChange } = usePagination();

  const handleAddClient = () => {
    console.log("Add new client clicked");
  };

  return (
    <div className="space-y-6">
      {/* Add Client Button */}
      <div className="flex justify-end">
        <Link href={"/dashboard/admin/all-clients/add-client"}>
          <Button
            onClick={handleAddClient}
            className="w-full sm:w-auto bg-secondary border border-primary-200 text-white cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </Link>
      </div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-primary-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:flex-1 w-full">
          {/* Search Input  */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border border-secondary text-white placeholder:text-gray-400 w-full rounded-none"
            />
          </div>
          {/* Filter by Status */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full  sm:w-[140px] border-gray-700 text-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-primary-200 border-gray-700">
              <SelectItem value="all" className="text-white hover:bg-gray-800">
                All Status
              </SelectItem>
              <SelectItem
                value="active"
                className="text-white hover:bg-gray-800"
              >
                Active
              </SelectItem>
              <SelectItem
                value="inactive"
                className="text-white hover:bg-gray-800"
              >
                Inactive
              </SelectItem>
              <SelectItem
                value="on-hold"
                className="text-white hover:bg-gray-800"
              >
                On Hold
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Client Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleClients.map((client) => (
          <ClientCard key={client.id} {...client} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-16">
        <Pagination
          activePage={currentPage}
          totalPages={7}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default AllClientPage;
