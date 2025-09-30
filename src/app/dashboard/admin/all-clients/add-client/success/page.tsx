import Image from "next/image";
import React from "react";
import { FaDatabase, FaUserPlus, FaEnvelope, FaListUl } from "react-icons/fa";
import successIcon from "@/assets/dashboard/add-excercise/tick.png";
import tickIcon from "@/assets/dashboard/add-excercise/tick.png";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ClientAddedSuccessfully = () => {
  return (
    <div className="flex items-center justify-center p-4 text-white">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col items-center mb-8">
          <Image
            src={successIcon}
            width={26}
            height={26}
            alt="Upload Icon"
            className="bg-secondary rounded-full w-20 h-20 p-7"
          />

          <h1 className="text-3xl font-semibold text-center mt-6">
            Clients Added Successfully!
          </h1>
          <p className="text-gray-300 text-center mt-2">
            All onboarding processes have been initiated automatically.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-4 bg-secondary">
            <div className="flex items-center gap-3">
              <span className="bg-[#B9BDC6] rounded-full w-10 h-10 flex items-center justify-center">
                <FaDatabase className="text-primary-200" />
              </span>
              <div>
                <p className="font-medium">Client data saved to database</p>
                <p className="text-sm text-gray-400">
                  Profile information stored successfully
                </p>
              </div>
            </div>
            <Image
              src={tickIcon}
              width={26}
              height={26}
              alt="Upload Icon"
              className="bg-secondary rounded-full w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary">
            <div className="flex items-center gap-3">
              <span className="bg-[#B9BDC6] rounded-full w-10 h-10 flex items-center justify-center">
                <FaUserPlus className="text-primary-200" />
              </span>
              <div>
                <p className="font-medium">Auto-enrolled to Memberstack</p>
                <p className="text-sm text-gray-400">
                  Clients added to membership platform
                </p>
              </div>
            </div>
            <Image
              src={tickIcon}
              width={26}
              height={26}
              alt="Upload Icon"
              className="bg-secondary rounded-full w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary">
            <div className="flex items-center gap-3">
              <span className="bg-[#B9BDC6] rounded-full w-10 h-10 flex items-center justify-center">
                <FaEnvelope className="text-primary-200" />
              </span>
              <div>
                <p className="font-medium">Welcome email sent</p>
                <p className="text-sm text-gray-400">
                  Onboarding email sequence initiated
                </p>
              </div>
            </div>
            <Image
              src={tickIcon}
              width={26}
              height={26}
              alt="Upload Icon"
              className="bg-secondary rounded-full w-4 h-4"
            />
          </div>
        </div>

        <div className="border border-[#F4F5F7] p-6  mb-8">
          <h2 className="text-xl font-medium mb-4">Clients Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Name:</p>
              <p className="font-medium">John Smith</p>
            </div>
            <div>
              <p className="text-gray-400">Email:</p>
              <p className="font-medium">john.smith@gmail.com</p>
            </div>
            <div>
              <p className="text-gray-400">Role:</p>
              <p className="font-medium">Member</p>
            </div>
            <div>
              <p className="text-gray-400">Status:</p>
              <span className="bg-[#B9BDC6] text-xs font-bold px-2 py-1 uppercase text-black">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href={"/dashboard/admin/all-clients/add-client"}
            className="flex-1 w-full"
          >
            <Button className=" bg-[#B9BDC6] hover:bg-[#B9BDC6] cursor-pointer text-black border-0 h-12 text-base  hover:text-black w-full">
              <User className="h-4 w-4 mr-2" />
              Add Another Clients
            </Button>
          </Link>
          <Link href={"/dashboard/admin/all-clients"} className="flex-1 w-full">
            <Button className="flex-1 flex items-center justify-center p-3 bg-transparent hover:bg-primary-200 border border-secondary transition-colors duration-200 cursor-pointer w-full">
              <FaListUl className="mr-2" /> View All Clients
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientAddedSuccessfully;
