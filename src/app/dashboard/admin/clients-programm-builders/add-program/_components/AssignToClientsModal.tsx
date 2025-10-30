// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { getAllUsers } from '@/services/admin/user';
// import { IMetadata } from '@/types/metadata.types';
// import { IUser } from '@/types/user.types';
// import { ChevronDown } from 'lucide-react';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { FaUsers } from 'react-icons/fa6';

// const AssignToClientsModal = ({
//   selectedClientIds,
//   setSelectedClientIds,
// }: {
//   selectedClientIds: string[];
//   setSelectedClientIds: React.Dispatch<React.SetStateAction<string[]>>;
// }) => {
//   const [open, setOpen] = useState(false);
//   const [users, setUsers] = useState<IUser[] | null>(null);
//   const [metaData, setMetadata] = useState<IMetadata | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   useEffect(() => {
//     const getCategory = async () => {
//       const res = await getAllUsers({ currentPage });
//       setUsers((prev) => [...(prev ?? []), ...(res?.data || [])]);
//       setMetadata(res?.metadata);
//     };

//     getCategory();
//   }, [currentPage]);

//   console.log('==============>', users);
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <button
//           type="button"
//           className="w-full font-medium py-2 px-4 transition-colors duration-200 bg-secondary hover:bg-secondary/85 flex items-center justify-center gap-1.5 cursor-pointer"
//         >
//           <FaUsers />
//           Assign to Clients
//         </button>
//       </DialogTrigger>

//       <DialogContent className="h-96 md:h-[450px] overflow-hidden p-0 bg-primary-200 border border-secondary">
//         <div className="p-6 overflow-y-auto w-full h-full">
//           <DialogHeader>
//             <DialogTitle className="text-xl text-light-primary-text dark:text-dark-primary-txt font-bold font-Aclonica">
//               Assign Clients
//             </DialogTitle>
//           </DialogHeader>

//           <div className="overflow-hidden">
//             <div className="overflow-y-auto">
//               {users?.map((user: IUser) => (
//                 <div
//                   key={user.id}
//                   className="flex items-center justify-between p-3  bg-secondary rounded-none mt-5"
//                 >
//                   <div className="flex items-center gap-3">
//                     <Image
//                       src={user?.avatarUrl}
//                       width={26}
//                       height={26}
//                       alt="Upload Icon"
//                       className="bg-secondary rounded-full"
//                     />
//                     <div className="flex flex-col">
//                       <span className="text-white text-base font-medium">
//                         {user?.username}
//                       </span>
//                       <span className="text-gray-400 text-sm">
//                         {user?.email}
//                       </span>
//                     </div>
//                   </div>

//                   <input
//                     type="checkbox"
//                     checked={selectedClientIds.includes(user.id)}
//                     onChange={(e) => {
//                       setSelectedClientIds(
//                         (prev) =>
//                           e.target.checked
//                             ? [...prev, user.id] // ✅ add
//                             : prev.filter((id) => id !== user.id), // ✅ remove
//                       );
//                     }}
//                     className="w-5 h-5 form-checkbox rounded-full text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 transition-colors duration-200"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="flex items-center justify-center my-5">
//               <span
//                 onClick={() => setCurrentPage((prev) => prev + 1)}
//                 className={`hover:bg-secondary cursor-pointer rounded-md w-8 h-8 flex items-center justify-center ${metaData?.totalPage === currentPage ? 'hidden' : 'flex'}`}
//               >
//                 <ChevronDown />
//               </span>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AssignToClientsModal;

'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getAllUsers } from '@/services/admin/user';
import { IMetadata } from '@/types/metadata.types';
import { IUser } from '@/types/user.types';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa6';

const AssignToClientsModal = ({
  selectedClientIds,
  setSelectedClientIds,
}: {
  selectedClientIds: string[];
  setSelectedClientIds: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [metaData, setMetadata] = useState<IMetadata | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers({ currentPage });

      // ✅ Avoid duplicate users due to React Strict Mode
      if (currentPage === 1) {
        setUsers(res?.data || []);
      } else {
        setUsers((prev) => {
          const existingIds = new Set(prev?.map((u) => u.id));
          const newUsers =
            res?.data?.filter((u: IUser) => !existingIds.has(u.id)) || [];

          return [...(prev ?? []), ...newUsers];
        });
      }

      setMetadata(res?.metadata);
    };

    fetchUsers();
  }, [currentPage]);

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

          <div className="overflow-hidden">
            <div className="overflow-y-auto">
              {users?.map((user: IUser) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-secondary rounded-none mt-5"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={user?.avatarUrl}
                      width={26}
                      height={26}
                      alt="User Avatar"
                      className="bg-secondary rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="text-white text-base font-medium">
                        {user?.username}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={selectedClientIds.includes(user.id)}
                    onChange={(e) => {
                      setSelectedClientIds((prev) =>
                        e.target.checked
                          ? [...prev, user.id]
                          : prev.filter((id) => id !== user.id),
                      );
                    }}
                    className="w-5 h-5 form-checkbox rounded-full text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 transition-colors duration-200"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center my-5">
              <span
                onClick={() =>
                  currentPage < (metaData?.totalPage || 1) &&
                  setCurrentPage((prev) => prev + 1)
                }
                className={`hover:bg-secondary cursor-pointer rounded-md w-8 h-8 flex items-center justify-center ${
                  metaData?.totalPage === currentPage ? 'hidden' : 'flex'
                }`}
              >
                <ChevronDown />
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignToClientsModal;
