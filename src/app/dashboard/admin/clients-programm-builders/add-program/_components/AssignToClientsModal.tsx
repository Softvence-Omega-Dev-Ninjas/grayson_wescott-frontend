/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { FaUsers } from 'react-icons/fa6';
import avatar from '@/assets/dashboard/add-excercise/avatar.png';
import Image from 'next/image';

const AssignToClientsModal = ({
  clients,
  selectedClientIds,
  setSelectedClientIds,
}: {
  clients: any[];
  selectedClientIds: string[];
  setSelectedClientIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-full font-medium py-2 px-4 transition-colors duration-200 bg-secondary hover:bg-secondary/85 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FaUsers />
          Assign to Clients
        </button>
      </DialogTrigger>

      <DialogContent className="h-96 md:h-[450px] overflow-hidden p-0 bg-primary-200 border border-secondary">
        <div className="p-6 overflow-y-auto w-full h-full">
          <DialogHeader>
            <DialogTitle className="text-xl text-light-primary-text dark:text-dark-primary-txt font-bold font-Aclonica">
              Assign Clients
            </DialogTitle>
          </DialogHeader>

          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between p-3  bg-secondary rounded-none mt-5"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={avatar}
                  width={26}
                  height={26}
                  alt="Upload Icon"
                  className="bg-secondary rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-white text-base font-medium">
                    {client.name}
                  </span>
                  <span className="text-gray-400 text-sm">{client.level}</span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={selectedClientIds.includes(client.id)}
                onChange={(e) => {
                  setSelectedClientIds(
                    (prev) =>
                      e.target.checked
                        ? [...prev, client.id] // ✅ add
                        : prev.filter((id) => id !== client.id), // ✅ remove
                  );
                }}
                className="w-5 h-5 form-checkbox rounded-full text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignToClientsModal;
