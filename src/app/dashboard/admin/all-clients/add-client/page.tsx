'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Shield, Dumbbell, Info } from 'lucide-react';
import { RxCross2 } from 'react-icons/rx';
import { useRouter } from 'next/navigation';

interface ClientFormData {
  fullName: string;
  email: string;
  phone: string;
  membershipTier: string;
  status: string;
  programTemplate: string;
}

const ClientForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ClientFormData>({
    fullName: '',
    email: '',
    phone: '',
    membershipTier: '',
    status: 'active',
    programTemplate: '',
  });

  const handleInputChange = (field: keyof ClientFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard/admin/all-clients/add-client/success');
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      membershipTier: '',
      status: 'active',
      programTemplate: '',
    });
  };

  return (
    <div className=" p-4 md:p-6 lg:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-primary-200 border border-secondary">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-white" />
              <h2 className="text-lg font-semibold text-white">
                Basic Information
              </h2>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Enter the clients personal details
            </p>

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="fullName"
                  className="text-white text-sm font-medium"
                >
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange('fullName', e.target.value)
                  }
                  className="mt-2 bg-secondary text-white placeholder:text-gray-400 "
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-white text-sm font-medium"
                  >
                    Email Address*
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2 bg-secondary text-white placeholder:text-gray-400 "
                  />
                </div>

                <div>
                  <Label
                    htmlFor="phone"
                    className="text-white text-sm font-medium"
                  >
                    Phone Number ( Optional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-2 bg-secondary text-white placeholder:text-gray-400 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Access Details Section */}
        <div className="bg-primary-200 border border-secondary">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-white" />
              <h2 className="text-lg font-semibold text-white">
                Access Details
              </h2>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Configure clients permissions and membership
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="membershipTier"
                  className="text-white text-sm font-medium"
                >
                  Assign Membership Tier
                </Label>
                <Select
                  value={formData.membershipTier}
                  onValueChange={(value) =>
                    handleInputChange('membershipTier', value)
                  }
                >
                  <SelectTrigger className="mt-2 bg-secondary text-white placeholder:text-gray-400 w-full">
                    <SelectValue placeholder="Select membership tier" />
                  </SelectTrigger>
                  <SelectContent className=" border-gray-700">
                    <SelectItem
                      value="basic"
                      className="text-white hover:bg-gray-700"
                    >
                      Basic
                    </SelectItem>
                    <SelectItem
                      value="premium"
                      className="text-white hover:bg-gray-700"
                    >
                      Premium
                    </SelectItem>
                    <SelectItem
                      value="elite"
                      className="text-white hover:bg-gray-700"
                    >
                      Elite
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="status"
                  className="text-white text-sm font-medium"
                >
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger className="mt-2 bg-secondary text-white placeholder:text-gray-400  w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className=" border-gray-700">
                    <SelectItem
                      value="active"
                      className="text-white hover:bg-gray-700"
                    >
                      Active
                    </SelectItem>
                    <SelectItem
                      value="inactive"
                      className="text-white hover:bg-gray-700"
                    >
                      Inactive
                    </SelectItem>
                    <SelectItem
                      value="pending"
                      className="text-white hover:bg-gray-700"
                    >
                      Pending
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Program Assignment Section */}
        <div className="bg-primary-200 border border-secondary">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-5 w-5 text-white" />
              <h2 className="text-lg font-semibold text-white">
                Program Assignment
              </h2>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Optional: Assign a program template or leave empty to assign later
            </p>

            <div>
              <Label
                htmlFor="programTemplate"
                className="text-white text-sm font-medium"
              >
                Select Program Template
              </Label>
              <Select
                value={formData.programTemplate}
                onValueChange={(value) =>
                  handleInputChange('programTemplate', value)
                }
              >
                <SelectTrigger className="mt-2 bg-secondary text-white placeholder:text-gray-400 w-full">
                  <SelectValue placeholder="Leave empty (assign later)" />
                </SelectTrigger>
                <SelectContent className=" border-gray-700">
                  <SelectItem
                    value="frame-1597884974"
                    className="text-white hover:bg-gray-700"
                  >
                    Frame 1597884974
                  </SelectItem>
                  <SelectItem
                    value="weight-loss-basic"
                    className="text-white hover:bg-gray-700"
                  >
                    Weight Loss Basic
                  </SelectItem>
                  <SelectItem
                    value="strength-training"
                    className="text-white hover:bg-gray-700"
                  >
                    Strength Training
                  </SelectItem>
                  <SelectItem
                    value="cardio-intensive"
                    className="text-white hover:bg-gray-700"
                  >
                    Cardio Intensive
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Program Assignment Info */}
            <div className="mt-4 p-4 bg-secondary">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-base">
                    Program Assignment
                  </h4>
                  <p className="text-white text-sm mt-1">
                    You can assign a program template now or leave it empty to
                    assign later from the Clients management dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-3xl mx-auto mb-20">
          <Button
            type="submit"
            className="flex-1 bg-[#B9BDC6] hover:bg-[#B9BDC6] cursor-pointer text-black border-0 h-12 text-base font-medium hover:text-black"
          >
            <User className="h-4 w-4 mr-2" />
            Create Client
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="flex-1 bg-transparent border-gray-600 cursor-pointer text-gray-300 hover:bg-gray-800 hover:text-white h-12 text-base font-medium"
          >
            <RxCross2 />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ClientForm;
